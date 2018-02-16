function create() {
	// $.ajax({
		// url:"test.php", //the page containing php script
		// type: "post", //request type,
		// dataType: 'json',
		// data: {registration: "success", name: "xyz", email: "abc@gmail.com"},
		// success: function(result){
			// console.log(result.abc);
		// }
	// });

	// var cause_name = $("#causeName").val();
	// var location_name = $("#locationName").val();
	
	$.ajax({
		url:"test.php", //the page containing php script
		type: "get", //request type,
		dataType: 'json',
		data: {request: "success", causeName: "HIV/AIDS", locationName: "Russia"},
		success: function(req){
			console.log(req);
		}
	});
}