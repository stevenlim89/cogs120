var models = require('../models');
var mongoose = require('mongoose');
exports.tutorialfour = function(req, res){
	var Model = mongoose.model('Project', models.ProjectSchema);
	models.Project
		.find({"email": req.session.loginInfo})
		.exec(getFriendList)
	
	function getFriendList(err, result){
		if(err){
			message = "There was a problem with our system. Please try again later";
			console.log("**************** IF 1");
		}
		else if(typeof(result[0]) == 'undefined'){
			message = "You currently do not have any friends. Add some by entering their email above.";
			console.log("**************** IF 2");
		}
		else{
			friendsArr = result[0].friend_array;
				models.Project
					.find({"$or": [{"email": {"$in": friendsArr}}] })
					.exec(function(err, foundFriend){
						if(err){
							addFriendMessage = "There was a problem accessing your friends list.";
							console.log("**************** IF 1");
						}
						else{

							console.log("************FOUNDFRIEND   " + foundFriend);
							
							if(typeof(string) == 'undefined'){
								string="";
							}
							Model.findOne({email: result[0].email}, function(err, doc){
								doc.firstVisit = false;	
					          	doc.save();
      						});
							res.render('tutorialFour', {"listOfFriends": foundFriend});
						}	
					});
		}
	}
}