module.exports = {
  get: (url, body) => {
    if (url === '/api/contacts/123') {
      return new Promise((resolve, reject) => {
        resolve( {
          data: {
            _id: '123',
            name: 'Bruno de Rezende',
            email: 'brurez@hotmail.com',
            __v: 0,
            createdAt: '2017-12-22T15:56:30.589Z',
            visits: [
              {
                _id: '5a3d3bff43238f0b4cb7d5b4',
                __v: 0,
                visitedAt: '2017-12-22T17:08:15.345Z',
                url: 'localhost:5000/website/contato.html',
                uuid: '249a583a-dbb9-e35a-39bb-edcc4a010f6e',
                _contact: '5a3d2ca488a1460a7ac5e38f',
              },
              {
                _id: '5a3d3ba93f68a50b45d6fda6',
                __v: 0,
                visitedAt: '2017-12-22T17:06:49.443Z',
                url: 'localhost:5000/website/contato.html',
                uuid: '249a583a-dbb9-e35a-39bb-edcc4a010f6e',
                _contact: '5a3d2ca488a1460a7ac5e38f',
              }
            ],
          },
        });
      });

    }
  }
};
