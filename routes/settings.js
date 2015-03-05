var models = require('../models');
var mongoose = require('mongoose');

exports.setting = function(req, res){
  res.render('settings');
};

exports.updateNames = function(req, res){
 var formData = req.body;
 var Model = mongoose.model('Project', models.ProjectSchema);
 var userEmail = req.session.loginInfo;
 var userFirstName = formData.updateFirstName;
 var userLastName = formData.updateLastName;
 var callbackMsg;

 if( userFirstName.length != 0 && userLastName.length != 0 ) {
  updateObj = { "firstname": userFirstName,
         "lastname" : userLastName };
 } else if( userFirstName.length != 0 ) {
  updateObj = { "firstname" : userFirstName };
 } else {
  updateObj = { "lastname" : userLastName };
 }
 
 models.Project
  .update({"email": userEmail}, updateObj , updateUserNames );


 function updateUserNames(err) {
  if( err ) {
   callbackMsg = "Error with our database. Please try again";
  } else {
   callbackMsg = "Update Successful!";   
  }
  res.send(callbackMsg);
 }

};

exports.updatePass = function(req, res){
 var formData = req.body;
 var Model = mongoose.model('Project', models.ProjectSchema);
 var userEmail = req.session.loginInfo;
 var userCurrPass = formData.updateCurrPassword;
 var userNewPass = formData.updateNewPassword1;
 
 var callbackMsg;
 
 models.Project
  .find({"email": userInput.email})
  .exec(correctPassword);


 function correctPassword(err, userObj) {
  if(err || (typeof(userObj) == 'undefined') ) {
   callbackMsg = "Error with our database. Please try again";
  } else {
   if( userObj[0].password == userCurrPass ) {
    models.Project
     .update({"email" : userEmail}, {"password" : userNewPass}, updatePassword );
   } else {
    callbackMsg = "The password you entered is not correct.";
    res.send(callbackMsg)
   }
  }
 }

 function updatePassword(err) { 
  if(err) {
   callbackMsg = "There was an error updating your password. No changes were made.";
  } else {
   callbackMsg = "Your password has been updated!";
  }

  res.send(callbackMsg); 
 }

};