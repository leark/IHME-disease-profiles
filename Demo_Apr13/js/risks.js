$(function() {
	
	barChart = function(requestType, lineDiv, titleDiv, titleText, 
		yLabel, lineDivID, caption) {
		$.ajax({
			url:"./php/executeQuery.php", //the page containing php script
			type: "get", //request type
			dataType: 'json',
			data: {request_type: requestType, causeName: cause_name, locationName: location_name}
		}).done(function (msg) {
			//console.log(msg);
			
			var margins = {top: 30, bottom: 200, left: 60, right: 50};

			var width = 800 - margins.left - margins.right,
				height = 460 - margins.top - margins.bottom;
			var formattedData = [];
			
			for (var i = 0; i <= msg.length - 1; i = i + 1) {
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
			
			console.log(formattedData);
			
			// Set the ranges
			var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
			var y = d3.scale.linear().range([height, 0]);

			// Define the axes
			var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom");		

			function y_axis() {
				return d3.svg.axis()
				.scale(y)
				.orient("left")
				.ticks(10);
			}
				
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
				x.domain(formattedData.map(function(d) { return d.risk; }));
				y.domain([0, d3.max(formattedData, function(d) { return d.value; })]);

				// Add the X Axis
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
					.call(xAxis)
					.selectAll("text")	
						.style("text-anchor", "end")
						.attr("dx", "-.8em")
						.attr("dy", ".15em")
						.attr("transform", function(d) {
							return "rotate(-65)" 
							});

				// Add the Y Axis
				svg.append("g")
					.attr("class", "y axis")
					.call(y_axis()
						.tickSize(-width, 0, 0)
					);
				
				// Add the valueline path for both 
				//svg.append("path")
					//.attr("class", "both")
					//.attr("d", valueline(formattedData));
				
			svg.selectAll(".bar")
				.data(formattedData)
			  .enter().append("rect")
				  .attr("class", "bar")
				  .style("fill", "steelblue")
				  .attr("x", function(d) { return x(d.risk); })
				  .attr("width", x.rangeBand())
				  .attr("y", function(d) { return y(d.value); })
				  .attr("height", function(d) { return height - y(d.value); });


			//title
			$(titleDiv).text(titleText);
		
			// text label for the x axis
			svg.append("text")
				.attr("transform",
					"translate(" + (width/2) + " ," + 
					(height + margins.bottom) + ")")
					.style("text-anchor", "middle")
				.text("Risks");
			
			// text label for the y axis	
			svg.append("text")
				  .attr("transform", "rotate(-90)")
				  .attr("y", 0 - margins.left)
				  .attr("x",0 - (height / 2))
				  .attr("dy", "1em")
				  .style("text-anchor", "middle")
				  .text(yLabel);      

			// Footer
			var containerDiv = document.getElementById(lineDivID);
			var footer = document.createElement("p");
			var footer_text = document.createTextNode(caption);
			footer.appendChild(footer_text);
			containerDiv.appendChild(footer);			  
				  
		}).fail(function (error) {
			console.log(error);
		});
	}
	
	barChart("risks", "#risksDiv", "#risksTitle", `What are the risk factors for ${cause_name}?`, 
		"DALYs per 100,000 people", "risksDiv", "Disability-adjusted life years, 2016, all ages, rate");
});