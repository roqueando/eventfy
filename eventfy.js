/**
	Copyright (c) 2018 Vítor Roque

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
   
 * 
 * Evenfty class module
 *
 * @author Vítor Roque <vitor.rpereira@hotmail.com>
 * 
 * @copyright Roqueando <github.com/roqueando>
 *
 * @license https://github.com/roqueando/eventfy/blob/master/LICENSE MIT License
 * 
 * @description That module is for all real-time event-based APIs
 *              which want a fast time in your responses.
 *              Changing a bit of RESTful default, I changed all
 *              endpoints to pointers. Instead of
 *              HTTP Request causing slow newtwork traffic, Will be
 *              as a Channel to the websocket listener (Socket.io) and
 *              process all data and business logic.
 */

class Eventfy {

	
	/**
	 * Constructor
	 * 
	 * @param { Integer } Port default port is 8080
	 * 
	 * @param {Object} opts Settings options for the server
	 * 
	 * @param {Boolean} opts.useExpress Defaults false or undefined
	 * 
	 * @param {Function} opts.app Receives the express application
	 * 
	 * @param {Module} this.ObjectEncrypter the methods to that module
	 *                                      is optional to use, if you
	 *                                      want more security on your
	 *                                      API.
	 *
	 * @description That will check if you want to use express, follow
	 *              to setting up the server and prepare to use the
	 *              Event-Based Eventfy's default API
	 */
	constructor(port = 8080, opts = {}) {
		
		/**
		 * Object Encrypter Module
		 * @type {Module}
		 */
		this.ObjectEncrypter = require('object-encrypter');

		// Set the secret key of encrypter
		this.Encrypter = this.ObjectEncrypter('52733596ED6E8DA7EC4F3DA61A983182A77FB5674F9F1DC37757F702D88D9F02');

		if(!(opts.useExpress == undefined) && opts.useExpress == true) {

			this.app = opts.app;
			this.server = require('http').Server(this.app);
			this.io = require('socket.io')(this.server);
			this.app.listen(port);

			console.log(`🚀 Server online on express app on port ${port} `);

		}else {

			this.server = require('http').Server();
			this.server.listen(port);

			this.io = require('socket.io')(this.server);
			console.log(`🚀 Server online on port ${port} `);

		}

	

	}

	/**
	 * Pointer should put a endpoint which will serve a event loop
	 * waiting for all events to that endpoint.
	 * Usually will stay all events for one pointer
	 * 
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

	/**
	 * Secure Emit create a socket emit encrypting all data
	 * 
	 * @param  {Socket} socket    the socket object of the pointer
	 *                            or something else
	 *                            
	 * @param  {String} eventName the name of the event
	 * @param  {Object} data      All data that you want to emit
	 */
	secureEmit(socket, eventName, data) {

		data = this.Encrypter.encrypt(data);
		socket.emit(eventName, data);

	}

	/**
	 * Secure Response creates a response (socket.on()) decrypting all data
	 * received by secureEmit()
	 * 
	 * @param  {Socket}   socket    the socket object of the pointer
	 *                              or something else
	 *                              
	 * @param  {String}   eventName the name of the event
	 * @param  {Function} callback  Data handler
	 */
	secureResponse(socket, eventName, callback) {

		socket.on(eventName, data => {

			callback(this.Encrypter.decrypt(data));

		});

	}

	/**
	 * A middleware for general event points
	 * @param  {Function} callback 
	 * @return {Function} callback
	 */
	middle(encrypt = true, callback) {


		this.io.use((socket, next) => {

			callback(socket, next);

		});

		

	}

	/**
	 * A middleware for specific pointer
	 * @param  {String}   pointer  the name of pointer which you want
	 * @param  {Function} callback Data handler
	 * @return {Function}
	 */
	middlePoint(pointer, callback) {

		this.io.of(pointer).use((socket, next) => {

			callback(socket, next);

		});

	}

	/**
	 * Error handler for event socket stream
	 * @param  {String} errorName A name for the error
	 * @param  {Object} errorData All data that will stay on error,
	 *                            like type of error, timestamp, origin,
	 *                            and others.
	 *                            
	 * @return {Object} err       Returns the Error Object
	 *
	 * @description In websockets does not exists a handler error, but with
	 *              socket.io a special packet called 'error' handles all type
	 *              of errors that we can emit by events.
	 */
	error(errorName, errorData = {}) {
		let err = new Error(errorName);
		err.data = errorData;

		return err;
	}

}

module.exports = Eventfy;