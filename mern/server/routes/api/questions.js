const express = require("express");
const router = express.Router();
// Load Question Model
const Question = require("../../models/Question");

// @route POST api/questions/add
// @desc Add a new question to the bank
// @access Public
router.post("/add", (req, res) => {
    const newQuestion = new Question(req.body);

    try {
        newQuestion.save();
        res.send(newQuestion);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route GET api/questions/getAll
// @desc Get all the questions in the question bank
// @access Public
router.get("/getAll", async (req, res) => {
    const questions = await Question.find({});

    try {
        res.send(questions);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route POST api/questions/edit
// @desc Get all the questions in the question bank
// @access Public
router.post("/edit", (req, res) => {
    Question.findByIdAndUpdate(req.body.questionId, req.body.updates, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
})

module.exports = router;