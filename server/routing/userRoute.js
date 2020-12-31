const router = require("express").Router();
const bcrypt = require("bcryptjs");
const UserSchema = require("../config/mongoUser");

router.route("/register")
    .post((req, res) => {
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
        UserSchema.findOne({ username: req.body.username }, (err, doc) => {
            if (err) throw console.log(err);
            console.log(doc);
        })
    })


router.route("/user")
    .get((req, res) => {
        console.log(req.body);

    })

module.exports = router;