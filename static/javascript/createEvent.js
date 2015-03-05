$(document).ready(function () {
	initializeElements();       
})

function initializeElements(){
	$('#datepicker').datepicker({
          altFormat: "yyyy-mm-dd"
    });

    $(".time_element").timepicki({
      step_size_minutes:30
    });
}
