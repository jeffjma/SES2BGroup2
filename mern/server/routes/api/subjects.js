const express = require("express");
const router = express.Router();
// Load Question Model
const Subject = require("../../models/Subject");
const Question = require("../../models/Question");

// @route POST api/subjects/create
// @desc Create a new subject
// @access Public
router.post("/create", (req, res) => {
    const newSubject = new Subject(req.body);
    try {
        newSubject.save();
        res.send(newSubject);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route POST api/subjects/add
// @desc Add a question to a subject
// @access Public
router.post("/add", async (req, res) => {
    const subject = await Subject.findById(req.body.subject);
    const question = await Question.findById(req.body.question);
    subject.questions.push(question._id);
    try {
        subject.save();
        res.send(subject.questions);
    } catch (err) {
        res.status(500).send(err);
    }
})

// @route POST api/subjects/addNew
// @desc Create and add a question to a subject
// @access Public
router.post("/addNew", async (req, res) => {
    const subject = await Subject.findById(req.body.subject);
    const newQuestion = new Question(req.body.question)
    try {
        newQuestion.save();
    } catch (err) {
        res.status(500).send(err)
    }
    subject.questions.push(newQuestion._id);
    try {
        subject.save();
        res.send(subject.questions);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route GET api/subjects/getQuestions
// @desc Get all the questions for this subject
// @access Public
router.get("/getQuestions", async (req, res) => {
    const questions = (await Subject.findById(req.body.subject).populate("questions")).questions;

    try {
        res.send(questions);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get("/getFilteredQuestions", async (req, res) => {
    subject = await Subject.
        findById(req.body.subject).
        populate({
            path: "questions",
            match: req.body.match
        });
    try {
        res.send(subject.questions);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;