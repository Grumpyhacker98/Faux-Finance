const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const userRoutes = require("./routing/userRoute");


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


app.use(userRoutes)

// Start the API server
app.listen(PORT, () => {
    console.log(`Hosting on http://localhost:${PORT}/`);
});