var models = require('../models');

exports.gruup = function(req, res){
	var message;
	var friendsArr;
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
		}
	}	
	res.render('gruupers', {"friends": friendsArr});
};