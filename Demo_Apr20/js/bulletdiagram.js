$(function() {
	$.ajax({
		url:"./php/executeQuery.php", //the page containing php script
		type: "get", //request type
		dataType: 'json',
		data: {request_type: "bullet", causeName: cause_name, locationName: location_name}
	}).done(function (msg) {
		// console.log(msg);

		let margins = {top: 30, bottom: 50, left: 60, right: 50};

		let width = 800 - margins.left - margins.right,
			height = 120 - margins.top - margins.bottom;
		
		let formattedData = [];

		let firstLow = msg[msg.length - 1].lower,
			firstHigh = msg[msg.length - 1].upper,
			firstVal = msg[msg.length - 1].val;

		// formatting table data
		for (let i = msg.length - 1; i >= 0; i = i - 3) {
			var singleYear = msg[i];
			{
				formattedData.push(
					{
						"title": singleYear.year,
						"subtitle": singleYear.metric,
						// "ranges":[Math.ceil(singleYear.lower), singleYear.val, Math.ceil(singleYear.upper)],
						"ranges":[singleYear.lower, singleYear.val, firstHigh * 1.5],
						"measures":[singleYear.lower, singleYear.upper],
						// "measures":[firstLow, firstHigh],
						"markers":[singleYear.val]
					});
			}
		}
		console.log(formattedData);
		
		// let modData = [{"title":"Deaths","subtitle":"Numbers","ranges":[3, 7, 14],"measures":[5,10],"markers":[2]}];
			
		let bulletChart = d3.bullet()
			.width(width)
			.height(height);

		// Title
		$('#bulletTitle').text(`Mortality rate in years 1996, 2006, 2016`);	
		
		let svg = d3.select("#bulletDiv").selectAll("svg")
			.data(formattedData)
		.enter().append("svg")
			.attr("class", "bullet")
			.attr("width", width + margins.left + margins.right)
			.attr("height", height + margins.top + margins.bottom)
		.append("g")
			.attr("transform", "translate(" + margins.left + "," + margins.top + ")")
			.call(bulletChart);

		let title = svg.append("g")
		  .style("text-anchor", "end")
		  .attr("transform", "translate(-6," + height / 2 + ")");

		title.append("text")
		  .attr("class", "title")
		  .text(function(d) { return d.title; });

		title.append("text")
		  .attr("class", "subtitle")
		  .attr("dy", "1em")
		  .text(function(d) { return d.subtitle; });

		// svg.append("text")
		//   .attr("x", (width / 2))             
		//   .attr("y", 0 - (margins.top / 2))
		//   .attr("text-anchor", "middle")  
		//   .style("font-size", "16px")  
		//   .text(`Deaths from ${cause_name}`);
	
	}).fail(function (error) {
		console.log(error);
	});
});
	