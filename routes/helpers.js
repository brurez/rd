const _ = require('lodash');

const apiGet = (req, Model, id) => {
  return new Promise((resolve, reject) => {
    const { sort, limit, skip } = req.query;

    const findObj = id ? { _id: id } : {};

    const countP = Model.count(findObj).exec();
    const findP = Model.find(findObj)
      .sort(sort)
      .limit(Number(limit))
      .skip(skip ? Number(skip) : 0)
      .exec();

    Promise.all([countP, findP])
      .then(([count, data]) => {
        resolve({ data, count });
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

const apiPost = (req, Model) => {
  let _data = req.body;

  const model = new Model(_data);
  return new Promise((resolve, reject) => {
    model.save((err, data) => {
      if (err) {
        console.log(err);
        reject('apiPost Err', err);
      }
      resolve(data);
      console.log('apiPost Data', data);
    });
  });
};

const apiPut = (req, Model) => {
  return new Promise((resolve, reject) => {
    const _id = req.params.id;
    const body = _.omit(req.body, ['_id']);
    Model.updateOne(
      { _id },
      {
        $set: flatten(body)
      },
      {},
      (err, writeOpResult) => {
        if (err) reject(err);
        resolve({ updated: !!writeOpResult.n });
      }
    )
  })
};

function extraQuery(req) {
  const reserved = ['sort', 'limit', 'skip'];
  return _.omit(req.query, reserved);
}


module.exports = { apiGet, apiPost, apiPut };

