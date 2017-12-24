import Cookies from 'universal-cookie';

const cookies = new Cookies(); //private

const rdTracker = require('../index');

describe('Index file of RD Tracker', () => {
  test('if it set the cookie with setUser and updates the form', () => {
    document.body.innerHTML = `
    <html>
        <head></head>
        <body>
            <form id="rd-form" class="ui form">
              <div class="field">
                  <label for="name">Nome</label>
                  <input id="name" name="name" type="text" required>
              </div>
              <div class="field">
                  <label for="email">Email</label>
                  <input id="email" name="email" type="text" required>
              </div>
              <button type="submit" class="ui red button">Registrar</button>
          </form> 
        </body>
      </html>
    `;

    rdTracker.init({ forceNew: true });

    expect(document.querySelector('input[name="name"]').value).toBe('');
    expect(document.querySelector('input[name="email"]').value).toBe('');

    rdTracker.setUser('Bruno', 'brurez@hotmail.com');

    expect(document.querySelector('input[name="name"]').value).toBe(cookies.get('rd-tracker').name);
    expect(document.querySelector('input[name="email"]').value).toBe(cookies.get('rd-tracker').email);

  });

  test('if it set the cookie in the constructor and updates the form', () => {
    document.body.innerHTML = `
    <html>
        <head></head>
        <body>
            <form id="rd-form" class="ui form">
              <div class="field">
                  <label for="name">Nome</label>
                  <input id="name" name="name" type="text" required>
              </div>
              <div class="field">
                  <label for="email">Email</label>
                  <input id="email" name="email" type="text" required>
              </div>
              <button type="submit" class="ui red button">Registrar</button>
          </form> 
        </body>
      </html>
    `;

    const TAG = 'new-tag';

    rdTracker.init({ forceNew: true, name: 'Joao', email: 'joao@email.com', tag: TAG });

    expect(document.querySelector('input[name="name"]').value).toBe(cookies.get(TAG).name);
    expect(document.querySelector('input[name="email"]').value).toBe(cookies.get(TAG).email);

  });


});
