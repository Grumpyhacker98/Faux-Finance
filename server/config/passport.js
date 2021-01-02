const UserSchema = require('./mongoUser');
const bcrypt = require('bcryptjs');
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    // user authentication strategy
    passport.use(new LocalStrategy((username, password, done) => {
        UserSchema.findOne({ username: username }, (err, user) => {
            if (err) console.log(err)
            if (err) return done(err, null);
            if (!user) return done("user already exists", null);
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) console.log(err)
                if (err) return done(err, null);
                if (result) console.log("user found")
                if (result) return done(null, user);
                else return done("password fail", null);
            })
        })
    }))
    // create user cookie after authentication
    passport.serializeUser((user, cb) => {
        console.log("serializing")
        cb(null, user._id)
    })
    // take cookie and find user then return user data
    passport.deserializeUser((id, cb) => {
        console.log("deserializing")
        UserSchema.findById(id, (err, user) => {
            cb(err, user)
        })
    })
}