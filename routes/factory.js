const { drop } = require('../factory/drop');

const routes = app => {
  app.post('/api/factory/drop', (req, res) => {
    drop();
    res.send('ok');
  })
};

module.exports = { routes };
