$(document).ready(function() {
	initializePage();
})

function initializePage() {
	var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var day = date.getDay();

 	var userEvents;
    $.get('/putEvents', callback);

    function callback(result){
    	console.log("********************Result of the send:   \n" + result[0].title + "     " + result[1].title);
    	userEvents = result;

		for(var i = 0; i < result.length; i++){
			userEvents[i] = result[i];
		}    
		$('#calendar').fullCalendar({
        // put your options and callbacks here
        editable: true,
        weekMode: 'liquid',
        url: '#',
        events: userEvents,
        aspectRatio: 2
    }); 	
    }
//console.log("********************userEvents:   \n" + userEvents.length);
    
}
