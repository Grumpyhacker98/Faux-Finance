const passport = require("passport");
// const localStrategy = require("passport-local").Strategy();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const expressSession = require("express-session");

const express = require("express");
const app = express()
const PORT = process.env.PORT || 3001;

// Connect to the Mongo DB
const mongoose = require("mongoose");
const User = require("./schema/user");
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/fauxfinance",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// middleware
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    credientials: true,
}))

app.use(expressSession({
    secret: "cookieKey",
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser("cookieKey"))


// routes
// will be moved
app.post("/register", (req, res) => {
    console.log(req.body);
    User.findOne({ name: req.body.username }, (err, doc) => {
        if (err) throw console.log(err);
        console.log(doc);
        let newUser = new User({
            username: req.body.username,
            password: req.body.password,
            worth: 10000
        })
        newUser.save()
        res.send("created User")
    })
})

app.post("/login", (req, res) => {
    console.log(req.body);
    User.findOne({ username: req.body.username }, (err, doc) => {
        if (err) throw console.log(err);
        console.log(doc);

    })
})

app.get("/", (req, res) => {
    console.log(req.body);
})



// Start the API server
app.listen(PORT, () => {
    console.log(`Hosting on http://localhost:${PORT}/`);
});