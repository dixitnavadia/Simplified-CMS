//imports
const express = require("express");
const axios = require("axios");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rateLimit = require('express-rate-limit');
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();
const PORT = process.env.PORT;

const limit = rateLimit({
  windowMs: 15*60*1000,
  limit: 5
})

//user
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
  }
});
const User = mongoose.model("cms_users",userSchema);

// Page draft schema
const pageDraftSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  elements: [{
    type: {
      type: String,
      required: true
    },
    text: String,
    src: String,
    alt: String,
    width: String,
    height: String,
    fontSize: String,
    fontWeight: String,
    fontFamily: String,
    fontColor: String,
    isBold: Boolean,
    isItalic: Boolean,
    isUnderline: Boolean,
    isSubscript: Boolean,
    isSuperscript: Boolean
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  }
});

const PageDraft = mongoose.model("page_drafts", pageDraftSchema);

// JWT Middleware for authentication
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).send({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch full user data from database
    const user = await User.findOne({ id: decoded.id });
    if (!user) {
      return res.status(401).send({ message: 'User not found' });
    }

    // Add user data to request object
    req.user = {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role
    };

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).send({ message: 'Invalid token' });
  }
};

//middleware
app.use(express.json());
app.use(cors());
app.use(async function (req, res, next) {
  await mongoose.connect(process.env.CONNECT_STRING);
  next();
});

//Implement some helper file for user information
app.get("/", (req, res) => {
  res.send("This is home");
});

