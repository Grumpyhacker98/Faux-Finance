const UserSchema = require('./mongoUser');
const bcrypt = require('bcryptjs');
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    // user authentication strategy
    passport.use(new LocalStrategy((username, password, done) => {
        UserSchema.findOne({ username: username }, (err, user) => {
            if (err) console.log(err)
            if (err) return done(err, false);
            if (!user) return done("user exists", false);
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) console.log(err)
                if (err) return done(err, false);
                if (result) return done(null, user);
                else return done("password fail", false);
            })
        })
    }))
    // create user cookie after authentication
    passport.serializeUser((user, cb) => {
        cb(null, user.id)
    })
    // take cookie and find user then return user data
    passport.deserializeUser((id, cb) => {
        UserSchema.findOne({ _id: id }, (err, user) => {
            cb(err, user)
        })
    })
}