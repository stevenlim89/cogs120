var models = require('../models');
var fs = require('fs');
exports.authenticate = function(req, res){
	userInput = req.body;
	console.log(userInput);

	req.session.loginInfo = userInput.email;

	var output = 'email.json';
	var data = {
		email: req.session.loginInfo
	}
	fs.writeFile(output, JSON.stringify(data, null, 4), function(err){
		if(err)console.log(err);
		else console.log("FILE SAVED");
	});
	models.Project
		.find({"email": userInput.email})
		.exec(testMatchingEmail);

	function testMatchingEmail(err, emailMatch){
		console.log("EMAILMATCH in processLOGIN:      " + emailMatch[0]);
		if(err){
			res.render('login');
		}
		if((emailMatch[0].email == (""+userInput.email)) && (emailMatch[0].password == (""+userInput.password))){
			res.render('homepage');
		}
		else{
			res.render('login');
		}
	}
}

