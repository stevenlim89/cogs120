var models = require('../models');
var mongoose = require('mongoose');
exports.processEvent = function (req, res) {

  var processEventObject = req.body;
  var newEvent = new Object();
  var Model = mongoose.model('Project', models.ProjectSchema);

  var date = processEventObject.date;
  var startTime = processEventObject.timepickerStart;
  var endTime = processEventObject.timepickerEnd;

  var startString = "" + date + " " + startTime;
  var endString = "" + date + " " + endTime;

  console.log("@@@@@@@@@@startString:     " + startString);
  newEvent.title = processEventObject.title;
  newEvent.allDay = false;
  newEvent.start = startString;
  newEvent.end = endString;
  newEvent.editable = false;
  
  models.Project
    .find({"email": req.session.loginInfo})
    .exec(putEventOnDB);

  function putEventOnDB(err, emailMatch){
    
     Model.findOne({email: emailMatch[0].email}, function(err, doc){
          doc.events.push(newEvent);
          doc.save();
      });
     console.log("********This is the events array2:         " + emailMatch[0]);
  }
  if(emailMatch[0].firstVisited == true){
    res.render("tutorialThree");
  }
  else{
    res.render("calendar");
  }
}