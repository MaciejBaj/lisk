'use strict';

var sodium = require('sodium').api;
var crypto = require('crypto');

/**
 * Crypto functions that implements sodium.
 * @memberof module:helpers
 * @requires sodium
 * @namespace
 */
var ed = {};

/**
 * Creates a keypar based on a hash.
 * @implements {sodium}
 * @param {hash} hash
 * @return {Object} publicKey, privateKey
 */
ed.makeKeypair = function (hash) {
	var keypair = sodium.crypto_sign_seed_keypair(hash);

	return {
		publicKey: keypair.publicKey,
		privateKey: keypair.secretKey
	};
};

/**
 * Creates a signature based on a hash and a keypair.
 * @implements {sodium}
 * @param {Buffer[]} message
 * @param {Buffer[]} privateKey
 * @return {signature} signature
 */
ed.sign = function (message, privateKey) {
	console.log('ed sign: ' , message.length, privateKey.length);
	return sodium.crypto_sign_detached(message, privateKey);
};

/**
 * Verifies a signature based on a hash and a publicKey.
 * @implements {sodium}
 * @param {Buffer[]} messageBuffer
 * @param {string} signature
 * @param {string} publicKey
 * @return {Boolean} true id verified
 */
ed.verify = function (messageBuffer, signature, publicKey) {
	// var publicKeyBuffer = Buffer.isBuffer(publicKey) ? publicKey || Buffer.from(publicKey, 'hex') || ' ';
	var publicKeyBuffer = Buffer.from(publicKey, 'hex') || ' ';
	var signatureBuffer = Buffer.from(signature, 'hex') || ' ';
	console.log('ed verify: publickKey / signature lengths buffer' , publicKeyBuffer.length, signatureBuffer.length);
	return sodium.crypto_sign_verify_detached(signatureBuffer, messageBuffer, publicKeyBuffer);
};


module.exports = ed;
