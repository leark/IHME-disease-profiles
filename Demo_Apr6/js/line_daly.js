$(function() {
	$.ajax({
		url:"./php/executeQuery.php", //the page containing php script
		type: "get", //request type
		dataType: 'json',
		data: {request_type:"daly_line", causeName: cause_name, locationName: location_name}
	}).done(function (msg) {
		//console.log(msg);
		
		var margins = {top: 30, bottom: 50, left: 60, right: 50};

		var width = 800 - margins.left - margins.right,
			height = 360 - margins.top - margins.bottom;
		var formattedData = [];

		for (var i = msg.length - 1; i >= 0; i = i - 3) {
			var singleYear = msg[i];
			formattedData.push(
				{
					"title":singleYear.measure,
					"year": singleYear.year,
					"metric": singleYear.metric,
					"female": parseFloat(msg[i-1].val),
					"male": parseFloat(msg[i-2].val),
					"both": parseFloat(singleYear.val)
				});
		}
		console.log(formattedData);
		
		// Set the ranges
		var x = d3.scale.linear().range([0, width]);
		var y = d3.scale.linear().range([height, 0]);

		// Define the axes
		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
			.ticks(12)
			.tickFormat(d3.format("d"));		

		function y_axis() {
			return d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(8);
		}
			
		// Define the both line
		var valueline = d3.svg.line()
			.x(function(d) { return x(d.year); })
			.y(function(d) { return y(d.both); });
			
		// Define the female line
		var valuelineF = d3.svg.line()
			.x(function(d) { return x(d.year); })
			.y(function(d) { return y(d.female); });
			
		// Define the male line
		var valuelineM = d3.svg.line()
			.x(function(d) { return x(d.year); })
			.y(function(d) { return y(d.male); });
							
		// Adds the svg canvas					  
		var svg = d3.select("#daly_lineDiv")
			.data(formattedData)
		.append("svg")
			.attr("class", "line")
			.attr("width", width + margins.left + margins.right)
			.attr("height", height + margins.top + margins.bottom)
		.append("g")
			.attr("transform", "translate(" + margins.left + "," + margins.top + ")");

			// Scale the range of the data
			x.domain(d3.extent(formattedData, function(d) { return d.year; }));
			y.domain([0, d3.max(formattedData, function(d) { return d.both; })]);

			// Add the X Axis
			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis);

			// Add the Y Axis
			svg.append("g")
				.attr("class", "y axis")
				.call(y_axis()
					.tickSize(-width, 0, 0)
				);
			
			// Add the valueline path for both 
			svg.append("path")
				.attr("class", "both")
				.attr("d", valueline(formattedData));
				
			// Add the valueline path for female 
			svg.append("path")
				.attr("class", "female")
				.attr("d", valuelineF(formattedData));
			
			// Add the valueline path for male 
			svg.append("path")
				.attr("class", "male")
				.attr("d", valuelineM(formattedData));
		
		//title
		$('#daly_lineTitle').text(`What is the disability-adjusted life year (DALY) from ${cause_name.toLowerCase()}?`);
		
		//legend
		var female = d3.select('#daly_fembar')
			.append("svg")
				.attr("class", "female")
				.attr("width", "24px")
				.attr("height", "14px")
			.append("line")
				.attr("x1", "3px")
				.attr("x2", "21px")
				.attr("y1", "9px")
				.attr("y2", "9px")
		
		$("#daly_femtext").text("Females")
		
		var male = d3.select('#daly_mbar')
			.append("svg")
				.attr("class", "male")
				.attr("width", "24px")
				.attr("height", "14px")
			.append("line")
				.attr("x1", "3px")
				.attr("x2", "21px")
				.attr("y1", "9px")
				.attr("y2", "9px")
		
		$("#daly_mtext").text("Males")
		
		var both = d3.select('#daly_bothbar')
			.append("svg")
				.attr("class", "both")
				.attr("width", "24px")
				.attr("height", "14px")
			.append("line")
				.attr("x1", "3px")
				.attr("x2", "21px")
				.attr("y1", "9px")
				.attr("y2", "9px")
		
		$("#daly_bothtext").text("All")
	
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
