var models = require('../models');
var mongoose = require('mongoose');
exports.processEvent = function (req, res) {

  var processEventObject = req.body;
  var newEvent = new Object();
  var Model = mongoose.model('Project', models.ProjectSchema);

  var start_hour = processEventObject.start_hour;

  console.log("******This is the start_hour:    " + start_hour);
  newEvent.title = processEventObject.title;
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
	  	res.render("homepage");
}