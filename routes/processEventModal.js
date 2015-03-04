var models = require('../models');
var mongoose = require('mongoose');
var moment = require('../moment');

exports.processAction = function(req, res){
	var form_data = req.body;
	var Model = mongoose.model('Project', models.ProjectSchema);
	var errMsg;
	var eventArr= [];

	if(form_data.action == "Delete"){
		Model.findOne({email: req.session.loginInfo}, function(err, doc){	
			eventArr = doc.events;
			for(var i = 0; i < doc.events.length; i++){
				var eventTime = moment(eventArr[i].start);
				var formTime = moment(form_data.startTime);
				var difference = eventTime.diff(formTime);
				console.log("@@@@@@@@@@@@form_data.name:     ");
		console.log(difference);
				if((eventArr[i].title == form_data.title) && (difference == 0)){
					doc.events.splice(i, 1);
					doc.save(function(err){
			          	 if(err){
			          	 	console.log(err);
			          	 }
			          	 else{
			          	 	errMsg = "event deleted";
			          	 	res.render('calendar', {"calendarMessage": errMsg});
			          	 }
			        });
			        break;
				}
				else{
					errMsg = "Event does not exist";
				}
			}
		});
	}
	else{
		res.render('homepage');
	}	
}