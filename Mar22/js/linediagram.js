$(function() {
	$.ajax({
		url:"./php/executeQuery.php", //the page containing php script
		type: "get", //request type
		dataType: 'json',
		data: {request_type:"line", causeName: cause_name, locationName: location_name}
	}).done(function (msg) {

		var margins = {top: 30, bottom: 50, left: 60, right: 50};

		var width = 800 - margins.left - margins.right,
			height = 360 - margins.top - margins.bottom;
		var formattedData = [];

		for (var i = msg.length - 1; i >= 0; i = i - 3) {
			var singleYear = msg[i];
			formattedData.push(
				{
					"title":"Deaths",
					"subtitle": singleYear.year,
					"ranges":[Math.ceil(singleYear.lower), singleYear.val, Math.ceil(singleYear.upper)],
					// "measures":[Math.ceil(singleYear.lower), Math.ceil(singleYear.upper)],
					"markers": parseFloat(singleYear.val)
				});
		}
		console.log(formattedData);
		
		// Set the ranges
		var x = d3.scale.linear().range([0, width]);
		var y = d3.scale.linear()
		.range([height, 0]);
		//.domain(d3.extent(formattedData, function(d) { return d.markers; }));
		//.domain([2, 100]);

		// Define the axes
		var xAxis = d3.svg.axis().scale(x)
			.orient("bottom").ticks(5)
			.tickFormat(d3.format("d"));

		var yAxis = d3.svg.axis().scale(y)
			.orient("left").ticks(5);

		// Define the line
		var valueline = d3.svg.line()
			.x(function(d) { return x(d.subtitle); })
			.y(function(d) { return y(d.markers); });
							
		// Adds the svg canvas					  
		var svg = d3.select("#lineDiv")
			.data(formattedData)
		.append("svg")
			.attr("class", "line")
			.attr("width", width + margins.left + margins.right)
			.attr("height", height + margins.top + margins.bottom)
		.append("g")
			.attr("transform", "translate(" + margins.left + "," + margins.top + ")");

			// Scale the range of the data
			x.domain(d3.extent(formattedData, function(d) { return d.subtitle; }));
			y.domain([0, d3.max(formattedData, function(d) { return d.markers; })]);

			// Add the valueline path.
			svg.append("path")
				.attr("class", "line")
				.attr("d", valueline(formattedData));

			// Add the X Axis
			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis);

			// Add the Y Axis
			svg.append("g")
				.attr("class", "y axis")
				.call(yAxis);

		$('#lineTitle').text(`How many people died from ${cause_name.toLowerCase()}?`);
	
		// text label for the x axis
		svg.append("text")
			.attr("transform",
				"translate(" + (width/2) + " ," + 
				(height + margins.bottom) + ")")
				.style("text-anchor", "middle")
			.text("Year");
		
		// text label for the y axis	
		svg.append("text")
			  .attr("transform", "rotate(-90)")
			  .attr("y", 0 - margins.left)
			  .attr("x",0 - (height / 2))
			  .attr("dy", "1em")
			  .style("text-anchor", "middle")
			  .text("Number of deaths");      

	}).fail(function (error) {
		console.log(error);
	});
});
