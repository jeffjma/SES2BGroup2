const {PythonShell} =  require("python-shell");
const {resolve} = require("path");
const express = require("express");
const router = express.Router();

// @route GET api/exponential/getNext
// @desc Add a new question to the bank
// @access Public
router.get("/getNext", async (req, res) => {
    levels = req.body.levels;
    results = req.body.results;
    options = {
        scriptPath: resolve("functions/"),
        args: [levels, results]
    };
    PythonShell.run("exponential.py", options, (err, result) => {
        if (err) {
            res.status(500).send(err.stack);
        }
        else {
            obj = {
                continueTest: result[0] == 'True',
                level: parseInt(result[1])
            }
            res.send(obj);
        }
    });
});

module.exports = router;