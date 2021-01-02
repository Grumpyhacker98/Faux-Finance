const UserSchema = require('./mongoUser');
const bcrypt = require('bcryptjs');
const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
    // user authentication strategy, called during passport.authenticate('local')
    passport.use(new LocalStrategy((username, password, done) => {
        UserSchema.findOne({ username: username }, (err, user) => {
            if (err) return done(err, null);
            if (!user) return done("user already exists", null);
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) return done(err, null);
                if (!result) return done("password fail", null);
                done(null, user);
            })
        })
    }))
    // create user cookie after authentication, called during req.login(user, () =>)
    passport.serializeUser((user, cb) => {
        cb(null, user._id)
    })
    // take cookie and find user then return user data, called whenever a request is made
    passport.deserializeUser((id, cb) => {
        UserSchema.findById(id, (err, user) => {
            cb(err, user)
        })
    })
}