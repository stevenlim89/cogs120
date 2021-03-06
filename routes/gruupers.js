var models = require('../models');
var mongoose = require('mongoose');

exports.gruup = function(req, res){
	var message;
	friendsArr = [];
	array = [];
	
	models.Project
		.find({"email": req.session.loginInfo})
		.exec(getFriendList);

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
						}
						else{
							if(friendsArr.length <= 0){
								addFriendMessage = "No friend found. Go add some friends";
							}
							else{
								addFriendMessage = "";
							}
								
							if(result[0].firstVisit == true){
								res.render('tutorialThree', {"friends": foundFriend, "addFriendMessage": addFriendMessage});
							}
							else{
								console.log("@@@@@@");
								console.log(foundFriend.length);	
								res.render('gruupers', {"friends": foundFriend, "addFriendMessage": addFriendMessage});	
							}						
						}	
					});
		}
	}
	
};

