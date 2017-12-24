const mongoose = require('mongoose');

const Contact = mongoose.model('contacts');
const Visit = mongoose.model('visits');
const { apiPost, apiGet } = require('./helpers');

const routes = app => {

  // CARREGA UM
  app.get('/api/contacts/:id', (req, res) => {
    apiGet(req, Contact, req.params.id)
      .then(contacts => {

        // anexa todas as visitas ao objeto do contato retornado

        Visit.find({_contact: req.params.id}).sort('-visitedAt').exec((err, visits) => {
          const contact = contacts.data[0].toObject();
          contact.visits = visits.map(item => item.toObject());
          res.send(contact);
        });

      })
      .catch(err => res.status(500).send(err));
  });

  // CARREGA TODOS
  app.get('/api/contacts', (req, res) => {
    apiGet(req, Contact)
      .then(contacts => res.send(contacts))
      .catch(err => res.status(500).send(err));
  });

  // INSERE UM
  app.post('/api/contacts', (req, res) => {
    apiPost(req, Contact)
      .then(contact => {
        res.send(contact);
      })
      .catch(err => res.status(500).send(err));
  });

};

module.exports = { routes };
