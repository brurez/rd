const rdTracker = require('../rd-tracker').default;

jest.mock('axios');
//const Cookies = require('universal-cookie');

describe('Rd Tracker Test', () => {

  beforeEach(function() {
    // Mocking window location
    Object.defineProperty(location, "host", {
      value: "teste.com",
      writable: true
    });
    Object.defineProperty(location, "pathname", {
      value: "/pagina",
      writable: true
    });
  });

  test('if is singleton', () => {
    const tracker1 = new rdTracker();
    const tracker2 = new rdTracker();
    expect(tracker1).toBe(tracker2);
  });

  test('if add page to history works', () => {
    //const cookies = new Cookies();
    const tracker = new rdTracker();
    expect(tracker._getHistory()).toEqual([]);
    //console.log('cookie', document.cookie);
    tracker.addPage();
    //console.log('cookie', cookies.get('rd-tracker'));
    //console.log(tracker._getHistory()[0].url);
    expect(tracker._getHistory()[0].url).toBe('teste.com/pagina');

    Object.defineProperty(location, "pathname", {
      value: "/outra",
    });
    tracker.addPage();
    expect(tracker._getHistory()[0].url).toBe('teste.com/pagina');
    expect(tracker._getHistory()[1].url).toBe('teste.com/outra');
  });

  test('if user is set correctly using setUser', () => {
    const tracker = new rdTracker();
    tracker.setUser('Bruno', 'brurez@hotmail.com');
    expect(tracker._getCookie().name).toBe('Bruno');
    expect(tracker._getCookie().email).toBe('brurez@hotmail.com');
  });

  test('if history is cleaned by cleanHistory', () => {
    const tracker = new rdTracker();
    tracker.addPage();
    tracker.addPage();
    Object.defineProperty(location, "pathname", {
      value: "/outra",
    });
    tracker.addPage();
    tracker.cleanHistory();
    expect(tracker._getHistory()).toEqual([]);
  });

  test('if api connection through sendAndCleanHistory is working', done => {
    const tracker = new rdTracker();
    tracker.addPage();
    tracker.sendAndCleanHistory().then( res => {
      expect(res).toBe('ok');
      expect(tracker._getHistory()).toEqual([]);
      done();
    });
  })
});
