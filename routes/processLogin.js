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
					Model.findOne({email: emailMatch[0].email}, function(err, doc){
			          //doc.firstVisit = false;
			          doc.save();
      				});
					res.render('tutorialOne');
				}
				else{
					newArr = emailMatch[0].events;
					/*for(var i = 0; i < emailMatch[0].events.length; i++){
						var dataMoment = moment(emailMatch[0].events[i].start);
						var difference = dataMoment.diff(moment(new Date()));
						if(difference == 0){
							newArr.push(emailMatch[0].events[i]);
						}
					}*/
					res.render('homepage', {"listEvents": newArr});
				}	
			}				
			else{
				res.render('login', {errMsg: "Wrong information or signup"});
			}	
		}	
	}
}

