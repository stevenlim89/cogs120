$(document).ready(function(){
	initializeBreadCrumbs();
})
	


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
}