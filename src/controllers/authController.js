const UserSchema = require('../models/User')
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
// Creating the Secret for JWT
const JWT_SECRET = 'sauravpianist';

const createUser = async (req, res) => {
  // If there are errors, return bad request and the error
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //check wheather the user email is already exist or not
  try {
    // let user = await User.findOne({ email: req.body.email });
    let user = await UserSchema.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "User with this email already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    // console.log(salt);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //create a new user
    user = await UserSchema.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    const data = {
      user: {
        id: user.id
      }
    }

    //Authentication by using Json Web Token

    const authtoken = jwt.sign(data, JWT_SECRET);
    console.log(user);
    // res.json(user);
    // res.json({ authtoken });
    res.status(200).send(user);
    

  } catch (error) {
    console.error(error);
    res.status(500).send("some error occured");
  }

};


// Authenticate the user using: Post "/api/auth/login" . No-login required

const loginUser= async (req, res) => {
  // If there are errors, return bad request and the error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await UserSchema.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "Please Enter a valid email" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please Enter a valid Credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    // console.log(jwtData);
    // res.json(user);
    res.json({ authtoken });


  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error 1");
  }
};

// Get the user using: Post "/api/auth/getuser" . Login required
const getUser = async (req, res) => {
  try {
   const userId = req.user.id;
    const user = await UserSchema.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error 2");
  }

};



module.exports = {createUser,loginUser,getUser};