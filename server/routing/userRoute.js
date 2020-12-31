const router = require("express").Router();
const bcrypt = require("bcryptjs");
const UserSchema = require("../config/mongoUser");
const passport = require("../server");
// import * as passport from "../server";


router.route("/register")
    .post((req, res) => {
        console.log(req.body);
        UserSchema.findOne({ username: req.body.username }, async (err, user) => {
            if (err) return console.log(err);
            if (user) return console.log("user already exists");
            if (!user) {
                let encryptedPassword = await bcrypt.hash(req.body.password, 10)
                let newUser = new UserSchema({
                    username: req.body.username,
                    password: encryptedPassword,
                    worth: 10000
                })
                newUser.save()
                res.send("Your account has now been registered")
            }
        })
    })

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