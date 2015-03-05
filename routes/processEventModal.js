var models = require('../models');
var mongoose = require('mongoose');
var moment = require('../moment');

exports.processAction = function(req, res){
	var form_data = req.body;
	var Model = mongoose.model('Project', models.ProjectSchema);
	var errMsg;
	var eventArr= [];
	var startEvent = moment(form_data.startTime).format("hh:mm:ss" + "-" + "A");
	var endEvent = moment(form_data.endTime).format("hh:mm:ss" + "-" + "A");
	var date = moment(form_data.startTime).format("MM/D/YYYY");

	Model.findOne({email: req.session.loginInfo}, function(err, doc){	
		eventArr = doc.events;
		for(var i = 0; i < doc.events.length; i++){
			var eventTime = moment(eventArr[i].start);
			var formTime = moment(form_data.startTime);
			var difference = eventTime.diff(formTime);
			if((eventArr[i].title == form_data.title) && (difference == 0)){
				doc.events.splice(i, 1);
				doc.save(function(err){
		          	if(err){
		          		console.log(err);
		          	}
		          	else{
		          	 	errMsg = "event deleted";
		          	 	if(form_data.action == "Delete"){
		          	 		res.render('calendar', {"calendarMessage": errMsg});
		          	 	}
		          	 	else{	
		          	 		res.render('create_event', {"modalTitle": form_data.title, "modalDate": date, 
			  					"modalStartTime": startEvent, "modalEndTime": endEvent});
		          	 	}	
		          	}
		        });
			}
			else{
				errMsg = "Event does not exist";
			}
		}
	});
}