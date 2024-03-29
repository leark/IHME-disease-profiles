$(function() {
	barChart = function(requestType, lineDiv, titleDiv, titleText,
		xLabel, lineDivID, buttonID, caption) {
		$.ajax({
			url:"./php/executeQuery.php", //the page containing php script
			type: "get", //request type
			dataType: 'json',
			data: {request_type: requestType, causeName: cause_name, locationName: location_name}
		}).done(function (msg) {
			cause_name = causeToLowerCase(cause_name);

			var margins = {top: 30, bottom: 50, left: 250, right: 50};
			var formattedData = [];

			for (var i = msg.length - 1; i >=0 ; i = i - 1) {
				var singleYear = msg[i];
				formattedData.push(
					{
						"title":singleYear.measure,
						"year": singleYear.year,
						"metric": singleYear.metric,
						"risk": singleYear.rei,
						"value": parseFloat(singleYear.val)
					});
			}

			// console.log(formattedData);

			if (formattedData.length != 0){

				var width = 800 - margins.left - margins.right,
					height = Math.min((100 + (formattedData.length * 100)), 460) - margins.top - margins.bottom;

				// Set the ranges
				var x = d3.scale.linear().range([0, width]);
				var y = d3.scale.ordinal().rangeRoundBands([height, 0], .1);

				// Define the axes
				var xAxis = d3.svg.axis()
					.scale(x)
					.orient("bottom")
					.ticks(8);

				var yAxis = d3.svg.axis()
					.scale(y)
					.orient("left")
					.tickSize(0);

				// Define the both line
				//var valueline = d3.svg.line()
					//.x(function(d) { return x(d.year); })
					//.y(function(d) { return y(d.both); });

				// Adds the svg canvas
				var svg = d3.select(lineDiv)
					//.data(formattedData)
				.append("svg")
					.attr("class", "risks")
					.attr("width", width + margins.left + margins.right)
					.attr("height", height + margins.top + margins.bottom)
				.append("g")
					.attr("transform", "translate(" + margins.left + "," + margins.top + ")");

					// Scale the range of the data
					xmax = d3.max(formattedData, function(d) { return d.value; });
					x.domain([0, xmax + (.1 * xmax)]);
					y.domain(formattedData.map(function(d) { return d.risk; }));

					// Add the X Axis
					svg.append("g")
						.attr("class", "x axis")
						.attr("transform", "translate(0," + height + ")")
						.call(xAxis)
						//.selectAll("text")
							//.style("text-anchor", "end")
							//.attr("dx", "-.8em")
							//.attr("dy", ".15em")

					// Add the Y Axis
					svg.append("g")
						.attr("class", "y axis")
						.call(yAxis);

					// Add the valueline path for both
					//svg.append("path")
						//.attr("class", "both")
						//.attr("d", valueline(formattedData));

				var bars = svg.selectAll(".bar")
					.data(formattedData)
					.enter()
					.append("g")

				if (formattedData.length <= 3){
					bars.append("rect")
						  .attr("class", "bar")
						  .style("fill", "rgb(149, 198, 132)")
						  //.attr("x", function(d) { return x(d.risk); })
						  //.attr("width", x.rangeBand())
						  .attr("y", function(d, i) { return y(d.risk) + (y.rangeBand() - 80)/2 ;})
						  .attr("height", 80)
						  .attr("x", 0)
						  .attr("width", function(d) { return x(d.value); });
				}

				else{
					bars.append("rect")
						  .attr("class", "bar")
						  .style("fill", "rgb(149, 198, 132)")
						  .attr("y", function(d) { return y(d.risk); })
						  .attr("height", y.rangeBand())
						  //.attr("x", function(d, i) { return x(d.risk) + (x.rangeBand() - 100)/2 ;})
						  //.attr("width", Math.min(x.rangeBand(), 100))
						  .attr("x", 0)
						  .attr("width", function(d) { return x(d.value); });
				}

				bars.append("text")
					.attr("class", "slope-label")
					//y position of the label is halfway down the bar
					.attr("y", function (d) {
						return y(d.risk) + y.rangeBand() / 2 + 4;
					})
					//x position is 3 pixels to the right of the bar
					.attr("x", function (d) {
						return x(d.value) + 3;
					})
					.text(function (d) {
						return (Math.round(d.value * 10) / 10).toFixed(1);
					});

				//title
				$(titleDiv).text(`${titleText} ${cause_name}?`);

				// text label for the x axis
				svg.append("text")
					.attr("transform",
						"translate(" + (width/2) + " ," +
						(height + margins.bottom - 6) + ")")
					.style("text-anchor", "middle")
					.text(xLabel);

				// text label for the y axis
				/*svg.append("text")
					  .attr("transform", "rotate(-90)")
					  .attr("y", 0 - margins.left)
					  .attr("x",0 - (height / 2))
					  .attr("dy", "1em")
					  .style("text-anchor", "middle")
					  .text("Risks");    */

				// Footer
				var containerDiv = document.getElementById(lineDivID);
				var footer = document.createElement("p");
				var footer_text = document.createTextNode(caption);
				footer.appendChild(footer_text);
				containerDiv.appendChild(footer);
				
				//save as image
				iniSaveButton(buttonID, lineDivID, `${cause_name}_${location_name}_risks`);
			}
			//no data
			else {
				document.getElementById(lineDivID).style.display = "none";
			}
		}).fail(function (error) {
			console.log(error);
		});
	}

	barChart("risks", "#risksDiv", "#risksTitle", `What risk factors drive death and disability combined for`,
		"DALYs per 100,000 people", "risksDiv", "risksSave", `All ages disability-adjusted life years (DALYs) rate per 100,000, 2016, ${location_name}`);
});
