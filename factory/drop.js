require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

require('../models/Visit');
require('../models/Contact');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoURI, {
  useMongoClient: true,
});

function drop() {
  const { visits, contacts } = mongoose.connection.collections;
  visits.drop(() => {
    contacts.drop(() => {
      console.log( 'all collections dropped');
    });
  });
}

if(process.argv[2] === 'exec')
  drop();


module.exports = {
  drop
};
