$(function() {
	lineDiagram = function(requestType, lineDiv, titleDiv, titleText, 
		fembar, femtext, mbar, mtext, bothbar, bothtext, sdibar, sditext, 
		yLabel, lineDivID, caption) {
		$.ajax({
			url:"./php/executeQuery.php", //the page containing php script
			type: "get", //request type
			dataType: 'json',
			data: {request_type: requestType, causeName: cause_name, locationName: location_name}
		}).done(function (msg) {
			//console.log(msg);
			
			var margins = {top: 30, bottom: 50, left: 60, right: 50};

			var width = 800 - margins.left - margins.right,
				height = 360 - margins.top - margins.bottom;
			var formattedData = [];
			
			if (msg.length == 81){
				for (var i = msg.length - 1; i >= 0; i = i - 3) {
					var singleYear = msg[i];
					formattedData.push(
						{
							"title":singleYear.measure,
							"year": singleYear.year,
							"metric": singleYear.metric,
							"female": parseFloat(msg[i-1].val),
							"male": parseFloat(msg[i-2].val),
							"both": parseFloat(singleYear.val)
						});
				}
			} else {
				for (var i = msg.length - 1; i >= 0; i = i - 6) {
					var singleYear = msg[i];
					formattedData.push(
						{
							"title":singleYear.measure,
							"year": singleYear.year,
							"metric": singleYear.metric,
							"female": parseFloat(msg[i-1].val),
							"male": parseFloat(msg[i-2].val),
							"both": parseFloat(singleYear.val),
							"sdi": parseFloat(msg[i-3].val)
						});
				}
			}
			
			// console.log(formattedData);
			
			// Set the ranges
			var x = d3.scale.linear().range([0, width]);
			var y = d3.scale.linear().range([height, 0]);

			// Define the axes
			var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.ticks(12)
				.tickFormat(d3.format("d"));		

			function y_axis() {
				return d3.svg.axis()
				.scale(y)
				.orient("left")
				.ticks(10);
			}
				
			// Define the both line
			var valueline = d3.svg.line()
				.x(function(d) { return x(d.year); })
				.y(function(d) { return y(d.both); });
				
			// Define the female line
			var valuelineF = d3.svg.line()
				.x(function(d) { return x(d.year); })
				.y(function(d) { return y(d.female); });
				
			// Define the male line
			var valuelineM = d3.svg.line()
				.x(function(d) { return x(d.year); })
				.y(function(d) { return y(d.male); });
				
			// Define the SDI average line
			if (typeof formattedData[0].sdi !== 'undefined') {
				var valuelineSDI = d3.svg.line()
					.x(function(d) { return x(d.year); })
					.y(function(d) { return y(d.sdi); });
			}
			
			// Adds the svg canvas					  
			var svg = d3.select(lineDiv)
				.data(formattedData)
			.append("svg")
				.attr("class", "line")
				.attr("width", width + margins.left + margins.right)
				.attr("height", height + margins.top + margins.bottom)
			.append("g")
				.attr("transform", "translate(" + margins.left + "," + margins.top + ")");

				// Scale the range of the data
				x.domain(d3.extent(formattedData, function(d) { return d.year; }));
				
				//need to rewrite this with better style
				var bdomain = d3.extent(formattedData, function(d) { return d.both; });
				var fdomain = d3.extent(formattedData, function(d) { return d.female; });
				var mdomain = d3.extent(formattedData, function(d) { return d.male; });
				var alldomain = bdomain
				alldomain.push(fdomain[0])
				alldomain.push(fdomain[1])
				alldomain.push(mdomain[0])
				alldomain.push(mdomain[1])
				if (typeof formattedData[0].sdi !== 'undefined') {
					var sdidomain = d3.extent(formattedData, function(d) { return d.sdi; });
					alldomain.push(sdidomain[0])
					alldomain.push(sdidomain[1])
				}
				// console.log(alldomain);
				var max = Math.max.apply(Math, alldomain);
				var min = Math.min.apply(Math, alldomain);
				// console.log(min);
				// console.log(max);
				y.domain([min - (.05 * min), max]);

				// Add the X Axis
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
					.call(xAxis);

				// Add the Y Axis
				svg.append("g")
					.attr("class", "y axis")
					.call(y_axis()
						.tickSize(-width, 0, 0)
					);
				
				// Add the valueline path for both 
				svg.append("path")
					.attr("class", "both")
					.attr("d", valueline(formattedData));
					
				// Add the valueline path for female 
				svg.append("path")
					.attr("class", "female")
					.attr("d", valuelineF(formattedData));
				
				// Add the valueline path for male 
				svg.append("path")
					.attr("class", "male")
					.attr("d", valuelineM(formattedData));				
					
				// Add the valueline path for SDI average
				if (typeof formattedData[0].sdi !== 'undefined') {
					svg.append("path")
						.attr("class", "sdi")
						.attr("d", valuelineSDI(formattedData));
				}
			//title
			$(titleDiv).text(titleText);
			
			//legend
			var female = d3.select(fembar)
				.append("svg")
					.attr("class", "female")
					.attr("width", "24px")
					.attr("height", "14px")
				.append("line")
					.attr("x1", "3px")
					.attr("x2", "21px")
					.attr("y1", "9px")
					.attr("y2", "9px")
			
			$(femtext).text("Females")
			
			var male = d3.select(mbar)
				.append("svg")
					.attr("class", "male")
					.attr("width", "24px")
					.attr("height", "14px")
				.append("line")
					.attr("x1", "3px")
					.attr("x2", "21px")
					.attr("y1", "9px")
					.attr("y2", "9px")
			
			$(mtext).text("Males")
			
			var both = d3.select(bothbar)
				.append("svg")
					.attr("class", "both")
					.attr("width", "24px")
					.attr("height", "14px")
				.append("line")
					.attr("x1", "3px")
					.attr("x2", "21px")
					.attr("y1", "9px")
					.attr("y2", "9px")
			
			$(bothtext).text("All")
			
			if (typeof formattedData[0].sdi !== 'undefined') {
				var sdi = d3.select(sdibar)
					.append("svg")
						.attr("class", "sdi")
						.attr("width", "24px")
						.attr("height", "14px")
					.append("line")
						.attr("x1", "3px")
						.attr("x2", "21px")
						.attr("y1", "9px")
						.attr("y2", "9px")
				
				$(sditext).text("SDI Average")
			}
		
			// text label for the x axis
			svg.append("text")
				.attr("transform",
					"translate(" + (width/2) + " ," + 
					(height + margins.bottom) + ")")
					.style("text-anchor", "middle")
				.text("Year");
			
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
});
