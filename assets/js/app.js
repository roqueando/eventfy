// let user = io('http://localhost:8080/user');

function pointer(url, name = "") {

	let connect = io(`${url}/${name}`);
	return connect;

}

let post = {

	title: "New Post",
	body: "Lorem ipsum",
	timestamp: new Date()

}



const user = pointer('http://localhost:8080', 'user');
user.emit('publish', post );
user.on('publish response', data => {

	console.log(data);
});


user.on('error', err => {

	console.log(err);

});

user.on('response data', data => {
	$("#put_here").html(`
		<h1>${data.res.title}</h1>
		<blockquote>${data.res.body} at <i>${data.res.timestamp}</i></blockquote>
	`);
});

user.on('protected data', data => {

	console.log(data);
	user.emit('protected response', data);

});