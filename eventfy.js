/**
 * Evenfty class module
 *
 * @author Vítor Roque <vitor.rpereira@hotmail.com>
 * @copyright Roqueando <github.com/roqueando>
 * @description That module is for all real-time event-based APIs
 *              which want a fast time in your responses.
 *              Changing a bit of RESTful default, I changed all
 *              endpoints to pointers. Works same but instead of
 *              HTTP Request causing slow newtwork traffic, Will be
 *              as a Channel to the websocket listener (Socket.io) and
 *              process all data and business logic.
 */

class Eventfy {

	
	/**
	 * Constructor
	 * 
	 * @param { Integer } Port default port is 8080
	 */
	constructor(Port = 8080) {
		this.server = require('http').createServer();
		this.io = require('socket.io')(this.server);
		this.server.listen(Port);
	}

	/**
	 * Point should put a endpoint which will serve a event loop
	 * waiting for all events to that endpoint.
	 * Usually will stay all events for one point
	 * @param {String} name Is the Point Name of your 'endpoint'
	 * @param {Function} callback a callback to handle all data which you
	 *                            need.
	 */
	pointer(name, callback) {

		const namespace = this.io.of(name);
		
		namespace.on('connection', socket => {

			callback(socket);
		});

	}


}

module.exports = Eventfy;