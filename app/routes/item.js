var db 		    = require('../db');
var config      = require('../../config');
var verifytoken = require('./verification').verifytoken;

var secret = config.secret;
var adminsecret = config.adminsecret;

module.exports = function (app, express) {

	var itemRouter = express.Router();
	
	itemRouter.use(verifytoken(secret, adminsecret));
	
	itemRouter.route('/')
	
		.get(function (req, res) {
			db.item.find({}, function (err, items) {
				if(err) res.send(err);
				
				res.json(items);
			});
		})
		
		.post(function (req, res) {
			if(req.body.name && req.body.type) {
				var item    = {};
				item.name   = req.body.name;
				item.type   = req.body.type;
				if(req.body.owner) item.owner = req.body.owner;
				if(item.type == 'weapon') {					
					item.damage = req.body.damage || 0;
					db.item.insert(item, function (err, doc) {
						if(err) res.send(err);
						
						res.json({ message: 'Success!' });
					});
				} else if(item.type == 'potion') {					
					item.healing = req.body.healing || 0;					
					db.item.insert(item, function (err, doc) {
						if(err) res.send(err);
						
						res.json({ message: 'Success!' });
					});
				}
			} else {
				return res.json({ message: 'Name and type are required!' });
			}
		});
		
	itemRouter.route('/:item_id')
	
		.get(function (req, res) {
			db.item.findOne({ _id: req.params.item_id }, function (err, doc) {
				res.json(doc);
			});
		})
		
		.put(function (req, res) {
			var item = {};
			if (req.body.owner) item.owner = req.body.owner;
			
			db.item.update({ _id: req.params.item_id }, { $set: item }, {}, function (err, numReplaced) {
				db.item.findOne({ _id: req.params.item_id }, function (err, doc) {
					res.json(doc);
				});
			});
		})
		
		.delete(function (req, res) {
		    db.item.remove({ _id: req.params.item_id }, function (err, numRemoved) {
				if(err) res.send(err);

				res.status(204).end();
		    });
		});
	
	return itemRouter;
	
};