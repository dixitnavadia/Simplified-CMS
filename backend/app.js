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
    res.status(200).send({token,message: "Login successful"});
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