"use strict";

// To use mongo, after installing run: sudo chown -R $USER /data/db

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const settings = require('./config');


const app = express();
const router = require('./router');

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// App Setup
app.use(morgan('combined'));  // logging framework used for debug
app.use(bodyParser.json({type: '*/*'})); // parse every request as json
router(app);

// Server Setup
const port = process.env.PORT || settings.api_server.port;

const server = http.createServer(app);
server.listen(port);

console.log('Server listening on port:', port);