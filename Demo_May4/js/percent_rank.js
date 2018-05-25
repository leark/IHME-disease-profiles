$(function() {
	$.ajax({
		url:"./php/executeQuery.php", //the page containing php script
		type: "get", //request type
		datatype: 'json',
		data: {request_type:"percent_rank", causeName: cause_name, locationName: location_name}
	}).done(function (response) {
		if (response.length != 0) {
			console.log(response.length);
			var rows = JSON.parse(response);

			iniSaveButton(`ranktableSave`, `ranktableDiv`);

			// Title
			$('#rankTitle').text(`Percent change of ${cause_name} from 1990 to 2016`);

			var rankData = [];
			for (let i = 0; i < rows.length; i += 2) {
				// let the phrase come before the acronym
				if (rows[i].measure.includes("DALYs")) {
					rows[i].measure = "Disability-Adjusted Life Years (DALYs)"
				} else if (rows[i].measure.includes("YLDs")) {
					rows[i].measure = "Years Lived with Disability (YLDs)"
				}
				let value = ((rows[i + 1].val - rows[i].val) / rows[i].val  * 100).toFixed(2);
				if (value > 0)
					value = "+" + value;
				rankData.push({
					'measure': rows[i].measure,
					'1990 global ranking': rows[i].rank,
					'2016 global ranking': rows[i + 1].rank,
					'1990 value': parseFloat(rows[i].val).toFixed(2),
					'2016 value': parseFloat(rows[i + 1].val).toFixed(2),
					'measure % change 1990-2016': value + "%",
				});

			}

			columns = ["measure", "1990 global ranking", "1990 value", "2016 global ranking", "2016 value", "measure % change 1990-2016"];
			var rankingsTable = tabulate(rankData, columns, "#ranktableGraph");
			rankingsTable.selectAll("thead th")
			.text(function(column) {
				return column.charAt(0).toUpperCase() + column.substr(1);
			});
			rankingsTable.selectAll("tbody tr")
			.sort(function(a, b) {
				return d3.descending(a.age, b.age);
			});

			// legend
			let rankDiv = document.getElementById("rank-legend");

			let lower = document.createElement("div");
			lower.innerHTML = "Percent rate in value has decreased";
			lower.className = "disease-profile legend";
			lower.setAttribute("id", "legend-item-lower-text");
			rankDiv.appendChild(lower);

			let upper = document.createElement("div");
			upper.innerHTML = "Percent rate in value has increased";
			upper.className = "disease-profile legend";
			upper.setAttribute("id", "legend-item-upper-text");
			rankDiv.appendChild(upper);

			// Footer
			let containerDiv = document.getElementById("ranktableDiv");
			let footer = document.createElement("p");
			footer.className = "footer";
			let footer_text = document.createTextNode("All ages rate per 100,000, percent change, 1990-2016, " + location_name + " - ranked where 1 is most affected country and 195 is least affected");
			footer.appendChild(footer_text);
			containerDiv.appendChild(footer);

			document.getElementById(`ranktableSave`).style.display = "inherit";

		} else {
			document.getElementById("ranktableDiv").style.display = "none";
		}

	}).fail(function (e) {
		console.log(e);
	});
});

function tabulate(data, columns, table) {
    var table = d3.select(table).append("table"),
        thead = table.append("thead"),
        tbody = table.append("tbody");

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
            .text(function(column) { return column; })
				.attr('id', 'percent-header');

    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append("td")
        .text(function(d) { return d.value; })
				.attr('id', function(d) {
					if (d.column.includes("%")) {
							let value = (d.value.substring(0, d.value.length - 1));
							if (value > 0) {
									return "percent_body-cell-positive";
							}
							return "percent_body-cell-negative";
					}
					return "percent_label-cell";
				});
    return table;
}
