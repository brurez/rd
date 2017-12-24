const mongoose = require('mongoose');

const Visit = mongoose.model('visits');
const Contact = mongoose.model('contacts');
const { apiGet } = require('./helpers');

const routes = app => {
  // CARREGA UM
  app.get('/api/visits/:id', (req, res) => {
    apiGet(req, Visit, req.params.id)
      .then(services => res.send(services))
      .catch(err => res.status(500).send(err));
  });

  // CARREGA TODOS
  app.get('/api/visits', (req, res) => {
    apiGet(req, Visit)
      .then(visits => {
        Visit.populate(visits.data, '_contact').then(data =>
          res.send({ data, count: visits.count }),
        );
      })
      .catch(err => res.status(500).send(err));
  });

  // INSERE UM
  app.post('/api/visits', (req, res) => {
    visitInsert(req.body)
      .then(status => {
        res.send(status);
      })
      .catch(err => res.status(500).send(err));
  });
};

function visitInsert(body) {
  return new Promise((resolve, reject) => {
    const { uuid, name, email, history } = body;

    if (email) {
      // Usuário com cadastro ou com requisitos para cadastrar-se
      // Insira nova visita relacionanda com contato
      Contact.findOne({ email }, (err, contact) => {
        if (!contact) {
          // usuario não casdastrado nos contatos, adicionando contato e depois visita
          const newContact = new Contact({
            name,
            email,
          });
          newContact.save((err, contact) => {
            const allVisits = history.map(item => {
              item.uuid = uuid;
              item._contact = contact._id;
              return item;
            });

            Visit.insertMany(allVisits, (err, res) => {
              if (err) {
                reject('visit insert with new contact failed', err);
              }
              resolve('ok');
            });

            // Procura todas as visitas anonimas com o mesmo uuid e adiciona contato

            Visit.updateMany(
              { uuid, _contact: { $exists: false } },
              { $set: { _contact: contact.id } },
              (err, res) => {
                //console.log(err);
                //console.log(res);
              },
            );
          });
        } else {
          // usuario casdastrado nos contatos, adicionando visita
          const allVisits = history.map(item => {
            item.uuid = uuid;
            item._contact = contact.id;
            return item;
          });
          Visit.insertMany(allVisits, (err, res) => {
            if (err) {
              reject('visit insert with new contact failed', err);
            }
            resolve('ok');
          });
        }
      });
    } else {
      // Usuário anonimo, apenas insira a visita sem referência a contato

      const allVisits = history.map(item => {
        item.uuid = uuid;
        return item;
      });

      Visit.insertMany(allVisits, (err, res) => {
        if (err) {
          //console.log(err);
          reject('visit insert failed', err);
        }
        resolve('ok');
      });
    }
  });
}

module.exports = { routes, visitInsert };
