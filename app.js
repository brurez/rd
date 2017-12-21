const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

app.use(logger('dev'));

app.get('/api/test', (req, res) => {
  res.send('test ok');
});

/* console.log(app.get('env')); */

if ( app.get('env') !== 'development') {
  app.use('/', express.static(path.join(__dirname, 'client/dist')));

  // if not found defaults to react app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

module.exports = app;
