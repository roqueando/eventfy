// let user = io('http://localhost:8080/user');

function pointer(url, name) {

	let connect = io(`${url}/${name}`);
	return connect;

}

let post = {

	title: "New Post",
	body: "Lorem ipsum",
	timestamp: new Date()

}

let list = {

	users: [
		"John",
		"Marco",
		"Slave"
	]
}

const user = pointer('http://localhost:8080', 'user');
user.emit('publish', post );

const admin = pointer('http://localhost:8080', 'admin');
admin.emit('check', list);

console.log(admin);