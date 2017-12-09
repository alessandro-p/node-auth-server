# node-auth-server

Basic node.js auth server using passport, jwt and mongodb that can be used as a
starting point for a basic node.js API Server.

## Prerequisites
In order to run this project you need to have **Mongodb installed and running**
on your machine.

## Usage
After cloning the repository, modify the config.js file as you wish.
There you will find server options and JWT secret.
Then run:

``` bash
cd node-auth-server
npm install
node index.js
```

In router.js are defined 3 basic routes:

``` javascript
module.exports = function(app)
{
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup',  Authentication.signup);

    app.get('/exampleGetRoute', requireAuth, (req, res) => res.send({success: true, result: "Hello world"}));
};
```

From there you can start to define your own routes.


In `services/passport.js` are defined two ways of authentication:

1. Email and password strategy
2. JWT strategy






