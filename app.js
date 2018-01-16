const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Socket = require('./ServerSocket');

require('dotenv').config();

const app = express();
const socket = new Socket(app);

/*if (app.get('env') !== 'development')
  io.origins("http://localhost:* http://127.0.0.1:*");*/

// MongoDB Setup
require('./models/Contact');
require('./models/Visit');

mongoose.Promise = global.Promise;
if (app.get('env') === 'test') {
  mongoose.connect(process.env.mongoURITest, {
    useMongoClient: true,
  });
} else {
  mongoose.connect(process.env.mongoURI, {
    useMongoClient: true,
  });
}

// Middlewares

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(socket.middleware());

// static routes

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/website', express.static(path.join(__dirname, 'website')));

//in development wepback-dev-server take over

if (app.get('env') !== 'development')
  app.use('/', express.static(path.join(__dirname, 'client/build')));

// api routes

require('./routes/contact').routes(app);
require('./routes/visit').routes(app);
require('./routes/factory').routes(app);

// if not found defaults to react app

if (app.get('env') !== 'development')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

module.exports.app = app;
module.exports.server = socket.server;
