var models = require('../models');
var mongoose = require('mongoose');
var moment = require('../moment');
exports.authenticate = function(req, res){
	userInput = req.body;
	var newArr = [];
	req.session.loginInfo = userInput.email;
	var Model = mongoose.model('Project', models.ProjectSchema);
	models.Project
		.find({"email": userInput.email})
		.exec(testMatchingEmail);

	function testMatchingEmail(err, emailMatch){
		if((typeof(emailMatch[0]) == 'undefined') || err){
			res.render('login', {errMsg: "Wrong information or signup"});
		}
		else{
			if((emailMatch[0].email == (""+userInput.email)) && (emailMatch[0].password == (""+userInput.password))){
				if(emailMatch[0].firstVisit == true){
					res.render('tutorialOne');
				}
				else{
					newArr = emailMatch[0].events;
					res.render('homepage', {"listEvents": newArr});
				}	
			}				
			else{
				res.render('login', {errMsg: "Wrong information or signup"});
			}	
		}	
	}
}

