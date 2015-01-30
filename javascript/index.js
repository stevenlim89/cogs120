$(document).ready(function() {
	initializePage();
})

function initializePage() {

	$("#button1").click(buttonClicked);
	$("#button2").click(buttonClicked);
	$("#button3").click(buttonClicked);
	$("writePost").click(buttonClicked);
}

function buttonClicked(e){
	e.preventDefault();

	window.location.href = "http://stackoverflow.com";
}