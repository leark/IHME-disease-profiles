$(function() {
	$.ajax({
		url:"./php/executeQuery.php", //the page containing php script
		type: "get", //request type
		datatype: 'json',
		data: {request_type:"percent_rank", causeName: cause_name, locationName: location_name}
	}).done(function (response) {
		var rows = JSON.parse(response);

		iniSaveButton(`ranktableSave`, `ranktableDiv`);

		// Title
		$('#rankTitle').text(`Percent change of ${cause_name} from 1990 to 2016`);

		var rankData = [];
		for (let i = 0; i < rows.length; i += 2) {
			let improvement = 0;
			if (rows[i].rank > rows[i + 1].rank) {
				improvement = -1;
			} else if (rows[i].rank < rows[i + 1].rank) {
				improvement = 1;
			}
			rankData.push({
				'measure': rows[i].measure,
				'1990 ranking': rows[i].rank,
				'2016 ranking': rows[i + 1].rank,
				'% change 1990-2016': (((rows[i + 1].val - rows[i].val) / rows[i].val ) * 100).toFixed(2) + "%",
				'got better': improvement
			});

		}
		console.log(rankData);
		columns = ["measure", "1990 ranking", "2016 ranking", "% change 1990-2016"];
		var rankingsTable = tabulate(rankData, columns, "#ranktableGraph");
		rankingsTable.selectAll("thead th")
			.text(function(column) {
				return column.charAt(0).toUpperCase() + column.substr(1);
			});
		rankingsTable.selectAll("tbody tr")
			.sort(function(a, b) {
				return d3.descending(a.age, b.age);
			});

		// Footer
		var containerDiv = document.getElementById("ranktableGraph");
		var footer = document.createElement("p");
		var footer_text = document.createTextNode("Percent change, 1990-2016, all ages, rate");
		footer.appendChild(footer_text);
		containerDiv.appendChild(footer);

		document.getElementById(`ranktableSave`).style.display = "inherit";

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
				.style('font-weight', 'normal')
				.style('color', '#454545');

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
					if (isNaN(d.value)) {
							return "percent_label-cell";
					} else {
							if (d.value > 0) {
									return "percent_body-cell-positive";
							}
							return "percent_body-cell-negative";
					}
				}); // red #C2464F, blue #3B81A0
    return table;
}
