require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const _ = require('lodash');
const faker = require('faker');

require('../models/Contact');
const { apiPost } = require('../routes/helpers');
const Contact = mongoose.model('contacts');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoURI, {
  useMongoClient: true,
});

function create(num = 10) {
  faker.locale = 'pt_BR';

  let contacts = _.times(num, index => {
    const req = {
      body: {
        name: faker.name.findName(),
        email: faker.internet.email(),
      },
    };
    return apiPost(req, Contact);
  });

  Promise.all(contacts).then(contacts => {
    console.log('Faker insert finished');
    return contacts;
  });
}

module.exports = {
  create
};

require('make-runnable');

//create(10);
