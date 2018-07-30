class Eventfy {

	
	/**
	 * Constructor
	 * @param {Integer} Port default 8080 
	 */
	constructor(Port = 8080) {
		
		this.server = require('http').createServer();
		
		this.io = require('socket.io')(this.server);
		this.server.listen(Port);
	}

	/**
	 * Public will serve the static folder
	 * @param {String} filePath 
	 */
	public(filePath) {

		this.Router.use('static', { path: filePath });

	}

	/**
	 * point() should put a endpoint which will serve a event loop
	 * waiting for all events to that endpoint.
	 * Usually will stay all events for one point
	 * @param {String} name Is the Point Name
	 * @param {Function} callback a callback to handle all data
	 */
	pointer(name, callback) {
		const namespace = this.io.of(name);
		callback(namespace);
	}


}

module.exports = Eventfy;