/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {
	attributes: {
		username: {
			type: 'string',
			unique: true
		},
		displayName: {
			type: 'string',
		},
		email: {
			type: 'email',
			unique: true,
		},
		photo: {
			type: 'url',
		},
		passports: {
			collection: 'Passport',
			via: 'user',
		},
	},
};

