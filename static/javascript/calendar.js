$(document).ready(function() {
	initializePage();
})

function initializePage() {
	var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var day = date.getDay();

    //var email = getCookie("login_session");
    //console.log("**************************THIS IS THE EMAIL:      " + email);
    $('#calendar').fullCalendar({
        // put your options and callbacks here
        editable: true,
        weekMode: 'liquid',
        url: '#',
        events: [],
        aspectRatio: 2
    }); 
}
