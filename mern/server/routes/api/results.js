const express = require("express");
const router = express.Router();
// Load Result & User Model
const Result = require("../../models/Result");

// @route POST api/questions/add
// @desc Add a new result
// @access Public
router.post("/add", (req, res) => {
    const newResult = new Result(req.body);

    try {
        newResult.save();
        res.send(newResult);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;