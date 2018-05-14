$(function() {
	$.ajax({
		url:"./php/executeQuery.php", //the page containing php script
		type: "get", //request type
		datatype: 'json',
		data: {request_type:"heat_rank", causeName: cause_name, locationName: location_name}
	}).done(function (response) {
		if (response != 0) {
			iniSaveButton(`heatmapSave`,`heatmapDiv`);

			let column_num = 4;
			if (!location_name.includes("SDI") && location_name != "Global") {
				var rows = JSON.parse(response);
				heatData = [];
				rows[column_num].location = "Comparison group mean (" + rows[column_num].location + ")";
				// normalize value to be greater than 0
				for (let i = 0; i < rows.length; i+= column_num) {
					heatData.push({
						'location': rows[i].location,
						'Deaths': Math.round(rows[i].val * 100) / 10,
						'DALYs': Math.round(rows[i + 1].val * 10 ) / 10,
						'YLDs': Math.round(rows[i + 2].val * 10 ) / 10,
						'YLLs': Math.round(rows[i + 3].val * 10 ) / 10
					});
				};

				// Title
				$('#heatTitle').text(`How do death and disability from ${cause_name} compare across similar SDI locations?`);

				column = ["location", "Deaths", "DALYs", "YLDs", "YLLs"];
				var heatmapTable = tabulateMap(heatData, column, "#heatmapGraph");
				heatmapTable.selectAll("thead th")
				.text(function(column) {
					return column;
				});
				heatmapTable.selectAll("tbody tr")
				.sort(function(a, b) {
					return d3.descending(a.age, b.age);
				});

				// Legend
				let benchmarkDiv = document.getElementById("benchmark-legend");

				let lower = document.createElement("div");
				lower.innerHTML = "Lower than mean";
				lower.className = "disease-profile legend";
				lower.setAttribute("id", "legend-item-lower-text");
				benchmarkDiv.appendChild(lower);

				let same = document.createElement("div");
				same.innerHTML = "Equal to mean";
				same.className = "disease-profile legend";
				same.setAttribute("id", "legend-item-same-text");
				benchmarkDiv.appendChild(same);

				let upper = document.createElement("div");
				upper.innerHTML = "Higher than mean";
				upper.className = "disease-profile legend";
				upper.setAttribute("id", "legend-item-upper-text");
				benchmarkDiv.appendChild(upper);

				// Footer
				let containerDiv = document.getElementById("heatmapDiv");
				let footer = document.createElement("p");
				footer.className = "footer";
				let footer_text = document.createTextNode(`Age-standardized rate per 100,000, 2016, ${location_name}`);
				footer.appendChild(footer_text);
				containerDiv.appendChild(footer);

				document.getElementById(`heatmapSave`).style.display = "inherit";

		} else {
			document.getElementById("heatmapDiv").style.display = "none";
		}
		};

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
