import rdTracker from './rd-tracker';

const tracker = new rdTracker();

tracker.setUser('Bruno de Rezende', 'brurez@hotmail.com');

debugger;

tracker.addPage();

//tracker._logCookie();

tracker.sendAndCleanHistory();
