$(function() {
	$.ajax({
		url:"./php/executeQuery.php", //the page containing php script
		type: "get", //request type
		datatype: 'json',
		data: {request_type:"ranking", causeName: cause_name, locationName: location_name}
	}).done(function (response) {
		var rows = JSON.parse(response);
		console.log(rows);

		// Title
		$('#rankTitle').text(`${cause_name} changes in 1990 vs 2016`);

		var rankData = [];
		for (let i = 0; i < rows.length; i += 2) {
			rankData.push({
				'measure': rows[i].measure,
				'1990': rows[i].rank,
				'2016': rows[i + 1].rank,
				'change': (((rows[i + 1].val - rows[i].val) / rows[i].val ) * 100).toFixed(2) + "%"
			});
		}
		
		var rankingsTable = tabulate(rankData, ["measure", "1990", "2016", "change"]);		
		rankingsTable.selectAll("thead th")
			.text(function(column) {
				return column.charAt(0).toUpperCase() + column.substr(1);
			});
		rankingsTable.selectAll("tbody tr")
			.sort(function(a, b) {
				return d3.descending(a.age, b.age);
			});
			
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