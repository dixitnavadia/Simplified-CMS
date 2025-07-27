//imports
const express = require("express");
const axios = require("axios");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rateLimit = require('express-rate-limit');
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

// JWT Middleware for authentication
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).send({ message: "Access token required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by ID from token
    const user = await User.findOne({ id: decoded.id });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    // Attach user to request object (excluding password)
    req.user = {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role
    };
    
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(403).send({ message: "Invalid or expired token" });
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

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});