const EventFy = require('../eventfy');
const Eventfy = new EventFy(8080);


Eventfy.pointer('/user', user => {

	user.on('publish', data => {

		user.emit('publish response', {msg: 'Publish success'});

	});
});

