$(document).ready(function() {
	initializePage();
    calculateEvents();
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

function calculateEvents(){
    $('#gruupUpSubmit').click(function(e){
        e.preventDefault();
        var dateFromForm = $('#gruupUpForm').serializeArray();

        $.post('/processGruupUp', dateFromForm, function(data){
            var desireDate = moment(data[data.length - 1], "MM/DD/YYYY");
            var compareDate;
            var sTime;
            var eTime;
            var difference;
            var timeArray = new Array(50);
            var indexStart;
            var indexEnd;

            for(var z = 0; z < 50; z++){
                timeArray[z] = 0;
            }

            for(var i = 0; i < data.length - 1; i++){
                for(var j = 0; j < data[i].events.length; j++){
                    sTime = moment(data[i].events[j].start, "MM/DD/YYYY HH:mm:ss");
                    compareDate = moment(data[i].events[j].start, "MM/DD/YYYY");

                    if(compareDate.isSame(desireDate)){
                        eTime = moment(data[i].events[j].end, "MM/DD/YYYY HH:mm:ss");
                        indexStart = (sTime.hour() * 2) + (sTime.minutes()/30);           
                        indexEnd = (eTime.hour() * 2) + (eTime.minutes()/30);
                   
                        difference = indexEnd - indexStart;
                        for(var k = indexStart; k < indexStart + difference; k++){
                            timeArray[k] = timeArray[k] + 1;
                        }
                    }
                }
            }
console.log("@@@@@@@@timeArray:   ");
console.log(timeArray);
        });
    });
}
