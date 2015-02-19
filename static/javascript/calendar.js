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
    	
        userEvents = result;

		for(var i = 0; i < result.length; i++){
			userEvents[i] = result[i];
            alert(""+result[i].title);
		}    
		$('#calendar').fullCalendar({

        editable: true,
        weekMode: 'liquid',
        url: '#',
        events: userEvents,
        aspectRatio: 2
    }); 	
    }
}
