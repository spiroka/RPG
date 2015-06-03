var jwt        = require('jsonwebtoken');
var config     = require('../../config');

var secret = config.secret;

module.exports.verifytoken = function (req, res, next) {

	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
	
	if (token) {
		jwt.verify(token, secret, function (err, decoded) {      		
			if (err) {
			    res.status(403).send({ 
			    	success: false, 
			    	message: 'Failed to authenticate token.' 
				});  	   
			} else { 
			    req.decoded = decoded;
			        
			    next();
			}
		});		
	} else {
		res.status(403).send({ 
			success: false, 
			message: 'No token provided.' 
		});
	}
		
};