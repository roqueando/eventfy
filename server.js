const EventFy = require('./eventfy');
const Eventfy = new EventFy(8080);

Eventfy.pointer('/user', namespace => {

	namespace.on('connection', socket => {

		socket.on('event', data => {
			console.log(data.message);
		});

	});

});