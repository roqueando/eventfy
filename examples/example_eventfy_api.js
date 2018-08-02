const EventFy = require('../eventfy');
const Eventfy = new EventFy(8080);


Eventfy.pointer('/user', user => {

	user.on('publish', data => {

		user.emit('publish response', data);

	})
});

// Eventfy.middlePoint('/user', (user, next) => {

// 	if(user.request.headers.auth) return next();
// 	let err = Eventfy.error('Auth error', {
// 		type: 'Authentication_Error'
// 	});
	
// 	next(err);

// });
