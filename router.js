"use strict";

const Authentication = require('./controllers/authentication');
const passport = require('passport');
const passportServices = require('./services/passport');


/**
 * Creating a passport middleware that will intercept requests and
 * use jwt defined strategy to authenticate them. Session false tells
 * passport not to create a session for the request! (Avoid a cookie based approach)
 */
const requireAuth = passport.authenticate('jwt', { session:false });

/**
 * Creating a passport middleware that will intercept requests and
 * use local defined strategy to authenticate them. Session false tells
 * passport not to create a session for the request! (Avoid a cookie based approach)
 */
const requireSignin = passport.authenticate('local', { session: false });


module.exports = function(app)
{
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup',  Authentication.signup);

    app.get('/exampleGetRoute', requireAuth, (req, res) => res.send({success: true, result: "Hello world"}));
};