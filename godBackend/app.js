const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const login = require('./routes/login');
const users = require('./routes/user');
const drones = require('./routes/drone');
const attack = require('./routes/attack');
const game = require('./routes/game');
const gear = require('./routes/gear');
const tile = require('./routes/tile');

const app = express();

const db = require('./db');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', login);
app.use('/users', users);
app.use('/drones', drones);
app.use('/gears', gear);
app.use('/attack', attack);
app.use('/game', game);
app.use('/tile', tile);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send(err);
});

module.exports = app;
