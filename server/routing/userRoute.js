const router = require("express").Router();
const bcrypt = require("bcryptjs");
const UserSchema = require("../config/mongoUser");


router.route("/register")
    .post((req, res) => {
        console.log(req.body);
        UserSchema.findOne({ username: req.body.username }, async (err, user) => {
            if (err) return console.log(err);
            if (user) return console.log("err");
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

router.route("/login")
    .post((req, res) => {
        console.log(req.body);
        passport.authenticate("local", (err, user, info) => {
            if (err) throw (err);
            if (!user) res.send("No user found");
            else {
                req.logIn(user, err => {
                    if (err) throw err;
                    res.send("Login sucessful")
                })
            }
        })
        // UserSchema.findOne({ username: req.body.username }, (err, user) => {
        //     if (err) throw console.log(err);

        //     console.log(user);
        // })
    })


router.route("/user")
    .get((req, res) => {
        console.log(req.body);

    })

module.exports = router;