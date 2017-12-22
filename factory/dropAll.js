require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const _ = require('lodash');
const faker = require('faker');

require('../models/Visit');
require('../models/Contact');
const { apiPost } = require('../routes/helpers');
const Visit = mongoose.model('visits');
const Contact = mongoose.model('contacts');


mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoURI, {
  useMongoClient: true,
});

function createGuests(num = 10) {
  faker.locale = 'pt_BR';

  let visits = _.times(num, index => {
    const req = {
      body: {
        url: faker.name.findName(),
        visitedAt: faker.internet.email(),
        uuid: faker.random.
      },
    };
    return apiPost(req, Visit);
  });

  Promise.all(visits).then(visits => {
    console.log('Faker insert finished');
    return visits;
  });
}

module.exports = {
  create
};

require('make-runnable');

//create(10);
