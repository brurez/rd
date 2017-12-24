require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const _ = require('lodash');
const faker = require('faker');

require('../models/Visit');
require('../models/Contact');
const { visitInsert } = require('../routes/visit');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoURI, {
  useMongoClient: true,
});

function populate(num = 10) {
  faker.locale = 'pt_BR';

  let inserts = _.times(num, index => {
    const cookie = {
      email: faker.internet.email(),
      history: [],
      name: faker.name.findName(),
      uuid: faker.random.word(),
    };
    _.times(5, index => {
      cookie.history.push(
        {
          url: 'teste.com',
          visitedAt: faker.date.recent(),
        },
        {
          url: 'teste.com/contato',
          visitedAt: faker.date.recent(),
        },
        {
          url: 'teste.com/precos',
          visitedAt: faker.date.recent(),
        },
      );
    });

    return visitInsert(cookie);
  });

  Promise.all(inserts).then(inserts => {
    console.log('Faker insert finished');
    return inserts;
  });
}

if(process.argv[2] === 'exec')
  populate();

module.exports = {
  populate
};
