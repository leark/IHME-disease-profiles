$(function() {
	$.ajax({
		url:"./php/executeQuery.php", //the page containing php script
		type: "get", //request type
		datatype: 'json',
		data: {request_type:"heat_rank", causeName: cause_name, locationName: location_name}
	}).done(function (response) {
		var rows = JSON.parse(response);
		// console.log(rows);

		// find the mean data --> determines the color of the fill
		// make an array with discrete values that determine the value of the domain
		// domain [1, 2, 3]
		// color [low, same, high]
		// mean_val_country = [];

		// remove the long names for DALYs, YLDs, YLLs
		for (let i = 0; i < rows.length; i++) {
			let cause = rows[i].measure.split("(");
			rows[i].measure = cause[0];
		}

		// Title
		$('#heatTitle').text(`How do causes of death and disability compare with ${cause_name} in other locations`);

		// formatting
		let itemSize = 51
			cellSize = itemSize - 1, // size of each rectangle
			margin = {top: 70, right: 20, bottom: 20, left: 130}; // boundaries of the svg

		let width = 500 - margin.right - margin.left,
			height = 400 - margin.top - margin.bottom;

		// structure formatting
		let x_elements = d3.set(rows.map(function( rows ) { return rows.measure; } )).values(),
			y_elements = d3.set(rows.map(function( rows ) { return rows.location; } )).values();

		let xScale = d3.scale.ordinal()
			.domain(x_elements)
			.rangeBands([0, x_elements.length * itemSize]);

		let xAxis = d3.svg.axis()
			.scale(d3.scale.ordinal()
				.domain(x_elements)
				.rangeBands([-10, x_elements.length * (itemSize - 1) * 1.5 - 10])
			)
			.tickSize(0, 0, 0)
			.orient("top");

		let yScale = d3.scale.ordinal()
			.domain(y_elements)
			.rangeBands([0, y_elements.length * itemSize]);

		let yAxis = d3.svg.axis()
			.scale(yScale)
			.tickSize(0, 0, 0)
			.orient("left");

		// color colorScale
		// var colorScale = d3.scale.threshold()
		// 	.domain([1, 10])
		// 	.range(["#3b81a0", "#dc4d28"]);

		let svg = d3.select('#heatmap')
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// rectangles
		let cells = svg.selectAll('rect')
			.data(rows)
			.enter().append('g').append('rect')
			.attr('class', 'cell')
			.attr('width', cellSize * 1.5)
			.attr('height', cellSize)
			.attr('x', function(d) { return xScale(d.measure) * 1.5; })
			.attr('y', function(d) { return yScale(d.location); })
			.attr('fill', function(d) { return "#f2f2f2"; })
			// .attr('fill', function(d) { return colorScale(d); })
			.attr('stroke', 'black');

		// text
		let boxes = svg.selectAll('text')
			.data(rows)
			.enter().append('g').append('text')
			.style('text-anchor', 'middle')
			.text(function(d) { return Math.round( d.val * 10 ) / 10})
			.attr('x', function(d) { return (xScale(d.measure) + (itemSize - 1) / 2) * 1.5; })
			.attr('y', function(d) { return yScale(d.location) + 30; });

		// y axis
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.selectAll('text')
			.attr("dx", "-.8em")
			.attr('font-weight', 'normal')
			.style('font', '14px Nunito');

		// x axis
		svg.append("g")
			.attr("class", "x axis")
			.call(xAxis)
			.selectAll('text')
			.attr('font-weight', 'normal')
			.style("text-anchor", "start")
			.attr("dx", ".8em")
			.attr("dy", ".8em")
			.style('font', '14px Nunito')
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
