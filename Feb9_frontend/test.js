function create() {
	var cause_name = $("#causeName").val();
	var location_name = $("#locationName").val();
	
	$.ajax({
		url:"search.php", //the page containing php script
		type: "get", //request type,
		dataType: 'json',
		data: {request: "success", causeName: cause_name, locationName: location_name},
		success: function(req){
			console.log(req);
		}
	});
}