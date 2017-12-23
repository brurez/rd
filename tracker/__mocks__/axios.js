module.exports = {
  post: (http, data) => {
    return new Promise((resolve, reject) => {
      process.nextTick(() => resolve({ data: 'ok' }));
    });
  },
};
