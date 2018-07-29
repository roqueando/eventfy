class Eventfy {
	/**
	 * Constructor
	 * @param {Integer} Port default 8080 
	 */
	constructor(Port = 8080) {
		
		this.Events = require('events');
		this.Emitter = new this.Events.EventEmitter();
		this.SSE = require('sse-nodejs');

		this.Router = require('tiny-router');
		this.Router.listen(Port);

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
	 * @param {String} name point name
	 * @param {Function} callback a callback
	 */
	point(name, callback) {

		this.Router.get(name, (req, res) => {

			const app = this.SSE(res);
			callback(app);

		});
	}

}

module.exports = Eventfy;