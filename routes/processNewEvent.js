//var models = require("../database_modules/events.json");
var models = require('../models');
var mongoose = require('mongoose');
exports.processEvent = function (req, res) {
  // req.body is the data JSON passed from POST
  var processEventObject = req.body;
  var newEvent = new Object();
  var Model = mongoose.model('Project', models.ProjectSchema);
  newEvent.title = processEventObject.location;
  newEvent.allDay = false;
  newEvent.start = processEventObject.date;
  newEvent.end = processEventObject.date;
  newEvent.editable = false;
  
  models.Project
    .find({"email": req.session.loginInfo})
    .exec(putEventOnDB);

  function putEventOnDB(err, emailMatch){
    
     Model.findOne({email: emailMatch[0].email}, function(err, doc){
          doc.events.push(newEvent);
          console.log("********This is the events array2:         " + emailMatch[0]);
          doc.save();
      });
  }


  /*var processEventLoc = processEventObject.location;
  var processEventDes = processEventObject.description;
  var processEventDate = processEventObject.date;
  var processEventTime = processEventObject.time;*/

  // Do update here
  // database directory should be "../database_modules"
  // "newpost" should be of the model of our DB
  // newpost.save(afterSaving);

//	function afterSaving(err) { // this is a callback
//	  if(err) {console.log(err); res.send(500); }
			// Save was successful, should redirect to success page, not index
	  	res.render("index");
//	}
}