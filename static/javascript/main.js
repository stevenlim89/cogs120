$(document).ready(function(){
	initializeSquares();
	initializeHide();
	initializeNext();
	initializePrevious();
	settingsListener();
	woopraTutorialTest();
})

function woopraTutorialTest(){

	var random_num = Math.random();

	if(random_num > 0.5){
	    $("#skipButton1").hide();
	}else{
	    $("#skipButton2").hide();
	}
	$("#skipButton1").click(function(){
		woopra.track("skip_button_one");
		window.location = 'tutorialTwo';
	});

	$("#skipButton2").click(function(){
		woopra.track("skip_button_two");
		window.location = 'homepage';
	});
}

function settingsListener(){
 $('#settingsModal').modal('hide');

 $('.settingsPassword').keyup(function () {
  var newpass1 = $("[name='updateNewPassword1']").val();
  var newpass2 = $("[name='updateNewPassword2']").val();
  
  if(!(newpass1 === newpass2)) {
   $('#settingsPassMessage')
   .html('Please make sure that the new passwords match').css("color","red").show();
  }
  else {
   $('#settingsPassMessage')
   .html('Please make sure that the new passwords match').css("color","red").fadeOut();
  }
 });

 $('#headerSettings').click(function (events){
  $('#settingsModal').modal('show');  
 });

 $('#updateNamesButton').click(function (events) {  
  var updateInfoForm = $('#updateSettingsForm').serializeArray();
  var updateFirstName = updateInfoForm[0].value;
  var updateLastName = updateInfoForm[1].value;  

  if( (updateFirstName.length == 0 && updateLastName == 0) ) {
   $('#settingsNamesMessage').html("You can update your first name, last name or both.").show();
  } else {
   $('#settingsNamesMessage').html("You can update your first name, last name or both.").fadeOut();
   $.post('/processSettingsNames', updateInfoForm, function(callbackMsg) {
    $('#settingsMessage').html(callbackMsg).show();
   });
  }
 });

 $('#updatePassButton').click(function (events) {  
  var updateInfoForm = $('#updateSettingsForm').serializeArray();  
  var updateCurrPass = updateInfoForm[2].value;
  var updateNewPass1 = updateInfoForm[3].value;
  var updateNewPass2 = updateInfoForm[4].value;

  if( updateCurrPass.length == 0 ) {   
   $('#settingsPassMessage').html("You must enter your current password.").css("color","red").show();

  } else if( updateNewPass1.length == 0 || updateNewPass2.length == 0 ) {
   $('#settingsPassMessage').html("Looks like you missed one of the new password fields.").css("color","red").show();

  } else if( !(updateNewPass1 === updateNewPass2) ) {
   $('#settingsPassMessage').html("Your new passwords don't match.").css("color","red").show();
  } else {
   $.post('/processSettingsPass', updateInfoForm, function(callbackMsg) {
    $('#settingsMessage').html(callbackMsg).show();
   });
  }
 });
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
