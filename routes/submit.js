// Page to sign up for an account


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
    "email": form_data.ucsdemail,
    "firstVisit": true
  });

  models.Project
    .find({"email": newPost.email})
    .exec(unique);

    function unique(err, isUnique){
       if(typeof(isUnique[0]) == 'undefined'){
        newPost.save(saving);
          console.log("**************Case 1");
       }
          
       else{
        res.render('signup', {errMsg: "Email exists already. Please enter another one."});   
       }
             
    }
  

  function saving(err, newuser){
    if(err){
    	console.log(err);
      
    	res.render('signup');
    }
    else if(form_data.password != form_data.confirm_password){
      res.render('signup', {errMsg: "Password and Confirm Password do not match"}); 
    }
    else{
      
    	res.render('login');
    } 
    
  }
}
