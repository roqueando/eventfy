const EventFy = require('../eventfy');
const express = require('express');
const app = express();

const Eventfy = new EventFy(8080, {
	useExpress: true,
	app: app
	
});

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