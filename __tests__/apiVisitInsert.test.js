const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const Visit = mongoose.model('visits');
const Contact = mongoose.model('contacts');

describe('Test visit insertion via API', () => {
  beforeEach(done => {
    const { visits, contacts } = mongoose.connection.collections;
    visits.drop(() => {
      contacts.drop(() => {
        done();
      });
    });
  });

  test('if insert a anonymous visit without user', done => {
    const cookie = {
      email: '',
      history: [
        {
          url: 'teste.com/testando',
          visitedAt: new Date(),
        },
      ],
      name: '',
      uuid: 'a6208efa-40c0-71ff-e817-250153112495',
    };

    request(app)
      .post('/api/visits')
      .send(cookie)
      .then(res => {
        expect(res.text).toBe('ok');

        Visit.find({}).exec((err, res) => {
          expect(res[0].url).toBe(cookie.history[0].url);
          expect(res[0].uuid).toBe(cookie.uuid);
          expect(res[0].visitedAt).toEqual(cookie.history[0].visitedAt);
          expect(res[0]._contact).toBeUndefined();

          Contact.find({}).exec((err, res) => {
            expect(res).toEqual([]);
            done();
          });

        });
      });
  });

  test('if inserts a visit and creates a user', done => {
    const cookie = {
      email: 'maria@email.com',
      history: [
        {
          url: 'teste.com/testando',
          visitedAt: new Date(),
        },
      ],
      name: 'Maria da silva',
      uuid: 'a6208efa-40c0-71ff-e817-250153112495',
    };

    request(app)
      .post('/api/visits')
      .send(cookie)
      .then(res => {
        expect(res.text).toBe('ok');

        Visit.find({}).exec((err, res) => {
          //console.log(res);
          expect(res[0].url).toBe(cookie.history[0].url);
          expect(res[0].uuid).toBe(cookie.uuid);
          expect(res[0].visitedAt).toEqual(cookie.history[0].visitedAt);

          const contactId = res[0]._contact.toString();

          Contact.find({ _id: contactId }).exec((err, res) => {
            expect(res[0].name).toBe(cookie.name);
            expect(res[0].email).toBe(cookie.email);
          });

          done();
        });
      });
  });

  test('if inserts many visits at once', done => {
    const cookie = {
      email: 'maria@email.com',
      history: [
        {
          url: 'teste.com/testando1',
          visitedAt: new Date(1999),
        },
        {
          url: 'teste.com/testando2',
          visitedAt: new Date(2016),
        },
      ],
      name: 'Maria da silva',
      uuid: 'a6208efa-40c0-71ff-e817-250153112495',
    };

    request(app)
      .post('/api/visits')
      .send(cookie)
      .then(res => {
        expect(res.text).toBe('ok');

        Visit.find({ url: cookie.history[0].url }).exec((err, res) => {
          expect(res[0].uuid).toBe(cookie.uuid);
          expect(res[0].visitedAt).toEqual(cookie.history[0].visitedAt);

          Visit.find({ url: cookie.history[1].url }).exec((err, res) => {
            expect(res[0].uuid).toBe(cookie.uuid);
            expect(res[0].visitedAt).toEqual(cookie.history[1].visitedAt);
            done();
          });
        });
      });
  });
});
