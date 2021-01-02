const router = require("express").Router();
const bcrypt = require("bcryptjs");
const UserSchema = require("../config/mongoUser");
const passport = require("../server");
// import * as passport from "../server";

// router.route("/login")
//     .post((req, res) => {
//         console.log(req.body);
//         passport.authenticate("local", res.send("authenticate fail")), (err, user) => {
//             if (err) throw (err);
//             if (!user) res.send("No user found");
//             else {
//                 req.logIn(user, err => {
//                     if (err) throw err;
//                     res.send("Login sucessful")
//                 })
//             }
//         }
//     })


// router.route("/user")
//     .get((req, res) => {
//         console.log(req);
//         console.log(req.user);

//     })

module.exports = router;