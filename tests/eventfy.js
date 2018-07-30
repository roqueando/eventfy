const Eventfy = require('../eventfy');
const event = new Eventfy(8000);
const should = require('chai').should();

describe('Class Eventfy test', () => {

	describe('constructor', () => {

		it('Should be okay when start without url', () => {

			event.public(__dirname + '/assets');

		});

	});


});

