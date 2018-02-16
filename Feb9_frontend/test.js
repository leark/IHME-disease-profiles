function create() {
	var cause_name = $("#causeName").val();
	var location_name = $("#locationName").val();
	
	var data = null;
	
	$.ajax({
		url:"search.php", //the page containing php script
		type: "get", //request type
		dataType: 'json',
		data: {causeName: cause_name, locationName: location_name},
		success: function(req){
			//console.log(req);
			data = req[0];
		},
		complete: function(){
			console.log(data);
			var width = 420,
				barHeight = 20;
				
			var deaths = [data.val]
			
			var x = d3.scale.linear()
				.domain([0, deaths]) 
				.range([0, width]);
				
			var chart = d3.select(".chart")
				.attr("width", width)
				.attr("height", barHeight);
				
			var bar = chart.selectAll("g")
				.data(deaths)
				.enter().append("g");
				//.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; }); //positions bars underneath each other 
			
			bar.append("rect")
				.attr("width", x)
				.attr("height", barHeight - 1)
				.style("fill", "blue");
					
			bar.append("text")
				.attr("x", function(d) { return x(d) - 3; })
				.attr("y", barHeight / 2)
				.attr("dy", ".35em")
				.text(function(d) { return d; });
			

		}

	});
	
	
}