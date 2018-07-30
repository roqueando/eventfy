let user = io('http://localhost:8080/user');

user.emit('event', {message: 'Hello Eventfy'} );