const express = require("express");
const router = express.Router();
// Load Subject Model
const Subject = require("../../models/Subject");

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
// @desc Add a question to the specified subject
// @access Public
router.post("/add", async (req, res) => {
    const subject = await Subject.findOne(req.body.find);
    subject.questions.push(req.body.question);
    try {
        subject.save();
        res.send(subject);
    } catch (err) {
        res.status(500).send(err);
    }
})

// @route GET api/subjects/getQuestions
// @desc Get all the questions for this subject
// @access Public
router.get("/getQuestions", async (req, res) => {
    const subject = await Subject.findOne(req.body);

    try {
        res.send(subject.questions);
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;