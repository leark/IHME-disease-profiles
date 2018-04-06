    // <script type="text/javascript" src="./js/bullet.js"></script>
    // <script type="text/javascript" src="./js/bulletdiagram.js"></script>
	// <script type="text/javascript" src="./js/linediagram.js"></script>
	// <script type="text/javascript" src="./js/line_daly.js"></script>
	// <script type="text/javascript" src="./js/line_yld.js"></script>
	// <script type="text/javascript" src="./js/arrowdiagram.js"></script>
	
$(function() {
	$.ajax({
		url:"./php/executeQuery.php", //the page containing php script
		type: "get", //request type
		datatype: 'json',
		data: {request_type:"ranking", causeName: cause_name, locationName: location_name}
	}).done(function (response) {
		var rows = JSON.parse(response);
		console.log(rows);
		// percent change

		// Title
		$('#rankTitle').text(`${cause_name} changes in 1990 vs 2016`);

		// var container = document.getElementById("rankTableDiv");
		
		// var previous_rank = document.createElement("div");
		// previous_rank.id = "rank-table";
		// var prev_title = document.createElement("h3");
		// var prev_node = document.createTextNode(JSON.stringify(rows));
		// prev_title.appendChild(prev_node);
		// previous_rank.appendChild(prev_title);
		// container.appendChild(previous_rank);
		
	}).fail(function (e) { 
		console.log(e);
	});
});