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

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
})

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
		.sort('name')
		.then(patterns => {
			res.json( patterns );
		})
		.catch(err)
})

app.patch('/api/userpattern', (req, res, err) => {
	UserPatterns.findOneAndUpdate({_id: req.body._id}, req.body, { upsert: true, new: true})
		.then(data => res.json(data))
		.catch(err)
})

app.post('/api/createpattern', (req, res, err) => {
	UserPatterns.create(req.body)
		.then(data => {
			res.json(data)}
			)
		.catch(err)
})

// ********** mobile API ****************
app.get('/api/m/userpatterns/:userId', (req, res, err) => {
	UserPatterns.find( { userId: req.params.userId } )
		.where({published: true})
		.sort('name')
		.select('-instances -customColors')
		.then(patterns => {
			res.json( patterns );
		})
		.catch(err)
})

app.get('/api/m/userpatterndata/:patternId', (req, res, err) => {
	UserPatterns.find( {_id: req.params.patternId } )
		.select('instances')
		.then(patternData => {
			res.json( patternData );
		})
		.catch(err)
})

// app.get('/api/m/userpatterns/:query', (req, res, err) => {
// 	const query = req.params.query.split(",");
// 	UserPatterns.find( { userId: query[0], nogTypeId: query[1] } )
// 		.then(patterns => {
// 			res.json( patterns );
// 		})
// 		.catch(err)
// })


connect()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Mongoose server listening on port: ${PORT}`);
		});
	})
	.catch(console.error)
