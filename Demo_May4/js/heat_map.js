$(function() {
	$.ajax({
		url:"./php/executeQuery.php", //the page containing php script
		type: "get", //request type
		datatype: 'json',
		data: {request_type:"heat_rank", causeName: cause_name, locationName: location_name}
	}).done(function (response) {
		if (!location_name.includes("SDI") && location_name != "Global") {
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

			// Footer
			let containerDiv = document.getElementById("heatmapDiv");
			let footer = document.createElement("p");
			let footer_text = document.createTextNode("2016, age-standardized, rate");
				footer.appendChild(footer_text);
				containerDiv.appendChild(footer);
			}
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
