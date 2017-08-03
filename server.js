'use strict';

const express = require('express');
const { json } = require('body-parser');


const app = express();

const { connect, users, nogTypes, userPatterns } = require('./db/database');

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

//middlewares
app.use(express.static('client'));
app.use(json());

// API
const Users = users();
const NogTypes = nogTypes();
const UserPatterns = userPatterns();

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

app.get('/api/user/:id', (req, res, err) => {
	const userId = req.params.id;
	Users.find( { _id: userId } )
		.then(user => {
			res.json( user );
		})
		.catch(err)
})

app.get('/api/nogtypes', (req, res, err) => {
	NogTypes.find()
		.then(nogTypes => {
			res.json( nogTypes );
		})
		.catch(err)
})

app.get('/api/userpatterns/:userId', (req, res, err) => {
	UserPatterns.find( { userId: req.params.userId } )
		.then(patterns => {
			res.json( patterns );
		})
		.catch(err)
})

app.get('/api/m/userpatterns/:query', (req, res, err) => {
	const query = req.params.query.split(",");
	UserPatterns.find( { userId: query[0], nogTypeId: query[1] } )
		.then(patterns => {
			res.json( patterns );
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
