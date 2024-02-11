const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');



const mongoose = require("mongoose");
const TwitterModel = mongoose.model("twitter");
const authMiddleware = require('./middleware/auth'); 



// Signup route
router.post("/signup", (req, res) => {
  const { name, userName, email, Password } = req.body;

  if (!name || !userName || !email || !Password) {
    return res.status(400).json({ error: "One or more fields are empty" });
  }

  const currentTimeStamp = new Date();

  TwitterModel.findOne({ email: email })
    .then((userInDB) => {
      if (userInDB) {
        return res.status(500).json({ error: "User with this email already registered" });
      }

      bcryptjs.hash(Password, 16)
        .then((hashedPassword) => {
          const user = new TwitterModel({
            name,
            userName,
            email,
            Password: hashedPassword,
            createdAt: currentTimeStamp,
          });

          user.save()
            .then((newUser) => {
              res.status(201).json({ result: "User signed up successfully" });
            })
            .catch((saveErr) => {
              console.log(saveErr);
              res.status(500).json({ error: "Failed to save user to the database" });
            });
        })
        .catch((hashErr) => {
          console.log(hashErr);
          res.status(500).json({ error: "Failed to hash password" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log('Login Request - Email:', email);

  if (!email || !password) {
    return res.status(400).json({ error: "One or more fields are empty" });
  }

  TwitterModel.findOne({ email: email })
    .then((userInDB) => {
      if (!userInDB) {
        console.log('User not found');
        return res.status(401).json({ error: "Invalid credentials" });
      }

      bcryptjs.compare(password, userInDB.Password)
        .then((didMatch) => {
          console.log('Password Match:', didMatch);

          if (didMatch) {
            // Passwords match, create a JWT token
            const token = jwt.sign({ _id: userInDB._id }, JWT_SECRET, { expiresIn: '1h' });

            console.log('Generated Token:', token);

            // Send the token back to the client
            res.json({ token });
          } else {
            console.log('Password mismatch');
            res.status(401).json({ error: "Invalid credentials" });
          }
        })
        .catch((err) => {
          console.log('Error comparing passwords:', err);
          res.status(500).json({ error: "Error comparing passwords" });
        });
    })
    .catch((err) => {
      console.log('Error finding user in the database:', err);
      res.status(500).json({ error: "Internal server error" });
    });
});




module.exports = router;
