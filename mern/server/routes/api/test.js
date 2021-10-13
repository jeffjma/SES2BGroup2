const express = require("express");
const router = express.Router();

// Load Question Model
const Test = require("../../Models/Test");

// @route POST api/test/create
// @desc create a new test
// @access Public
router.post("/create", (req, res) => {
    const newTest = new Test(req.body);
    try {
        newTest.save();
        res.send(newTest);
    } catch (err) {
        res.status(500).send(err);
    }
});
/*
// @route POST api/test/add
// @desc Add a subject to a test
// @access Public
router.post("/add", async (req, res) => {
    const test = await Test.findOne(req.body.test);
    const subject = await Subject.findOne(req.body.subject);
    test.subject = subject._id;
    try {
        test.save();
        res.send(test.subject);
    } catch (err) {
        res.status(500).send(err);
    }
})*/

// @route POST api/test/add
// @desc Add a question to a test
// @access Public
router.post("/addquestion", async (req, res) => {
    const test = await Test.findOne(req.body.test);
    test.questions.push(req.body.question);
    try {
        test.save();
        res.send(test.questions);
    } catch (err) {
        res.status(500).send(err);
    }
})

// @route GET api/test/getQuestions
// @desc Get all the questions for this test
// @access Public
router.get("/getQuestions", async (req, res) => {
    const questions = (await Test.findOne(req.body).populate("questions")).questions;

    try {
        res.send(questions);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get("/getFilteredQuestions", async (req, res) => {
    test = await Test.
        findById(req.body.test).
        populate({
            path: "questions",
            match: req.body.match
        });
    try {
        res.send(test.questions);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;