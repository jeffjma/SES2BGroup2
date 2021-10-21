const express = require("express");
const router = express.Router();
// Load Award Model
const Award = require("../../models/Award");


// @route POST api/awards/add
// @desc Add a new award to the bank
// @access Public
router.post("/add", (req, res) => {
    const newAward = new Award(req.body);

    try {
        newAward.save();
        res.send(newAward);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route GET api/awards/getAll
// @desc Get all the questions in the question bank
// @access Public
router.get("/getAll", async (req, res) => {
    const awards = await Award.find({});

    try {
        res.send(awards);
    } catch (err) {
        res.status(500).send(err);
    }
});

// @route POST api/awards/edit
// @desc Get all the questions in the question bank
// @access Public
router.post("/edit", async (req, res) => {
    try {
        oldAward = await Award.findByIdAndUpdate(req.body.questionId, req.body.updates);
        res.send(oldAward);
    } catch (err) {
        res.status(500).send(err);
    }
});


module.exports = router;