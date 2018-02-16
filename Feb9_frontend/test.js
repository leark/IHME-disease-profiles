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
			var margins = {top: 50, bottom: 50, left: 50, right: 50};

			var width = 420,
				barHeight = 100;
				
			var deaths = [data.val];
			
			var x = d3.scale.linear()
				.domain([0, deaths]) 
				.range([0, width]);

			// var xaxis = d3.axisBottom(x);

			// var yaxis = d3.axisLeft();

			var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom");
				

			// var yAxis = d3.svg.axis()
			// 	.scale()
			// 	.orient("left");

			var chart = d3.select(".chart")
				.attr("width", width)
				.attr("height", barHeight + 50);
				
			var bar = chart.selectAll("g")
				.data(deaths)
				.enter().append("g");
				//.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; }); //positions bars underneath each other 
			chart.append("g")
			    .attr("class", "x axis")
			    .attr("transform", "translate(20," + 80 + ")")
			    .call(xAxis);

			// chart.append("g")
			//     .attr("class", "y axis")
			//     .attr("transform", "translate(10," + 50 + ")")
			//     .call(yAxis);

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