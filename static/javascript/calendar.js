$(document).ready(function() {
	initializePage();
})

function initializePage() {
	var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var day = date.getDay();
    $.getJSON('../../email.json', function(data){
    	console.log("DATA in json file:     " + data);
    });
    $('#calendar').fullCalendar({
        // put your options and callbacks here
        editable: true,
        weekMode: 'liquid',
        url: '#',
        events: [],
        aspectRatio: 2
    }); 
}
