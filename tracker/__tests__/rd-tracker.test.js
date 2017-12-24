const RdTracker = require('../rd-tracker').default;

jest.mock('axios');

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
    const tracker1 = new RdTracker();
    const tracker2 = new RdTracker();
    expect(tracker1).toBe(tracker2);
    const tracker3 = new RdTracker({ forceNew: true });
    expect(tracker3).not.toBe(tracker1);
  });

  test('if add page to history works', () => {
    const tracker = new RdTracker({ forceNew: true });
    expect(tracker._getHistory()).toEqual([]);
    tracker.addPage();
    expect(tracker._getHistory()[0].url).toBe('teste.com/pagina');

    Object.defineProperty(location, "pathname", {
      value: "/outra",
    });
    tracker.addPage();
    expect(tracker._getHistory()[0].url).toBe('teste.com/pagina');
    expect(tracker._getHistory()[1].url).toBe('teste.com/outra');
  });

  test('if user is set / get correctly using setUser and getUser', () => {
    const tracker = new RdTracker({ forceNew: true });
    tracker.setUser('Bruno', 'brurez@hotmail.com');
    expect(tracker._getCookie().name).toBe('Bruno');
    expect(tracker._getCookie().email).toBe('brurez@hotmail.com');
    expect(tracker.getUser().name).toBe('Bruno');
    expect(tracker.getUser().email).toBe('brurez@hotmail.com');

  });

  test('if name and email getters are working', () => {
    const tracker = new RdTracker({ forceNew: true });
    tracker.setUser('Bruno', 'brurez@hotmail.com');
    expect(tracker.name).toBe('Bruno');
    expect(tracker.email).toBe('brurez@hotmail.com');
  });

  test('if history is cleaned by cleanHistory', () => {
    const tracker = new RdTracker({ forceNew: true });
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
    const tracker = new RdTracker({ forceNew: true });
    tracker.addPage();
    tracker.sendAndCleanHistory().then( res => {
      expect(res).toBe('ok');
      expect(tracker._getHistory()).toEqual([]);
      done();
    });
  })
});
