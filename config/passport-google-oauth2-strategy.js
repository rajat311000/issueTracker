const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User=require('../models/user');




passport.use(new googleStrategy({
    clientID: '236027598562-2kc35qj1nb211vt5qsvmfa2n1mre3utj.apps.googleusercontent.com', // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
    clientSecret: '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', // e.g. _ASDFA%KFJWIASDFASD#FAD-
    callbackURL: "https://issue-fl6h.onrender.com/users/auth/google/callback",
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("error in google strategy passport",err);
                return;
            }
            console.log(profile);

            if(user){
                return done(null, user);
            }
            else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){

                    if(err){
                        console.log("error in creating user google strategy passport",err);
                        return;
                    }
                    return done(null, user);
                })
            }
        })
    }
))

module.exports = passport;
