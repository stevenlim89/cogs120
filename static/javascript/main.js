$(document).ready(function(){
	initializeSquares();
	initializeHide();
	initializeNext();
	initializePrevious();
	woopraTest();
})
	
function woopraTest(){
	$("#todaySection").hide();
	$("#featuresPage").toggleClass("active");

	$("#todayPage").click(function(){
		$('.squares').hide();
		$("#todaySection").show();
		$("#featuresPage").toggleClass("active");
		$("#todayPage").toggleClass("active");
		woopra.track("today_page");
		todayViewInit();
	});

	$("#featuresPage").click(function(){
		$('.squares').show();
		$("#todaySection").hide();
		$("#featuresPage").toggleClass("active");
		$("#todayPage").toggleClass("active");
		woopra.track("features_page");
	});		
}

function todayViewInit(){
	$.get('/putEvents', callback);

	function callback(result){
		console.log("@@@@@@@REsult:   ");
		console.log(result);
		$('#dayCalendar').fullCalendar({
          header: {
                  left: 'prev',
                  center: 'title',
                  right: 'next'
          },
          defaultView: 'agendaDay',
          editable: true,
          weekMode: 'liquid',
          url: '#',
          events: result
      });
		
	}
}
function initializeSquares(){
	$("#createSquare").click(function(){
		window.location = 'gruupUp';
		return false;
	});

	$("#editSquare").click(function(){
		window.location = 'createEvent';
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

function retrieveEvents(date){
	var currDayEvents = [];
	$.get('retrieveEvents', {"getDate": date}, function(data){
		console.log(data);
		for(var i = 0; i < data.length; i++){
			var dataMoment = moment(data[i].start);
			var difference = dataMoment.differ(moment(date));
			if(difference == 0){
				currDayEvents.push(data[i]);
			}
		}
		
	});


}

function index_init(){

	var index_moment = moment();

	index_currMoment(index_moment);
	$("#arrowLeft").click(function(){
		index_moment.subtract("1", "days");
		index_currMoment(index_moment);
		retrieveEvents(index_moment);
	});

	$("#arrowRight").click(function(){
		index_moment.add("1", "days");
		index_currMoment(index_moment);
		retrieveEvents(index_moment);
	});

	$("#index_today_button").click(function(){
		index_moment = moment();
		index_currMoment(index_moment);
		retrieveEvents(index_moment);
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

function initializeHide(){
	$('#tut_first').hide();
}


function initializeNext(){
	$('#tut_next').click(function (){
		$('#tut_second').hide();
		$('#tut_first').show();
	});
}

function initializePrevious(){
	$('#tut_previous').click(function (){
		$('#tut_first').hide();
		$('#tut_second').show();
	});
}
