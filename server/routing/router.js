const bcrypt = require("bcryptjs");
const UserSchema = require("../config/mongoUser");

module.exports = (app, passport) => {

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
                    stockData: []
                })
                newUser.save().then(savedUser =>
                    req.login(savedUser, err => {
                        if (err) console.log(err)
                        let returnUser = {
                            username: savedUser.username,
                            worth: newUser.worth,
                            stockData: newUser.stockData
                        }
                        console.log("user created")
                        res.send(returnUser);
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
                _id: user._id,
                username: user.username,
                worth: user.worth,
                stockData: user.stockData
            }
            req.login(user, err => {
                if (err) console.log(err)
                else {
                    console.log("user login")
                    res.send(returnUser);
                }
            })
        })(req, res, next);
    })

    app.get("/logout", (req, res,) => {

        console.log("user logout")
        req.logout()

        res.send("logged out")
    })

    app.get("/user", (req, res) => {

        console.log(req.user)
        if (req.user) {
            res.send(req.user)
        } else {
            res.send(null)
        }
    })
}