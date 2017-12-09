"use strict";
const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');


exports.signup = async (req, res, next) =>
{
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password)
        return res.status(422).send({error: 'You must provide email and password!'});

    try
    {
        const existingUser = await User.findOne({email: email.toLowerCase()});
        if(existingUser)
            return res.status(422).send({error: 'User already exists'});

        const user = new User({email, password});

        await user.save();

        return res.json({token: tokenForUser(user)});
    }
    catch(error)
    {
        return next(error);
    }
};


exports.signin = async (req, res, next) =>
{
    // User is filled up by the passport local strategy
    const user = req.user;
    res.send({token: tokenForUser(user)});
};

/**
 * @param user
 * @returns {String}
 * This function is used to generate a unique JWT token for the user
 */
function tokenForUser(user)
{
    // sub stands for subject and define whoose this token belong to
    // iat stands for Issued at time
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}



