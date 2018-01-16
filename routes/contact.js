const mongoose = require('mongoose');
const cors = require('cors');

const Contact = mongoose.model('contacts');
const Visit = mongoose.model('visits');
const { apiGet } = require('./_helpers');

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
  app.options('/api/contacts', cors()); // hablilita CORS pre-flight
  app.post('/api/contacts', cors(),  (req, res) => {
    contactInsert(req.body)
      .then(contact => {
        res.wss.broadcast('new-contact');
        res.send(contact);
      })
      .catch(err => res.status(500).send(err));
  });

};

function contactInsert(body){
  return new Promise((resolve, reject) => {
    const { uuid, name, email } = body;

    if (email) {
      Contact.findOne({ email }, (err, contact) => {
        if (!contact) {
          // usuario não casdastrado nos contatos, adicionando contato
          const newContact = new Contact({
            name,
            email,
          });
          newContact.save((err, contact) => {

            // Procura todas as visitas anonimas com o mesmo uuid e adiciona contato

            Visit.updateMany(
              {uuid, _contact: {$exists: false}},
              {$set: {_contact: contact.id}},
              (err, res) => {
                if(err) reject(err);
                resolve(res);
              },
            );
          });
        }
      });
    }
  });
}

module.exports = { routes };
