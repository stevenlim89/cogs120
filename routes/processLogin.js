var models = require('../models');
var mongoose = require('mongoose');
exports.authenticate = function(req, res){
	userInput = req.body;
	console.log(userInput);

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
				//console.log("***********userinfo:    "+ emailMatch[0]);
				if(emailMatch[0].firstVisit == true){
					Model.findOne({email: emailMatch[0].email}, function(err, doc){
			          //doc.firstVisit = false;
			          doc.save();
      				});
					res.render('tutorialOne');
				}
				else{
					res.render('homepage');
				}	
			}				
			else
				res.render('login');
		}	
	}
}

