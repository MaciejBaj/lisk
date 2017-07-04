'use strict';

var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');

var crypto = require('crypto');

var constants = require('../../../helpers/constants');
var ed = require('../../../helpers/ed');

describe('encryption of communication', function () {

	before(function (done) {
		//run the app
		require('../../../app');
		//wait for modules to be initialized
		setTimeout(done, 1000);
	});

	describe('connectionPrivateKey', function () {

		it('should have connectionPrivateKey set after app starts', function () {
			var privateKey = constants.getConst('connectionPrivateKey');
			expect(privateKey).not.to.be.empty;
		});

		it('connectionPrivateKey should be a Buffer type', function () {
			var privateKey = constants.getConst('connectionPrivateKey');
			expect(Buffer.isBuffer(privateKey)).to.be.ok;
		});
	});

	describe.skip('nonce', function () {

		it('should have nonce set after app starts', function () {
			var nonce = constants.getConst('headers').nonce;
			expect(nonce).not.to.be.empty;
		});

		it('nonce should be a string type', function () {
			var nonce = constants.getConst('headers').nonce;
			expect(nonce).to.be.a('string');
		});
	});

	describe('ed', function () {

		describe('makeKeypair', function () {

			var keys;

			before(function () {
				var randomString = 'ABCDE';
				var hash = crypto.createHash('sha256').update(randomString, 'utf8').digest();
				keys = ed.makeKeypair(hash);
			});
			
			it('should create keypair from a random string', function () {
				expect(keys).to.have.a.property('privateKey');
				expect(keys).to.have.a.property('publicKey');
			});

			it('publicKey should have be a Buffer type', function () {
				expect(Buffer.isBuffer(keys.publicKey)).to.be.ok;
			});

			it('privateKey should have be a Buffer type', function () {
				expect(Buffer.isBuffer(keys.privateKey)).to.be.ok;
			});

		});
	});

	describe('acceptPeer', function () {


	});



});

