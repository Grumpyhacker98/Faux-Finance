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
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/fauxfinancedata",
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
})

app.post("/login", (req, res) => {
    console.log(req.body);
})

app.get("/", (req, res) => {
    console.log(req.body);
})



// Start the API server
app.listen(PORT, () => {
    console.log(`Hosting on http://localhost:${PORT}/`);
});