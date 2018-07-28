const sse = require('sse-nodejs');

module.exports = (router) => {

	router.get('/', (req, res) => {

		const app = sse(res);

		app.sendEvent('decanta', () => {

			/////////////////////
			// run the code... //
			/////////////////////

		});
		
	});

}

