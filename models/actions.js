
const insert = () => {
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
