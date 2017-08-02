'use strict';

const express = require('express');
const { json } = require('body-parser');

//*******  testing on localhost:3000 *****************************************
// const { getWeatherAPIKey, getAmazonKeys } = require('./creds/creds');


const app = express();

const { connect, users } = require('./db/database');

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

//middlewares
app.use(express.static('client'));
app.use(json());

// API

const Users = users();

// app.get('/api/wakeup', (req, res, err) => {
// 	const msg = 'Server is waking up...'
// 	res.send(msg);
// })

app.get('/api/users', (req, res, err) => {
	Users.find()
		.then(users => {
			res.json( users );
		})
		.catch(err)
})

connect()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Mongoose server listening on port: ${PORT}`);
		});
	})
	.catch(console.error)
