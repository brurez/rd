const rdTracker = require('../rd-tracker').default;

describe('Rd Tracker Test', () => {

  const document = {
    cookie: ''
  };

  window.location = {
    host: "teste.com",
    pathname: "/pagina"
  };

  beforeAll(() => {

  });

  test('if is singleton', () => {
    const tracker1 = new rdTracker();
    const tracker2 = new rdTracker();
    expect(tracker1).toBe(tracker2);
  });

  test('if add page to history works', () => {
    const tracker = new rdTracker();
    expect(tracker._getHistory()).toEqual([]);
    tracker.addPage();
    console.log(tracker._getHistory());
    expect(tracker._getHistory().url).toBe('teste.com/pagina');
  })
});
