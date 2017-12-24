module.exports = {
  post: (url, body) => {
    return new Promise((resolve, reject) => {
      process.nextTick(() => resolve({ data: 'ok' }));
    });
  },
};
