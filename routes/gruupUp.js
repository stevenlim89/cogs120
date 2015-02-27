var models = require('../models');
var mongoose = require('mongoose');
exports.calculate = function (req, res) {
	var form_data = req.body;

	var timeArray = [];
	var array = Object.keys(form_data).map(function(key){
		return form_data[key];
	});
	var temp = array[0];
	array.splice(0, 1);

	models.Project
		.find({"email": req.session.loginInfo})
		.exec(function(err, result){
			models.Project
				.find({"$or": [{"email": {"$in": array}}] })
				.exec(function(err, foundFriend){
					if(err){
						addFriendMessage = "There was a problem accessing your friends list.";
						console.log("**************** IF 1");
					}
					else if(foundFriend[0] != null)
					{
						foundFriend.push(temp);
						// foundFriend is array of friends that user selected
						res.send(foundFriend);		
					}	
				});
		});
}

exports.view = function(req, res){

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
							if(typeof(string) == 'undefined'){
								string="";
							}
							
							if(result[0].firstVisit == true){
								res.render('tutorialFour', {"listOfFriends": foundFriend});
							}
							else{
								res.render('gruupUp', {"listOfFriends": foundFriend});
							}	
						}	
					});
			
		}
	}
}