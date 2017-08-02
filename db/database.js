
'use strict';

const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/nogserver'
const PORT = process.env.PORT || 3000

// const MONGODB_URL = 'mongodb://<dbuser>:<dbpassword>@ds013216.mlab.com:13216/nogserver'

mongoose.Promise = Promise

module.exports.connect = () => mongoose.connect(MONGODB_URL)
module.exports.disconnect = () => mongoose.disconnect()

module.exports.users = () => mongoose.model('user', {
	name: String,
})
