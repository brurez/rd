module.exports = {
  get: (url, body) => {
    if (url === '/api/contacts/123') {
      return new Promise((resolve, reject) => {
        resolve({
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
              },
            ],
          },
        });
      });
    } else if (url === '/api/contacts') {
      return new Promise((resolve, reject) => {
        resolve({
          data: {
            data: [
              {
                _id: '5a3d2ca488a1460a7ac5e38f',
                name: 'Bruno de Rezende',
                email: 'brurez@hotmail.com',
                __v: 0,
                createdAt: '2017-12-22T15:56:30.589Z',
              },
              {
                _id: '5a3d3c1143238f0b4cb7d5b5',
                name: 'João do Teste',
                email: 'joao@teste.com',
                __v: 0,
                createdAt: '2017-12-22T17:08:13.359Z',
              },
              {
                _id: '5a3d46204c396a0b8b9c593d',
                name: 'Babi Reno',
                email: 'babi@gmail.com',
                __v: 0,
                createdAt: '2017-12-22T17:24:10.541Z',
              },
            ],
            count: 3,
          }

        });
      });
    } else if (url === '/api/visits?sort=-visitedAt&limit=10') {
      return new Promise((resolve, reject) => {
        resolve({
          data: {
            data: [
              {
                _id: '5a3fcc190e5e9300145a116e',
                __v: 0,
                visitedAt: '2017-12-24T15:47:37.603Z',
                url: 'rd.toplayalong.com/sobre.html',
                uuid: 'a795afd3-e6a0-c5a8-2886-004a9daea843',
              },
              {
                _id: '5a3fcc170e5e9300145a116d',
                __v: 0,
                visitedAt: '2017-12-24T15:47:34.998Z',
                url: 'test.com',
                uuid: 'a795afd3-e6a0-c5a8-2886-004a9daea843',
              },
            ],
            count: 2,
          }

        });
      });
    }
  },
};
