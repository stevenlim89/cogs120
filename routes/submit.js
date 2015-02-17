var models = require('../models');

exports.signup = function(req, res){
	var form_data = req.body;
  	console.log(form_data);

  	// make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
  var newPost = new models.Project({
    "firstname": form_data.firstname,
    "lastname": form_data.lastname,
    "password": form_data.password,
    "email": form_data.ucsdemail
  });

  newPost.save(saving);

  function saving(err){
    if(err){
    	console.log(err);
    	res.render('signup');
    }
    else{
    	res.render('login');
    } 
    
  }
}
