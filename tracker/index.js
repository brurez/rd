import rdTracker from './rd-tracker';

const init = function(config) {
  const tracker = new rdTracker(config);

  tracker.addPage();
  tracker.sendAndCleanHistory();

  if (document.getElementById(tracker.formId))
    document
      .getElementById(tracker.formId)
      .addEventListener('submit', tracker.submit.bind(tracker));
};

const setUser = function(name, email) {
  const tracker = new rdTracker();
  tracker.setUser(name, email);
};

export {
  init,
  setUser,
};
