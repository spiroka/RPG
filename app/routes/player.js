var db 		    = require('../db');
var jwt         = require('jsonwebtoken');
var config      = require('../../config');
var bcrypt 	    = require('bcrypt-nodejs');
var verifytoken = require('./verification').verifytoken;

var secret = config.secret;

module.exports = function (app, express) {

	var playerRouter = express.Router();

	playerRouter.post('/authenticate', function (req, res) {

		db.player.findOne({ name: req.body.name }, function (err, player) {
		
			if (err) throw err;
			
			if (!player) {			
			  	res.json({ 
			  		success: false, 
			  		message: 'Authentication failed. User not found.' 
				});
			} else if (player) {
				var validPassword = bcrypt.compareSync(req.body.password, player.password);
				if (!validPassword) {
					res.json({ 
						success: false, 
						message: 'Authentication failed. Wrong password.' 
					});
				} else {			
					var token = jwt.sign({
						name:  player.name,
						hp:    player.hp,
						maxhp: player.maxhp,
						_id:   player._id
					}, secret, {
					    expiresInMinutes: 1440
					});
				
					res.json({
						success: true,
					    message: 'Enjoy your token!',
					    token: token
					});
				}   
			}
		
		});
	  
	});
	
	playerRouter.post('/', function (req, res) {
		if(req.body.name && req.body.password) {
			var player 		= {};
			player.name 	= req.body.name;
			bcrypt.hash(req.body.password, null, null, function(err, hash) {
				if (err) { 
					res.json({
						success: false,
						message: err
					});
				}

				player.password = hash;
			});
			player.maxhp 	= 10;
			player.hp 		= 10;
			
			db.player.insert(player, function (err, doc) {
    			if (err) { 
					res.json({
						success: false,
						message: err
					});
				} else {
					var item 	= {};
					item.name 	= 'Dagger';
					item.type 	= 'weapon';
					item.damage = 1;
					item.owner 	= doc._id;
					db.item.insert(item, function (err, doc) {
						if (err) { 
							res.json({
								success: false,
								message: err
							});
						}

						res.json({ 
							success: true,
							message: 'Success!'
						});
					});
				}
				
  			});
		} else {
			return res.json({
					success: false,
				   	message: 'Name and password are required!'
				   });
		}
	});
	
	playerRouter.use(verifytoken);
	
	playerRouter.get('/me', function(req, res) {
		res.json(req.decoded);
	});
	
	playerRouter.get('/', function (req, res) {
		db.player.find({}, function (err, players) {
			if(err) res.send(err);
			
			res.json(players);
		});
	});
		
	playerRouter.route('/:player_id')

		.get(function (req, res) {
			db.player.findOne({ _id: req.params.player_id }, function (err, doc) {
				res.json(doc);
			});
		})
		
		.put(function (req, res) {
			var player = {};
			if (req.body.maxhp) player.maxhp = req.body.maxhp;
			if (req.body.hp) player.hp 	 	 = req.body.hp;
			
			db.player.update({ _id: req.params.player_id }, { $set: player }, {}, function (err, numReplaced) {
				db.player.findOne({ _id: req.params.player_id }, function (err, doc) {
					res.json(doc);
				});
			});
		})
		
		.delete(function (req, res) {
		    db.player.remove({ _id: req.params.player_id }, function (err, numRemoved) {
				if(err) res.send(err);

				db.item.remove({ owner: req.params.player_id }, function (err, numRemoved) {
					res.status(204).end();
				});
		    });
		});
		
	playerRouter.get('/:player_id/items', function (req, res) {
		db.item.find({ owner: req.params.player_id }, function (err, items) {
			if(err) res.send(err);
			
			res.json(items);
		});
	});	
	
	return playerRouter;
	
};