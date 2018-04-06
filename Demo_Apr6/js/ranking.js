$(function() {
	$.ajax({
		url:"./php/executeQuery.php", //the page containing php script
		type: "get", //request type
		datatype: 'json',
		data: {request_type:"ranking", causeName: cause_name, locationName: location_name}
	}).done(function (response) {
		var rows = JSON.parse(response);
		console.log(rows);
	}).fail(function (e) { 
		console.log(e);
	});
});
