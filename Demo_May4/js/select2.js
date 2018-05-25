$(document).ready(function() { 
	$("#e1").select2({
		placeholder: "Select Cause",
		allowClear: true,
		width: '30%',
		selectOnClose: true
	}); 
	$("#e2").select2({
		placeholder: "Select Location",
		allowClear: true,
		width: '25%',
		selectOnClose: true
	}); 
});