// Get user profile (protected route)
app.get("/api/user/profile", authenticateToken, async (req, res) => {
  try {
    res.status(200).send({
      user: req.user,
      message: "User profile retrieved successfully"
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).send({ message: "Failed to fetch user profile" });
  }
});

// Update user profile (protected route)
app.put("/api/user/profile", authenticateToken, async (req, res) => {
  try {
    const { fullname, email } = req.body;
    
    // Validate input
    if (!fullname || !email) {
      return res.status(400).send({ message: "Fullname and email are required" });
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ 
      email: email, 
      id: { $ne: req.user.id } 
    });

    if (existingUser) {
      return res.status(409).send({ message: "Email already in use by another user" });
    }

    // Update user
    const updatedUser = await User.findOneAndUpdate(
      { id: req.user.id },
      { fullname, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    // Return updated user data (excluding password)
    const userResponse = {
      id: updatedUser.id,
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      role: updatedUser.role
    };

    res.status(200).send({
      user: userResponse,
      message: "Profile updated successfully"
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).send({ message: "Failed to update user profile" });
  }
});

//register routes
app.post("/api/register", async(req,res) => {
  try {
    const {id,fullname,password,email,role} = req.body;
  
    if(!id || !fullname || !password || !email || !role) {
      return res.status(404).send({message: "Please reload and fill out all fields"});
    }
    //exists?
    const existingUser = await User.findOne({email});

    if(existingUser) {
      return res.status(409).send({messsage: "User already exists!"});
    }
    const hashPassword = await bcrypt.hash(password,14);

    const user = new User({fullname,email,hashPassword,id,role});
    
    await User.create(user);
    res.status(201).send({message: "User successfully created!"});
  } catch(e) {
    res.status(500).send({message: "Server register failed"});
  }
})

app.post("/api/login", async(req,res) => {
    try {
    const {email,password} = req.body;
    console.log(email,password);
    if(!email || !password) {
      return res.status(400).send({message: "Please fill out all fields!"});
    }
    const existingUser = await User.findOne({email});
    if(!existingUser) {
      return res.status(401).send({message: "User does not exist!"});
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.hashPassword
    );
    if(!isPasswordCorrect) {
      return res.status(401).send({message: "Password is incorrect"});
    }
    const token = jwt.sign({id: existingUser.id},process.env.JWT_SECRET);
    
    // Return user data along with token
    const userResponse = {
      id: existingUser.id,
      fullname: existingUser.fullname,
      email: existingUser.email,
      role: existingUser.role
    };
    
    res.status(200).send({
      token,
      user: userResponse,
      message: "Login successful"
    });
  } catch(e) {
    console.error('Login error:', e);
    res.status(500).send({message: "Server login failed"});
  }
})

app.get("/health-check", (req, res) => {
  res.status(200).send("All right!");
});

// Save page as draft
app.post("/api/pages/draft", authenticateToken, async (req, res) => {
  try {
    const { title, elements, overwrite = false } = req.body;
    
    if (!title || !elements) {
      return res.status(400).send({ message: "Title and elements are required" });
    }

    // Check if title already exists (unless overwrite is true)
    if (!overwrite) {
      const existingDraft = await PageDraft.findOne({ 
        userId: req.user.id, 
        title: title.trim(),
        status: 'draft'
      });

      if (existingDraft) {
        return res.status(409).send({ 
          message: "Draft with this title already exists",
          existingDraft: existingDraft,
          requiresOverwrite: true
        });
      }
    }

    // If overwriting, delete the existing draft first
    if (overwrite) {
      await PageDraft.findOneAndDelete({ 
        userId: req.user.id, 
        title: title.trim(),
        status: 'draft'
      });
    }

    const pageDraft = new PageDraft({
      id: uuidv4(),
      title: title.trim(),
      userId: req.user.id,
      elements,
      updatedAt: new Date()
    });

    await pageDraft.save();
    
    res.status(201).send({
      message: "Page draft saved successfully",
      draft: pageDraft
    });

  } catch (error) {
    console.error('Draft save error:', error);
    res.status(500).send({ message: "Failed to save page draft" });
  }
});

// Get user's page drafts
app.get("/api/pages/drafts", authenticateToken, async (req, res) => {
  try {
    const drafts = await PageDraft.find({ 
      userId: req.user.id,
      status: 'draft'
    }).sort({ updatedAt: -1 });

    res.status(200).send({
      drafts,
      message: "Page drafts retrieved successfully"
    });

  } catch (error) {
    console.error('Drafts fetch error:', error);
    res.status(500).send({ message: "Failed to fetch page drafts" });
  }
});

// Get specific page draft
app.get("/api/pages/draft/:id", authenticateToken, async (req, res) => {
  try {
    const draft = await PageDraft.findOne({ 
      id: req.params.id,
      userId: req.user.id
    });

    if (!draft) {
      return res.status(404).send({ message: "Page draft not found" });
    }

    res.status(200).send({
      draft,
      message: "Page draft retrieved successfully"
    });

  } catch (error) {
    console.error('Draft fetch error:', error);
    res.status(500).send({ message: "Failed to fetch page draft" });
  }
});

// Update page draft
app.put("/api/pages/draft/:id", authenticateToken, async (req, res) => {
  try {
    const { title, elements } = req.body;
    
    // Check if new title conflicts with another draft
    if (title) {
      const existingDraft = await PageDraft.findOne({ 
        userId: req.user.id, 
        title: title.trim(),
        status: 'draft',
        id: { $ne: req.params.id }
      });

      if (existingDraft) {
        return res.status(409).send({ 
          message: "Another draft with this title already exists",
          existingDraft: existingDraft,
          requiresOverwrite: true
        });
      }
    }
    
    const updatedDraft = await PageDraft.findOneAndUpdate(
      { id: req.params.id, userId: req.user.id },
      { 
        title: title.trim(), 
        elements, 
        updatedAt: new Date() 
      },
      { new: true }
    );

    if (!updatedDraft) {
      return res.status(404).send({ message: "Page draft not found" });
    }

    res.status(200).send({
      draft: updatedDraft,
      message: "Page draft updated successfully"
    });

  } catch (error) {
    console.error('Draft update error:', error);
    res.status(500).send({ message: "Failed to update page draft" });
  }
});

// Delete page draft
app.delete("/api/pages/draft/:id", authenticateToken, async (req, res) => {
  try {
    const deletedDraft = await PageDraft.findOneAndDelete({ 
      id: req.params.id,
      userId: req.user.id
    });

    if (!deletedDraft) {
      return res.status(404).send({ message: "Page draft not found" });
    }

    res.status(200).send({
      message: "Page draft deleted successfully"
    });

  } catch (error) {
    console.error('Draft delete error:', error);
    res.status(500).send({ message: "Failed to delete page draft" });
  }
});

// Check if draft title exists
app.post("/api/pages/draft/check-title", authenticateToken, async (req, res) => {
  try {
    const { title, excludeId } = req.body;
    
    if (!title) {
      return res.status(400).send({ message: "Title is required" });
    }

    const query = { 
      userId: req.user.id, 
      title: title.trim(),
      status: 'draft'
    };

    // If excludeId is provided, exclude that draft from the search (for updates)
    if (excludeId) {
      query.id = { $ne: excludeId };
    }

    const existingDraft = await PageDraft.findOne(query);

    res.status(200).send({
      exists: !!existingDraft,
      draft: existingDraft || null,
      message: existingDraft ? "Draft with this title already exists" : "Title is available"
    });

  } catch (error) {
    console.error('Title check error:', error);
    res.status(500).send({ message: "Failed to check title availability" });
  }
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});