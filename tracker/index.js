import * as Cookies from "js-cookie";

console.log(324234234);

const tracker = Cookies.get('tracker');

const visits = tracker.visits ? tracker.visits : [];

visits.push(window.location.href);

Cookies.set(tracker, { visits });
