var models = require('../models');
var mongoose = require('mongoose');

exports.add = function(req, res){
	var form_data = req.body;
	var addFriendMessage;
	var Model = mongoose.model('Project', models.ProjectSchema);
	models.Project
		.find({"email": form_data.addFriend})
		.exec(findFriend);

	function findFriend(err, result){
		if(err){
			addFriendMessage = "There was a problem with the search";
			console.log("**************** IF 1");
		}
		else if(typeof(result[0]) == 'undefined'){
			addFriendMessage = "There was a problem with the email you entered. Please try again";
			console.log("**************** IF 2");
		}
		else{
			models.Project
    			.find({"email": req.session.loginInfo})
    			.exec(putEventOnDB);

			function putEventOnDB(err, emailMatch){
				if(err){
					addFriendMessage = "There was a problem inserting your friend. Please try again";
					console.log("**************** IF 3");
				}
				else{ 
				    Model.findOne({email: emailMatch[0].email}, function(err, doc){
			          doc.friend_array.addToSet(result[0].email);
			          doc.save(function(err){
			          	 if(err){
			          	 	console.log(err);
			          	 }
			          	 else{
			          	 	addFriendMessage = "" + result[0].email + " successfully added!";
			          	 	res.redirect('gruupers');	
			          	}
			          });
			          
				    });
				}    
			}
		}
		//res.render('gruupers');
		
	}	
}