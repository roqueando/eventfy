const Eventfy = require('../eventfy');
const event = new Eventfy(8000);
const should = require('chai').should();

describe('Class Eventfy test', () => {

	
	describe('#point()', () => {

		it('should be okay', () => {

			event.point('test', () => {

				console.log('DANASE');

			});

		});

	})

});

