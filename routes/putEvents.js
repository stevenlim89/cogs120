var models = require('../models');
var mongoose = require('mongoose');

exports.onCal = function(req, res){
	var email = req.session.loginInfo;
	models.Project
		.find({"email": email})
		.exec(gatherEvents);

	function gatherEvents(err, user){
		if(!err){
			if(typeof(user[0]) != 'undefined'){
				res.json(user[0].events);
			}
			else{
				res.json([]);
			}
		}
		else{
			res.send("Error");
		}
	}	
};

exports.getEvents = function(req, res){
	var receivedDate = req.params("getDate");
	var Model = mongoose.model('Project', models.ProjectSchema);
	Model.find({email: req.session.loginInfo}, function(err, doc){
		res.json(doc.events);
	});
};