$(function() {
	$.ajax({
		url:"./php/executeQuery.php", //the page containing php script
		type: "get", //request type
		dataType: 'json',
		data: {request_type: "bullet", causeName: cause_name, locationName: location_name}
	}).done(function (msg) {
		// console.log(msg);

		let margins = {top: 30, bottom: 50, left: 60, right: 50};

		let width = 800 - margins.left - margins.right,
			height = 360 - margins.top - margins.bottom;
		
		let formattedData = [];

		// formatting table data
		for (let i = msg.length - 1; i >= 0; i = i - 3) {
			let singleYear = msg[i];
			{
				formattedData.push(
					{
						"year": singleYear.year,
						"metric": singleYear.metric,
						"lower": singleYear.lower,
						"val": singleYear.val,
						"upper": singleYear.upper
					});
			}
		}
		console.log(formattedData);

		// Set the ranges
		let x = d3.scale.linear().range([0, width]);
		let y = d3.scale.linear().range([height, 0]);

		// Define the axes
		let xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
			.ticks(12)
			.tickFormat(d3.format("d"));		

		function y_axis() {
			return d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(10);
		}

		let area = d3.svg.area()
			.x(function(d) { return x(d.year); })
			.y0(function(d) { return y(d.lower); })
			.y1(function(d) { return y(d.upper); });

		let valueline = d3.svg.line()
			.x(function(d) { return x(d.year); })
			.y(function(d) { return y(d.val); });

		// Adds the svg canvas					  
		let svg = d3.select("#lineAreaDiv")
			.data(formattedData)
		.append("svg")
			.attr("class", "lineArea")
			.attr("width", width + margins.left + margins.right)
			.attr("height", height + margins.top + margins.bottom)
		.append("g")
			.attr("transform", "translate(" + margins.left + "," + margins.top + ")");

		// Scale the range of the data
		x.domain(d3.extent(formattedData, function(d) { return d.year; }));
		
		//need to rewrite this with better style
		let alldomain = d3.extent(formattedData, function(d) { return d.val; });
		let max = Math.max.apply(Math, alldomain);
		let min = Math.min.apply(Math, alldomain);
		console.log(min);
		console.log(max);
		y.domain([min - (.05 * min), max]);

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

		svg.append("path")
			.attr("class", "area")
			.attr("d", area(formattedData));

		// Add the valueline path for value 
		svg.append("path")
			.attr("class", "lineValue")
			.attr("d", valueline(formattedData));

		//title
		$('#lineAreaTitle').text(`Mortality rate in years 1996, 2006, 2016`);
		
	}).fail(function (error) {
		console.log(error);
	});
});
	