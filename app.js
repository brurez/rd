const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

require('./models/Contact');
require('./models/Visit');

const app = express();

// MongoDB Setup
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

module.exports = app;
