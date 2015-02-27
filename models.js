var mongoose = require('mongoose');


var ProjectSchema = new mongoose.Schema({
	"firstname": String,
	"lastname": String,
	"password": String,
	"email": String,
	"icon": String, 
	"major": String,
	"year": Number,
	"firstVisit": Boolean,
	"friend_array": Array,
	"circle_array": Array,
	"events": Array
});

exports.Project = mongoose.model('Project', ProjectSchema);
