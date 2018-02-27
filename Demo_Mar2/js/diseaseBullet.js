$(function() {

	$.ajax({
		url:"./php/search.php", //the page containing php script
		type: "get", //request type
		dataType: 'json',
		data: {causeName: cause_name, locationName: location_name}
	})
		.done(function (msg) {
			console.log(msg);

			var margins = {top: 30, bottom: 50, left: 60, right: 50};

			var width = 500 - margins.left - margins.right,
				height = 120 - margins.top - margins.bottom;
			
			var formattedData = [];

			var firstLow = Math.ceil(msg[msg.length - 1].lower),
				firstHigh = Math.ceil(msg[msg.length - 1].upper);

			for (var i = msg.length - 1; i >= 0; i = i - 3) {
				var singleYear = msg[i];
				console.log(singleYear.val);
				formattedData.push(
					{
						"title":"Deaths",
						"subtitle": singleYear.year,
						"ranges":[Math.ceil(singleYear.lower), singleYear.val, Math.ceil(singleYear.upper)],
						// "ranges":[firstLow, singleYear.val, firstHigh],
						// "measures":[Math.ceil(singleYear.lower), Math.ceil(singleYear.upper)],
						"measures":[firstLow, firstHigh],
						"markers":[singleYear.val]
					});
			}

			// var modData = [{"title":"Deaths","subtitle":"Numbers","ranges":[3, 7, 14],"measures":[5,10],"markers":[2]}];

			var bulletChart = d3.bullet()
				.width(width)
				.height(height);

			var svg = d3.select("#bulletDiv").selectAll("svg")
				.data(formattedData)
			.enter().append("svg")
				.attr("class", "bullet")
				.attr("width", width + margins.left + margins.right)
				.attr("height", height + margins.top + margins.bottom)
			.append("g")
				.attr("transform", "translate(" + margins.left + "," + margins.top + ")")
				.call(bulletChart);

			var title = svg.append("g")
			  .style("text-anchor", "end")
			  .attr("transform", "translate(-6," + height / 2 + ")");

			title.append("text")
			  .attr("class", "title")
			  .text(function(d) { return d.title; });

			title.append("text")
			  .attr("class", "subtitle")
			  .attr("dy", "1em")
			  .text(function(d) { return d.subtitle; });
		
			})
		.fail(function (error) {
				console.log(error);
	});

	// $.ajax({
	// 	url:"./php/allRows.php", //the page containing php script
	// 	type: "get", //request type
	// 	dataType: 'json',
	// 	data: {causeName: cause_name, locationName: location_name}
	// })
	// 	.done(function (msg) {
	// 		console.log(msg);

	// 		var margins = {top: 30, bottom: 50, left: 70, right: 50};

	// 		var width = 510 - margins.left - margins.right,
	// 				height = 120 - margins.top - margins.bottom;
			
	// 		var formattedData2 = [];

	// 		for (var i = 0; i < msg.length; i++) {
	// 			var singleYear = msg[i];
	// 			formattedData2.push(
	// 				{
	// 					"title":"Deaths",
	// 					"subtitle": singleYear.year + "," + singleYear.sex,
	// 					"ranges":[Math.ceil(singleYear.lower), singleYear.val, Math.ceil(singleYear.upper)],
	// 					"measures":[singleYear.lower, singleYear.upper],
	// 					"markers":[singleYear.val]
	// 				});
	// 		}

	// 		// var modData = [{"title":"Deaths","subtitle":"Numbers","ranges":[3, 7, 14],"measures":[5,10],"markers":[2]}];

	// 		var bulletChart = d3.bullet()
	// 			.width(width)
	// 			.height(height);

	// 		var svg = d3.select("#bulletDiv2").selectAll("svg")
	// 			.data(formattedData2)
	// 		.enter().append("svg")
	// 			.attr("class", "bullet")
	// 			.attr("width", width + margins.left + margins.right)
	// 			.attr("height", height + margins.top + margins.bottom)
	// 		.append("g")
	// 			.attr("transform", "translate(" + margins.left + "," + margins.top + ")")
	// 			.call(bulletChart);

	// 		var title = svg.append("g")
	// 		  .style("text-anchor", "end")
	// 		  .attr("transform", "translate(-6," + height / 2 + ")");

	// 		title.append("text")
	// 		  .attr("class", "title")
	// 		  .text(function(d) { return d.title; });

	// 		title.append("text")
	// 		  .attr("class", "subtitle")
	// 		  .attr("dy", "1em")
	// 		  .text(function(d) { return d.subtitle; });
		
	// 		})
	// 	.fail(function (error) {
	// 			console.log(error);
	// });
});
	