const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/Contact');
require('./models/Visit');

console.log('mongoURI', process.env.mongoURI);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoURI, {
  useMongoClient: true
});

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/test', (req, res) => {
  res.send('test ok');
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/website', express.static(path.join(__dirname, 'website')));

require('./routes/contact').routes(app);
require('./routes/visit').routes(app);

if ( app.get('env') !== 'development') {
  app.use('/', express.static(path.join(__dirname, 'client/dist')));

  // if not found defaults to react app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

module.exports = app;
