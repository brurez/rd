require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const _ = require('lodash');
const faker = require('faker');

require('../models/Visit');
require('../models/Contact')


mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoURI, {
  useMongoClient: true,
});

function it(){
  const { visits, contacts } = mongoose.connection.collections;
  visits.drop(() => {
    contacts.drop(() => {
      done();
    });
  });
}

module.exports = {
  it
};

require('make-runnable');
