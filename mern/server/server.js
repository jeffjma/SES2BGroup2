const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');

const users = require("./routes/api/users");
const questions = require("./routes/api/questions");
const subjects = require("./routes/api/subjects");
const results = require("./routes/api/results");
const test = require("./routes/api/test");
const exp = require("./routes/api/exponential");

const app = express();
app.use(cors({ origin: "http://localhost:3000", withoutPreflight: true, credentials: true }));
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("We in the database bois!!!"))
  .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/questions", questions);
app.use("/api/subjects", subjects);
app.use("/api/results", results)
app.use("/api/test", test);
app.use("/api/exponential", exp);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));