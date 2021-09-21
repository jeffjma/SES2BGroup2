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

module.exports = router;