$(function() {
	$.ajax({
		url:"./php/executeQuery.php", //the page containing php script
		type: "get", //request type
		datatype: 'json',
		data: {request_type:"percent_rank", causeName: cause_name, locationName: location_name}
	}).done(function (response) {
		var rows = JSON.parse(response);

		// Title
		$('#rankTitle').text(`${cause_name} percent change in 1990 vs 2016`);

		var rankData = [];
		for (let i = 0; i < rows.length; i += 2) {
			rankData.push({
				'measure': rows[i].measure,
				'1990 ranking': rows[i].rank,
				'2016 ranking': rows[i + 1].rank,
				'% change 1990-2016': (((rows[i + 1].val - rows[i].val) / rows[i].val ) * 100).toFixed(2) + "%"
			});
		}

		var rankingsTable = tabulate(rankData, ["measure", "1990 ranking", "2016 ranking", "% change 1990-2016"]);
		rankingsTable.selectAll("thead th")
			.text(function(column) {
				return column.charAt(0).toUpperCase() + column.substr(1);
			});
		rankingsTable.selectAll("tbody tr")
			.sort(function(a, b) {
				return d3.descending(a.age, b.age);
			});

		// Footer
		var containerDiv = document.getElementById("rankTableDiv");
		var footer = document.createElement("p");
		var footer_text = document.createTextNode("Percent change, 1990-2016, all ages, number");
		footer.appendChild(footer_text);
		containerDiv.appendChild(footer);

	}).fail(function (e) {
		console.log(e);
	});
});

function tabulate(data, columns) {
    var table = d3.select("#rankTableDiv").append("table"),
        thead = table.append("thead"),
        tbody = table.append("tbody");

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
            .text(function(column) { return column; });

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
            .text(function(d) { return d.value; });

    return table;
}
