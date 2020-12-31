const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
// const localStrategy = require("passport-local").Strategy();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const expressSession = require("express-session");
const bodyParser = require("body-parser");

const app = express()
const PORT = process.env.PORT || 3001;

// middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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