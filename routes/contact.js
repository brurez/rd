const mongoose = require('mongoose');

const Contact = mongoose.model('contacts');
const { apiPost, apiPut, apiGet } = require('./helpers');

const routes = app => {

  // CARREGA UM
  app.get('/api/contacts/:id', (req, res) => {
    apiGet(req, Contact, req.params.id)
      .then(services => res.send(services))
      .catch(err => res.status(500).send(err));
  });

  // CARREGA TODOS
  app.get('/api/contacts', (req, res) => {
    apiGet(req, Contact)
      .then(services => res.send(services))
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

  // ATUALIZA UM
  app.put('/api/contacts/:id', (req, res) => {
    apiPut(req, Contact)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
};

module.exports = { routes };
