const {PythonShell} =  require("python-shell");
const {resolve} = require("path");

const express = require("express");
const router = express.Router();

const Test = require("../../models/Test");
const Question = require("../../models/Question");

// @route GET api/test/get
// @desc Gets a single test based on it's ID.
// @access Public
router.get("/get", async (req, res) => {
    try {
        const test = await Test.findById(req.body.test);
        res.send(test);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route GET api/test/getForSubject
// @desc Gets all tests for a subject
// @access Public
router.post("/getForSubject", async (req, res) => {
    try {
        const tests = await Test.find({subject: req.body.subject}, '-questions');
        res.send(tests);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route POST api/test/create
// @desc create a new test
// @access Public
router.post("/create", (req, res) => {
    try {
        const newTest = new Test(req.body);
        newTest.save();
        res.send(newTest);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route POST api/test/addQuestion
// @desc Add a question to a test
// @access Public
router.post("/addQuestion", async (req, res) => {
    try {
        const test = await Test.findById(req.body.test);
        const question = await Question.findById(req.body.question);
        if(question !== null){
            test.questions.push(req.body.question);
        }
        test.save();
        res.send(test.questions);
    } catch (err) {
        res.status(500).send(err);
    }
})

// @route GET api/test/getQuestions
// @desc Get all the questions for this test
// @access Public
router.post("/getQuestions", async (req, res) => {
    console.log(req.body)
    const questions = (await Test.findById(req.body.test).populate("questions")).questions;
    try {
        res.send(questions);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route GET api/test/getFilteredQuestions
// @desc Get a filtered list of questions for this subject
// @access Public
router.get("/getFilteredQuestions", async (req, res) => {
    try {
        test = await Test.
            findById(req.body.test).
            populate({
                path: "questions",
                match: req.body.match
            });
        res.send(test.questions);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route GET api/test/getNextQuestion
// @desc Get the next question during a test.
// @access Public
router.get("/getNextQuestion", async (req, res) => {
    const levels = req.body.levels;
    const results = req.body.results;
    try {
        const questions = (await Test.
            findById(req.body.test, 'questions').
            populate({
                path: "questions",
                match: {_id: {$nin: req.body.questions}}
            })).questions;
        options = {
            scriptPath: resolve("functions/"),
            args: [levels, results, questions.length == 0]
        };
        PythonShell.run("exponential.py", options, async (err, result) => {
            if (err) throw err
            else {
                //res.send(result)
                obj = {
                    continueTest: result[0] == 'True',
                    level: parseInt(result[1]),
                    question: null
                }
                if (obj.continueTest) {
                    qs = questions.filter(q => q.difficulty == obj.level);
                    obj.question = qs[Math.floor(Math.random() * qs.length)];
                }
                res.send(obj);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;