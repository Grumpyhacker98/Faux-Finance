const bcrypt = require("bcryptjs");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const UserSchema = require("./config/mongoUser");
const passport = require("passport");


const app = express()
const PORT = process.env.PORT || 3001;

// Connect to the Mongo DB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/fauxfinance",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    credientials: true,
}));

app.use(expressSession({
    secret: "cookieKey",
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser("cookieKey"));

// passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// routes
// will be moved
app.post("/register", (req, res) => {
    console.log(req.body);
    UserSchema.findOne({ name: req.body.username }, (err, user) => {
        if (err) throw console.log(err);
        if (user) throw console.log("user already exists");
        if (!user) {
            let newUser = new UserSchema({
                username: req.body.username,
                password: req.body.password,
                worth: 10000
            })
            newUser.save()
            res.send("Registered new User")
        }
    })
})

app.post("/login", (req, res) => {
    console.log(req.body);
    UserSchema.findOne({ username: req.body.username }, (err, doc) => {
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