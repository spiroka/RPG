var db 		    = require('../db');
var config      = require('../../config');
var verifytoken = require('./verification').verifytoken;

var secret = config.secret;
var adminsecret = config.adminsecret;

module.exports = function (app, express) {

	var creatureRouter = express.Router();
	
	creatureRouter.use(verifytoken(secret, adminsecret));
	
	creatureRouter.route('/')
	
		.get(function (req, res) {
			db.creature.find({}, function (err, docs) {
				if(err) res.send(err);
				
				res.json(docs);
			});
		})
		
		.post(function (req, res) {
			if(req.body.name) {
				var creature     = {};
				creature.name    = req.body.name;
				creature.damage  = req.body.damage || 1;
				creature.maxhp   = req.body.maxhp || 5;
				creature.hp      = req.body.hp || creature.maxhp;									
				db.creature.insert(creature, function (err, doc) {
					if(err) res.send(err);
					
					res.json({ message: 'Success!' });
				});
			} else {
				return res.json({ message: 'Name required!' });
			}
		});
		
	creatureRouter.get('/random', function (req, res) {
		db.creature.find({}, function (err, docs) {
			if(err) res.send(err);
			
			res.json(docs[Math.floor(Math.random() * docs.length)]);
		});
	});
		
	creatureRouter.route('/:creature_id')
	
		.get(function (req, res) {
			db.creature.findOne({ _id: req.params.creature_id }, function (err, doc) {
				res.json(doc);
			});
		})
		
		.put(function (req, res) {
			var creature = {};
			if (req.body.maxhp) creature.maxhp = req.body.maxhp;
			if (req.body.hp) creature.hp 	   = req.body.hp;
			
			db.creature.update({ _id: req.params.creature_id }, { $set: creature }, {}, function (err, numReplaced) {
				db.creature.findOne({ _id: req.params.creature_id }, function (err, doc) {
					res.json(doc);
				});
			});
		})
		
		.delete(function (req, res) {
		    db.creature.remove({ _id: req.params.creature_id }, function (err, numRemoved) {
				if(err) res.send(err);

				res.status(204).end();
		    });
		});
	
	return creatureRouter;
	
};