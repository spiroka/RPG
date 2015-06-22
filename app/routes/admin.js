var db 		    = require('../db');
var jwt         = require('jsonwebtoken');
var config      = require('../../config');
var bcrypt 	    = require('bcrypt-nodejs');
var verifytoken = require('./verification').verifytoken;

var adminsecret = config.adminsecret;

module.exports = function (app, express) {

	var adminRouter = express.Router();

	adminRouter.post('/authenticate', function (req, res) {

		db.admin.findOne({ name: req.body.name }, function (err, admin) {
		
			if (err) throw err;
			
			if (!admin) {			
			  	res.json({ 
			  		success: false, 
			  		message: 'Authentication failed. User not found.' 
				});
			} else if (admin) {
				var validPassword = bcrypt.compareSync(req.body.password, admin.password);
				if (!validPassword) {
					res.json({ 
						success: false, 
						message: 'Authentication failed. Wrong password.' 
					});
				} else {			
					var token = jwt.sign({
						name:  admin.name,
						_id:   admin._id
					}, adminsecret, {
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
	
	adminRouter.use(verifytoken(adminsecret));
	
	return adminRouter;
	
};