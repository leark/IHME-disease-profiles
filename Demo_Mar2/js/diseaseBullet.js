$(function() {

	$.ajax({
		url:"./php/search.php", //the page containing php script
		type: "get", //request type
		dataType: 'json',
		data: {causeName: cause_name, locationName: location_name}
	})
		.done(function (msg) {
			console.log(msg);

			let margins = {top: 30, bottom: 50, left: 60, right: 50};

			let width = 800 - margins.left - margins.right,
				height = 120 - margins.top - margins.bottom;
			
			let formattedData = [];

			let firstLow = Math.ceil(msg[msg.length - 3].lower),
				firstHigh = Math.ceil(msg[msg.length - 3].upper),
				firstVal = msg[msg.length - 3].val;

			// formatting table data to 
			for (let i = msg.length - 3; i >= 0; i = i - 3) {
				var singleYear = msg[i];
				console.log(singleYear.val);
				formattedData.push(
					{
						"title": Math.ceil(singleYear.val),
						"subtitle": singleYear.year,
						// "ranges":[Math.ceil(singleYear.lower), singleYear.val, Math.ceil(singleYear.upper)],
						"ranges":[Math.ceil(singleYear.lower), Math.ceil(singleYear.val), firstHigh * 1.5],
						"measures":[Math.ceil(singleYear.lower), Math.ceil(singleYear.upper)],
						// "measures":[firstLow, firstHigh],
						"markers":[singleYear.val]
					});
			}

			// let modData = [{"title":"Deaths","subtitle":"Numbers","ranges":[3, 7, 14],"measures":[5,10],"markers":[2]}];

			let bulletChart = d3.bullet()
				.width(width)
				.height(height);

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

	// 		let margins = {top: 30, bottom: 50, left: 70, right: 50};

	// 		let width = 510 - margins.left - margins.right,
	// 				height = 120 - margins.top - margins.bottom;
			
	// 		let formattedData2 = [];

	// 		for (let i = 0; i < msg.length; i++) {
	// 			let singleYear = msg[i];
	// 			formattedData2.push(
	// 				{
	// 					"title":"Deaths",
	// 					"subtitle": singleYear.year + "," + singleYear.sex,
	// 					"ranges":[Math.ceil(singleYear.lower), singleYear.val, Math.ceil(singleYear.upper)],
	// 					"measures":[singleYear.lower, singleYear.upper],
	// 					"markers":[singleYear.val]
	// 				});
	// 		}

	// 		// let modData = [{"title":"Deaths","subtitle":"Numbers","ranges":[3, 7, 14],"measures":[5,10],"markers":[2]}];

	// 		let bulletChart = d3.bullet()
	// 			.width(width)
	// 			.height(height);

	// 		let svg = d3.select("#bulletDiv2").selectAll("svg")
	// 			.data(formattedData2)
	// 		.enter().append("svg")
	// 			.attr("class", "bullet")
	// 			.attr("width", width + margins.left + margins.right)
	// 			.attr("height", height + margins.top + margins.bottom)
	// 		.append("g")
	// 			.attr("transform", "translate(" + margins.left + "," + margins.top + ")")
	// 			.call(bulletChart);

	// 		let title = svg.append("g")
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
	