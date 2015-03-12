$(document).ready(function() {
    initializeBreadCrumbs();
    initializePage();
    calculateEvents();
})

function initializePage() {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var day = date.getDay();
    var split;
    var split2;
    var userEvents;

    $('#calculatedMessage').hide();

    $.get('/putEvents', callback);

    function callback(result){
        
        userEvents = result;

        for(var i = 0; i < result.length; i++){
            split = result[i].start.split('-');
            split2 = result[i].end.split('-');
            userEvents[i] = result[i];
        }    

        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'month,agendaDay'
            },
            dayClick: function(date, allDay, jsEvent, view){
                $('#calendar').fullCalendar('gotoDate', date);
                $('#calendar').fullCalendar('changeView', 'agendaDay');
            },
            eventClick: function(calEvent, jsEvent, view){
                $('#hiddenTitle').val(calEvent.title);
                $('#hiddenStart').val(calEvent.start);
                $('#hiddenEnd').val(calEvent.end);
                
                $('#modalTitle').html(calEvent.title);
                var startString = calEvent.start.format("ddd, MMM Do, h:mm a");
                var endString = calEvent.end.format("ddd, MMM Do, h:mm a");
                $('#modalStart').html(startString);
                $('#modalEnd').html(endString);
                $('#calendarModal').modal('show');
                
            },
            editable: true,
            weekMode: 'liquid',
            url: '#',
            allDaySlot: false,
            events: userEvents
        });
    }
}

function initializeBreadCrumbs(){
    $("#homeBC").click(function(){
        window.location = 'homepage';
        return false;
    });

    $("#gruupUpBC").click(function(){
        window.location = 'gruupUp';
        return false;
    });

    $("#calBC").click(function(){
        window.location = 'calendar';
        return false;
    });

    $("#createEventBC").click(function(){
        window.location = 'createEvent';
        return false;
    });
}

function calculateEvents(){
    $('#gruupUpSubmit').click(function(e){
        e.preventDefault();

        if( ($('input#datepicker.hasDatepicker').val()).length == 0 ) {
            var gruupUpPulseCtr1 = 0
            $('#gruupUpAlert').text( "Don't forget the date.." ).show().fadeOut(6000);
            pulse($('.gruupUpForm>input.hasDatepicker'));
            while( gruupUpPulseCtr1 < 2 ) {
              pulse($('.gruupUpGruupers'));
            }
            return;
        }      

        if( $('input:checked').length <= 0 ) {
            var gruupUpPulseCtr = 0;
            $('#gruupUpAlert').text( "Don't forget to add friends.." ).show().fadeOut(6000);
            while( gruupUpPulseCtr < 2 ) {
              pulse($('.gruupUpGruupers'));
            }
            return;
        }          

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

            $()

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

    /* convertedTimeArray is an array of event objects, example:
               
               [{
                    editable: false,
                    end: mm/dd/yyyy hh:mm:ss,
                    overlap: false,
                    start: mm/dd/yyyy hh:mm:ss,
                    title: "unavailable"
                }]
            */
            

            $('#gruupUpForm').slideUp("slow", function() {
                $('#calculatedMessage').slideDown("slow");

                convertedTimeArray = showEventsModal(data[data.length - 1], timeArray);

                $('#gruupUpCalendar').fullCalendar({                    
                    header: {  
                        left: 'none',
                        center: 'title',
                        right: 'none'
                    },
                    defaultDate: data[data.length - 1],
                    defaultView: 'agendaDay',                
                    selectable: true,
                    selectHelper: true,
                    select: function(start, end) {
                        var title = prompt("Event Title:\n**Persistence to self and friends' schedules, coming soon...");
                        var eventData;
                        if (title) {
                            eventData = {
                                title: title,
                                start: start,
                                end: end
                            };
                            $('#gruupUpCalendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                        }
                        $('#gruupUpCalendar').fullCalendar('unselect');
                    },
                    editable: true,
                    eventLimit: true,
                    allDaySlot: false,
                    events: convertedTimeArray
                });
            }); // gruupUpContent
        });
    });
}

function showEventsModal(eventDate, eventsModalArray) {

    var modalStart = false;  // Track if we found a start time
    var currEventArray = [];
    var currEventObj = {
        title: String,
        start: String,
        end: String,
        editable: Boolean,
        overlap: Boolean
    }

    // Build the occupied events, into an array of objects
    for(var i = 0; i < eventsModalArray.length; ++i) {

        // find start time
        if( modalStart == false && eventsModalArray[i] >= 1 ) {
            modalStart = true;

            // start of event found
            currEventObj.editable = false;
            currEventObj.overlap = false;
            currEventObj.title = 'unavailable';
            currEventObj.start = "" + eventDate + " " + convertIndexToTime(i);

        }

        // find end time or if we have a start time but at end of day
        if( (modalStart == true && eventsModalArray[i] == 0) ||
            (modalStart == true && (i == eventsModalArray.length - 1)) ) {

            modalStart = false;
            currEventObj.end = "" + eventDate + " " + convertIndexToTime(i);

            // append this event to event array
            currEventArray.push( currEventObj );
        }
    }

console.log("             !!!!!!!!!!!!! printing currEventArray...");
console.log(currEventArray);

    return currEventArray;

}

/*
 * Convert the index, an int, into the time with format HH:mm:SS
 *
 * Return:
 *  - String with format HH:mm:ss
 */
function convertIndexToTime( currIndex ) {
    var convertedTime;
    var tempHour = parseInt( currIndex/2 );

    // Build the HH portion of time, which is formatted HH:mm:ss
    switch( tempHour ) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            // add a leading zero to the hour
            convertedTime = "0" + tempHour;
            break;

        default:
            convertedTime = "" + tempHour;

    }
    // Append the minutes to the converted time string
    if( (currIndex % 2) == 1 ) { convertedTime += ":30"; }
        else { convertedTime += ":00"; }

    convertedTime += ":00";

    return convertedTime;

}

function pulse(gruupUpPulseElement){
  gruupUpPulseElement.delay(700).animate({'border-color':'Red'}, 100)
  .delay(700).animate({'border-color': 'Transparent'}, 100);
  gruupUpPulseCtr++;
}