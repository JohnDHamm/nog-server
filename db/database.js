'use strict';

const mongoose = require('mongoose');

// const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/nogserver'
const PORT = process.env.PORT || 3000

const { getMLabCreds } = require('../creds/creds');
// const dbuser = getMLabCreds().dbname;
// console.log("dbuser", dbuser);

const MONGODB_URL = `mongodb://${getMLabCreds().dbname}:${getMLabCreds().dbpassword}@ds013216.mlab.com:13216/nogserver`

mongoose.Promise = Promise

module.exports.connect = () => mongoose.connect(MONGODB_URL)
module.exports.disconnect = () => mongoose.disconnect()

module.exports.users = () => mongoose.model('user', {
	userName: String,
	email: String
})
