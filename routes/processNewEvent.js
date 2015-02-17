//var models = require("../database_modules/events.json");
var models = require('../models');
exports.processEvent = function (req, res) {
  // req.body is the data JSON passed from POST
  var processEventObject = req.body;
  var newEvent = new Object();

  newEvent.title = processEventObject.location;
  newEvent.allDay = false;
  newEvent.start = processEventObject.date;
  newEvent.end = processEventObject.date;
  newEvent.editable = false;
  

  
  models.Project
    .find({"email": req.session.loginInfo})
    .exec(putEventOnDB);

  function putEventOnDB(err, emailMatch){
    console.log("********This is the newEvent        " + newEvent);
      emailMatch[0].update({_id: emailMatch[0]._id}, {$push: {events: newEvent}});
      //emailMatch[0].events.push(newEvent);
      console.log("********This is the events array:         " + emailMatch[0]);
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