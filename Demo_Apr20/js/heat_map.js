$(function() {
	$.ajax({
		url:"./php/executeQuery.php", //the page containing php script
		type: "get", //request type
		datatype: 'json',
		data: {request_type:"heat_rank", causeName: cause_name, locationName: location_name}
	}).done(function (response) {
		var rows = JSON.parse(response);
		// console.log(rows);

		// Title
		$('#heatTitle').text(`Comparisons of ${cause_name}`);

		// formatting
		let itemSize = 51
			cellSize = itemSize - 1,
			margin = {top: 120, right: 20, bottom: 20, left: 110};

		let width = 750 - margin.right - margin.left,
			height = 500 - margin.top - margin.bottom;

		// data
		let x_elements = d3.set(rows.map(function( rows ) { return rows.measure; } )).values(),
			y_elements = d3.set(rows.map(function( rows ) { return rows.location; } )).values();

		let xScale = d3.scale.ordinal()
			.domain(x_elements)
			.rangeBands([0, x_elements.length * itemSize]);

		let xAxis = d3.svg.axis()
			.scale(xScale)
			.orient("top");

		let yScale = d3.scale.ordinal()
			.domain(y_elements)
			.rangeBands([0, y_elements.length * itemSize]);

		let yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("left");

		// var colorScale = d3.scale.threshold()
		// 	.domain([1, 4])
		// .range(["#912711", "#002a53", "#27AE60", "#27AE60"]);

		let svg = d3.select('#heatmap')
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		let cells = svg.selectAll('rect')
			.data(rows)
			.enter().append('g').append('rect')
			.attr('class', 'cell')
			.attr('width', cellSize)
			.attr('height', cellSize)
			.attr('y', function(d) { return yScale(d.location); })
			.attr('x', function(d) { return xScale(d.measure); })
			// .attr('fill', function(d) { return colorScale(d.val); });
			.attr('stroke', 'black')
			.attr('fill', 'white');

		let boxes = svg.selectAll('text')
			.data(rows)
			.enter().append('g').append('text')
			.style('text-anchor', 'middle')
			.text(function(d) { return Math.round( d.val * 10 ) / 10})
			.attr('x', function(d) { return xScale(d.measure) + 20; })
			.attr('y', function(d) { return yScale(d.location) + 30; });

		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.selectAll('text')
			.attr('font-weight', 'normal');

		svg.append("g")
			.attr("class", "x axis")
			.call(xAxis)
			.selectAll('text')
			.attr('font-weight', 'normal')
			.style("text-anchor", "start")
			.attr("dx", ".8em")
			.attr("dy", ".5em")
			.attr("transform", function (d) {
				return "rotate(-65)";
			});

		// Footer
		let containerDiv = document.getElementById("heatDiv");
		let footer = document.createElement("p");
		let footer_text = document.createTextNode("2016, age-standardized, rate");
		footer.appendChild(footer_text);
		containerDiv.appendChild(footer);

	}).fail(function (e) {
		console.log(e);
	});
});
