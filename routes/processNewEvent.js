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
     if(emailMatch[0].firstVisit == true){    
        res.render("calendar_tutorial");
     }
    else{           
      res.render("calendar");
    }
  }
}