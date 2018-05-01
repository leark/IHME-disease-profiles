$(function() {
	$.ajax({
		url:"./php/executeQuery.php", //the page containing php script
		type: "get", //request type
		dataType: 'json',
		data: {request_type: "bullet", causeName: cause_name, locationName: location_name}
	}).done(function (msg) {
		// console.log(msg);

		let loading = document.getElementById("lineAreaLoading");
		loading.parentNode.removeChild(loading);

		let margins = {top: 30, bottom: 50, left: 60, right: 50};

		let width = 800 - margins.left - margins.right,
			height = 360 - margins.top - margins.bottom;
		
		let formattedData = [];

		// formatting table data
		// for (let i = msg.length - 1; i >= 0; i = i - 3) {

		// let max = msg[msg.length - 1].upper;
		// let min = msg[msg.length - 1].lower;

		for (let i = msg.length - 1; i >= 0; i--) {
			let singleYear = msg[i];
			{
				formattedData.push(
					{
						"year": Number(singleYear.year),
						"metric": singleYear.metric,
						"lower": Number(singleYear.lower),
						"val": Number(singleYear.val),
						"upper": Number(singleYear.upper)
					});
			}
			// if (max < Number(singleYear.upper)) {
			// 	max = singleYear.upper;
			// }
			// if (min > singleYear.min) {
			// 	min = singleYear.lower;
			// }
		}
		// console.log(formattedData);

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

		// function for area
		let area = d3.svg.area()
			.x(function(d) { return x(d.year); })
			.y0(function(d) { return y(d.lower); })
			.y1(function(d) { return y(d.upper); });

		// function for line
		let valueline = d3.svg.line()
			.x(function(d) { return x(d.year); })
			.y(function(d) { return y(d.val); });

		// Adds the svg canvas					  
		let svg = d3.select("#lineAreaGraph")
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
		// let upperDomain = d3.extent(formattedData, function(d) { return d.upper; });
		// let lowerDomain = d3.extent(formattedData, function(d) { return d.lower; });
		let max = d3.max(formattedData, function(d) { return d.upper; });
		let min = d3.min(formattedData, function(d) { return d.lower; });
		// let max = Math.max.apply(Math, upperDomain);
		// let min = Math.min.apply(Math, lowerDomain);
		// console.log(max);
		// console.log(min);
		// console.log(`Y domain is calculated with ${min} - (0.05 * ${min} and ${max})`);
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
		$('#lineAreaTitle').text(`Mortality rate with uncertainty from 1990 to 2016`);
		
		// text label for the x axis
		svg.append("text")
			.attr("transform",
				"translate(" + (width/2) + " ," + 
				(height + margins.bottom) + ")")
				.style("text-anchor", "middle")
			.text("Year");
		
		// Footer
		var containerDiv = document.getElementById("lineAreaGraph");
		var footer = document.createElement("p");
		var footer_text = document.createTextNode("Morality rate and uncertainty, 1990-2016, all ages, rate");
		footer.appendChild(footer_text);
		containerDiv.appendChild(footer);	
		
		// initialize the export to image button
		iniSaveButton(`lineAreaSave`, `lineAreaGraph`, `${cause_name}MortalityAt${location_name}`);

	}).fail(function (error) {
		console.log(`Error from lineArea: ${error}`);
	});
});
	