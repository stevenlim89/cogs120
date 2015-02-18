var models = require('../models');

exports.onCal = function(req, res){
	var email = req.session.loginInfo;
	models.Project
		.find({"email": email})
		.exec(gatherEvents);

	function gatherEvents(err, user){
		if(!err){
			console.log("What was sent:      " + user[0].events);
			res.json(user[0].events);
		}
		else{
			res.send("Error");
		}
	}	
};