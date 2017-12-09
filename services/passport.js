"use strict";

const passport = require('passport');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = require('../models/user');

/**
 * A passport strategy is a method to authenticate a User
 */


// region email - password strategy

/**
 * @type {{usernameField}} Tell the strategy to use the field email as username
 */
const localOptions = {usernameField: 'email'};

/**

 * @param email
 * @param password
 * @param done: Callback function
 */
const localLogin = new LocalStrategy(localOptions, async(email, password, done) =>
{
    try
    {
        const user = await User.findOne({email: email.toLowerCase()});

        if(!user)
            return done(null, false);


        user.comparePassword(password, (err, isMatch) => {
            if(err)
                return done(err);
            if(!isMatch)
                return done(null, false);

            return done(null, user);
        });
    }
    catch(err)
    {
        return done(err);
    }

});
//endregion

// region JWT strategy
/**
 * @type {{jwtFromRequest}} Tell the strategy where to find the JWT. (Eg. Authorization header)
 * @type {{secretOrKey}} Tell the strategy what secret to use when decoding
 */
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};


/**
 * @param payload: The decoded JWT token
 * @param done: Callback function
 */
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) =>
{
    try
    {
        const user_id = payload.sub;
        const user = await User.findById(user_id);

        if(user)
            return done(null, user);
        else
            return done(null, false);
    }
    catch(err)
    {
        return done(err, false);
    }
});

// endregion

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);


