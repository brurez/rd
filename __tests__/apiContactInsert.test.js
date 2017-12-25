const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const Visit = mongoose.model('visits');
const Contact = mongoose.model('contacts');

describe('Test contact insertion via API', () => {
  beforeEach(done => {
    const { visits, contacts } = mongoose.connection.collections;
    visits.drop(() => {
      contacts.drop(() => {
        done();
      });
    });
  });

  test('if create a contact with no visits', done => {
    const cookie = {
      email: 'maria@email.com',
      history: [],
      name: 'Maria da silva',
      uuid: 'a6208efa-40c0-71ff-e817-250153112495',
    };

    request(app)
      .post('/api/contacts')
      .send(cookie)
      .then(res => {
        Contact.find({}).exec((err, res) => {
          expect(res[0].email).toBe(cookie.email);
          expect(res[0].name).toBe(cookie.name);
          done();
        });
      });
  });

});
