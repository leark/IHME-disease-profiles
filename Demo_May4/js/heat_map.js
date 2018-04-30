$(function() {
	$.ajax({
		url:"./php/executeQuery.php", //the page containing php script
		type: "get", //request type
		datatype: 'json',
		data: {request_type:"heat_rank", causeName: cause_name, locationName: location_name}
	}).done(function (response) {
		var rows = JSON.parse(response);

		heatData = [];
		for (let i = 0; i < 6; i++) {
			heatData.push({
				'location': rows[i].location,
				'Deaths': Math.round(rows[i].val * 10000 ) / 100,
				'DALYs': Math.round(rows[i + 7].val * 100 ) / 100,
				'YLDs': Math.round(rows[i + 2 * 7].val * 100 ) / 100,
				'YLLs': Math.round(rows[i + 3 * 7].val * 100 ) / 100
			})
		};

		// Title
		$('#heatTitle').text(`How do causes of death and disability compare with ${cause_name}`);

		column = ["location", "Deaths", "DALYs", "YLDs", "YLLs"];
		var heatmapTable = tabulateMap(heatData, column, "#heatmapDiv");
		heatmapTable.selectAll("thead th")
			.text(function(column) {
				return column;
			});
		heatmapTable.selectAll("tbody tr")
			.sort(function(a, b) {
				return d3.descending(a.age, b.age);
			});

		// formatting
		// let itemSize = 51
		// 	cellSize = itemSize - 1, // size of each rectangle
		// 	margin = {top: 70, right: 20, bottom: 20, left: 130}; // boundaries of the svg
		//
		// let width = 500 - margin.right - margin.left,
		// 	height = 400 - margin.top - margin.bottom;
		//
		// // structure formatting
		// let x_elements = d3.set(rows.map(function( rows ) { return rows.measure; } )).values(),
		// 	y_elements = d3.set(rows.map(function( rows ) { return rows.location; } )).values();
		//
		// let xScale = d3.scale.ordinal()
		// 	.domain(x_elements)
		// 	.rangeBands([0, x_elements.length * itemSize]);
		//
		// let xAxis = d3.svg.axis()
		// 	.scale(d3.scale.ordinal()
		// 		.domain(x_elements)
		// 		.rangeBands([-10, x_elements.length * (itemSize - 1) * 1.5 - 10])
		// 	)
		// 	.tickSize(0, 0, 0)
		// 	.orient("top");
		//
		// let yScale = d3.scale.ordinal()
		// 	.domain(y_elements)
		// 	.rangeBands([0, y_elements.length * itemSize]);
		//
		// let yAxis = d3.svg.axis()
		// 	.scale(yScale)
		// 	.tickSize(0, 0, 0)
		// 	.orient("left");
		//
		// // color colorScale
		// // var colorScale = d3.scale.threshold()
		// // 	.domain([1, 10])
		// // 	.range(["#3b81a0", "#dc4d28"]);
		//
		// let svg = d3.select('#heatmap')
		// 	.append("svg")
		// 	.attr("width", width + margin.left + margin.right)
		// 	.attr("height", height + margin.top + margin.bottom)
		// 	.append("g")
		// 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		//
		// // rectangles
		// let cells = svg.selectAll('rect')
		// 	.data(rows)
		// 	.enter().append('g').append('rect')
		// 	.attr('class', 'cell')
		// 	.attr('width', cellSize * 1.5)
		// 	.attr('height', cellSize)
		// 	.attr('x', function(d) { return xScale(d.measure) * 1.5; })
		// 	.attr('y', function(d) { return yScale(d.location); })
		// 	.attr('fill', function(d) { return "#f2f2f2"; })
		// 	// .attr('fill', function(d) { return colorScale(d); })
		// 	.attr('stroke', 'black');
		//
		// // text
		// let boxes = svg.selectAll('text')
		// 	.data(rows)
		// 	.enter().append('g').append('text')
		// 	.style('text-anchor', 'middle')
		// 	.text(function(d) { return Math.round( d.val * 10 ) / 10})
		// 	.attr('x', function(d) { return (xScale(d.measure) + (itemSize - 1) / 2) * 1.5; })
		// 	.attr('y', function(d) { return yScale(d.location) + 30; });
		//
		// // y axis
		// svg.append("g")
		// 	.attr("class", "y axis")
		// 	.call(yAxis)
		// 	.selectAll('text')
		// 	.attr("dx", "-.8em")
		// 	.attr('font-weight', 'normal')
		// 	.style('font', '14px Nunito');
		//
		// // x axis
		// svg.append("g")
		// 	.attr("class", "x axis")
		// 	.call(xAxis)
		// 	.selectAll('text')
		// 	.attr('font-weight', 'normal')
		// 	.style("text-anchor", "start")
		// 	.attr("dx", ".8em")
		// 	.attr("dy", ".8em")
		// 	.style('font', '14px Nunito')
		// 	.attr("transform", function (d) {
		// 		return "rotate(-65)";
		// 	});

		// Footer
		let containerDiv = document.getElementById("heatmapDiv");
		let footer = document.createElement("p");
		let footer_text = document.createTextNode("2016, age-standardized, rate");
		footer.appendChild(footer_text);
		containerDiv.appendChild(footer);

	}).fail(function (e) {
		console.log(e);
	});
});

function tabulateMap(data, columns, table) {
    var table = d3.select(table).append("table"),
        thead = table.append("thead"),
        tbody = table.append("tbody");

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
            .text( function(column) { return column; })
				.attr('id', function(d) {
						if (d === "location")
							return "benchmark_blank";
						return 'benchmark_header-cell';
				});

    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

		var mean = data[1]; // sdi group
    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(heatData) {
            return columns.map(function(column) {
							return { column: column, value: heatData[column], mean: mean[column] };
						});
        })
        .enter()
        .append("td")
            .text(function(d) { return d.value; })
				.attr('id', function(d) {
						if (isNaN(d.value)) {
								return "benchmark_label-cell";
						} else {
								var sum = (d.mean - d.value) / Math.abs(d.mean + d.value);
								// console.log(sum);
								if (Math.abs(sum) < 0.10) {
										return "benchmark_body-cell-neutral";
								} else if (sum < 0) {
										return "benchmark_body-cell-above";
								}
								return "benchmark_body-cell-below";
						}
					});
    return table;
}
