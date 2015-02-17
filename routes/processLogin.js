var models = require('../models');

exports.authenticate = function(req, res){
	userInput = req.body;
	console.log(userInput);
	req.session.loginInfo = userInput.email;
	models.Project
		.find({"email": userInput.email})
		.exec(testMatchingEmail);

	function testMatchingEmail(err, emailMatch){
		console.log("EMAILMATCH in processLOGIN:      " + emailMatch[0]);
		if(err){
			res.render('login');
		}
		if((emailMatch[0].email == (""+userInput.email)) && (emailMatch[0].password == (""+userInput.password))){
			res.render('index');
		}
		else{
			res.render('login');
		}
	}
}

