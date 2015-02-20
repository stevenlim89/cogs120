$(document).ready(function(){
	initializeSquares();
})
	


function initializeSquares(){
	$("#createSquare").click(function(){
		window.location = 'gruupUp';
		return false;
	});

	$("#editSquare").click(function(){
		window.location = 'editSchedule';
		return false;
	});

	$("#calSquare").click(function(){
		window.location = 'calendar';
		return false;
	});

	$("#friendSquare").click(function(){
		window.location = 'gruupers';
		return false;
	});
	
}
function index_init(){

	var index_moment = moment();

	index_currMoment(index_moment);
	$("#arrowLeft").click(function(){
		index_moment.subtract("1", "days");
		index_currMoment(index_moment);
	});

	$("#arrowRight").click(function(){
		index_moment.add("1", "days");
		index_currMoment(index_moment);
	});

	$("#index_today_button").click(function(){
		index_moment = moment();
		index_currMoment(index_moment);
	});
}

function index_currMoment(curr_moment){

	var index_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var index_days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Sets the id of the month, day, and date to whatever the current day it is
	$("#month").html(index_names[curr_moment.month()]);
	$("#day").html(index_days[curr_moment.day()]);
	$("#date").html(curr_moment.date());
	
}
