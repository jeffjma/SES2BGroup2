const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  console.log(req.body);
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          userType: 'student',
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  console.log(req.body);
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                user: user
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
});

// @route POST api/users/background
// @desc Add background info of student
// @access Public
router.post("/background", (req, res) => {
  console.log(req.body);
// Getting info from request body
  const userID = req.body.userID;
  const educationLevel = req.body.educationLevel;
  const year = req.body.year;
  const currentSubjects = req.body.year;
  const faculty = req.body.faculty;
  const completedSubjects = req.body.completedSubjects;
  // Find user by userID
  User.findOne({ _id: userID }).then(user => {
    updatedUser = user;
    updatedUser.educationLevel = educationLevel;
    updatedUser.year = year;
    updatedUser.currentSubjects = currentSubjects;
    updatedUser.faculty = faculty;
    updatedUser.completedSubjects = completedSubjects;
    updatedUser.save();
    return res.json(user);
  });
});

// @route POST api/users/profile
// @desc Get user profile details
// @access Public
// Lowkey incomplete, will be updated
router.post("/profile", (req, res) => {
  const userID = req.body.userID;
  //Find user by userID
  User.findOne({ _id: userID }).then(user => {
    profile = {
      name: user.name,
      educationLevel: user.educationLevel,
      currentSubjects: user.currentSubjects
    }
    return res.json(profile);
  });
});

// @route POST api/users/newTestResult
// @desc Add a test result for a user
// @access Public
router.post("/newTestResult", (req, res) => {
  const userID = req.body.userID;
  const testID = req.body.testID;
  const result = req.body.result;
  //Find user by userID
  User.findOne({ _id: userID }).then(user => {
    updatedUser = user;
    testResult = {
      testID: testID,
      result: result
    }
    updatedUser.testResult = testResult;
    updatedUser.save()
    return res.json(user);
  });
});

// @route POST api/users/subjects
// @desc Get user's subjects
// @access Public
router.post("/subjects", (req, res) => {
  const userID = req.body.userID;
  //Find user by userID
  User.findOne({ _id: userID }).then(user => {
    return res.json(user.currentSubjects);
  });
});

module.exports = router;