/// <reference path="typings/node/node.d.ts"/>
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var config 	   = require('./config');
var path 	   = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

app.use(express.static(__dirname + '/client'));

var playerRoutes = require('./app/routes/player')(app, express);
app.use('/player', playerRoutes);

var itemRoutes = require('./app/routes/item')(app, express);
app.use('/item', itemRoutes);

var creatureRoutes = require('./app/routes/creature')(app, express);
app.use('/creature', creatureRoutes);

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/client/app/views/index.html'));
});

app.listen(config.port);
console.log('Listening on port ' + config.port);