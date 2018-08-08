const EventFy = require('../eventfy');
const Eventfy = new EventFy();


Eventfy.pointer('/user', user => {

	user.on('publish', data => {

		user.emit('publish response', {msg: 'Publish success'});

	});
});

Eventfy.listen(8080);

