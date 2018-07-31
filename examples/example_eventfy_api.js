const EventFy = require('../eventfy');
const Eventfy = new EventFy();

Eventfy.pointer('/user', user => {

	user.on('publish', data => {

		console.log(data.title);

	});

});

Eventfy.pointer('/admin', admin => {

	admin.on('check', data => {

		console.log(data.users);
		
	});

});