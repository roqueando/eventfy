![Eventfy](Eventfy.png)
# Eventfy

That is a module for real-time event-based APIs.

### Installing

`npm install --save evenfty`


### Usage

* On Server-Side

```javascript

const EventFy = require('eventfy');
const Eventfy = new EventFy();

// the pointer is set and I used the same name
// to his socket
Eventfy.pointer('/user', user => {

	// user gains the EventEmitter powers,
	// because he is the socket
	user.on('publish', data => {

		console.log(data.title);

	});

});

// same thing but with other pointer
// note that pointers are similar to endpoints RESTful
Eventfy.pointer('/admin', admin => {

	admin.on('check', data => {

		console.log(data.users);
		
	});

});

```


## API

## `new Eventfy()`

He come with a default port 8080 that will turn on the server and require the Socket.io module. For now is made with http module, but soon will have integration with Express. e.g.:

```javascript	

const EventFy = require('../eventfy');
const Eventfy = new EventFy();

```



## `.pointer(pointerName, callback)`


That will create a socket.io's namespace, like a endpoint `GET /user/profile` but, with pointer is needed only a `.pointer()` which is created a 'endpoint' where you will create your events. Check the example.

```javascript

//			pointerName   callback
Eventfy.pointer('/admin', admin => {

	// here will stay your events
	//...

});


```


## Built With

* [Socket.io](https://socket.io/) - featuring the fastest and most reliable real-time engine

* [Canva](https://canva.com) - Logo made by canva.com

## Contributing

Please read [CONTRIBUTING.md](https://github.com/roqueando/eventfy/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to me.


## Authors

* **Vítor Roque** - *Initial work* - [Roqueando](https://github.com/roqueando)

See also the list of [contributors](https://github.com/roqueando/eventfy/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Endpoints as Event Points
* WebSocket
* A more faster and event-based API
