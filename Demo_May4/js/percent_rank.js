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
				'1990 ranking': rows[i].rank,
				'2016 ranking': rows[i + 1].rank,
				'% change 1990-2016': value + "%",
			});

		}

		// console.log(rankData);
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
		var footer_text = document.createTextNode(`All ages rate per 100,000, percent change, 1990-2016, ${location_name}`);
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
