const expressSession = require("express-session");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const userRoutes = require("./routing/userRoute");

const UserSchema = require("./config/mongoUser");
const bcrypt = require("bcryptjs");


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
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
    // console.log(req.headers.origin);

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
    credientials: "include",
}));

app.use(expressSession({
    secret: "cookieKey",
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: null,
    },
}))
app.use(cookieParser())

// passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use(userRoutes)
app.post("/", (req, res, next) => {
    console.log("ping")
})

app.post("/register", (req, res) => {
    UserSchema.findOne({ username: req.body.username }, async (err, user) => {
        if (err) console.log(err)
        if (user) console.log("user exists")
        if (!user) {
            let encryptedPassword = await bcrypt.hash(req.body.password, 10)
            let newUser = new UserSchema({
                username: req.body.username,
                password: encryptedPassword,
                worth: 10000,
            })
            newUser.save().then(savedUser =>
                req.login(savedUser, err => {
                    if (err) console.log(err)
                    else {
                        let returnUser = {
                            name: savedUser.username,
                            worth: newUser.worth,
                        }
                        // req.session.user = 
                        console.log(req.session)
                        console.log(req.user)
                        res.send(returnUser);
                    }
                })
            )
        }
    })
})

app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (err) console.log(err)
        if (!user) console.log("No user found")
        let returnUser = {
            name: user.username,
            worth: user.worth,
            stockData: user.stockData
        }
        res.send(returnUser);
        console.log(req.session)
    })(req, res, next);
})

app.get("/logout", (req, res,) => {



    res.send("ping")
})

app.get("/user", (req, res) => {
    console.log(req.isAuthenticated())
    if (req.user) {
        console.log("FOUND" + req.user)
    } else {
        console.log("no req.user")
    }

    console.log(req.session);
    console.log("ping");

    res.send(req.session)
    // UserSchema.findById(req.session.passport.id, (err, user) => {
    //     if (err) console.log(err)
    //     console.log(user)
    //     // else res.send(user)
    // })
})

// Start the API server
app.listen(PORT, () => {
    console.log(`Hosting on http://localhost:${PORT}/`);
});