const expressSession = require("express-session");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const userRoutes = require("./routing/userRoute");

var cookieParser = require('cookie-parser')

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

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Pass to next layer of middleware
    next();
});

app.use(cors({
    origin: "http://localhost:3000",
    credientials: false,
}));
app.use(passport.initialize());

app.use(expressSession({
    secret: "cookieKey",
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 6 * 60 * 60 * 1000
    },
}))
app.use(cookieParser())

// passport
app.use(passport.session());
require('./config/passport')(passport);


app.use(userRoutes)
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (err) throw console.log(err);
        if (!user) res.send("No user found");
        else {
            req.logIn(user, err => {
                if (err) return console.log(err);
                console.log(req.user)
                console.log(req.session)
                // req.session.user = req.user;
                res.send("Login sucessful")
            })
        }
    })(req, res, next);
})

app.get("/user", (req, res) => {
    console.log(req.user)
    console.log(req.session)
    console.log(req.cookies)
    // console.log()
})

// Start the API server
app.listen(PORT, () => {
    console.log(`Hosting on http://localhost:${PORT}/`);
});