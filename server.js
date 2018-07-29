const EventFy = require('./eventfy');
const Eventfy = new EventFy(8080);

Eventfy.public(__dirname + '/assets');

Eventfy.point('/user', (app) => {

	app.sendEvent('sendTime', () => {
		return new Date();
	}, 1000);

});