$(function() {
	lineDiagram = function(requestType, lineDiv, titleDiv, titleText,
		fembar, femtext, mbar, mtext, sdifbar, sdiftext, sdimbar, sdimtext,
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
			
			// input location is an SDI or global
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
			// input location is a country 
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
							"sdi": parseFloat(msg[i-3].val),
							"sdiFemale": parseFloat(msg[i-4].val),
							"sdiMale": parseFloat(msg[i-5].val)
						});
				}
			}

			console.log(formattedData);

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

			// Define the female line
			var valuelineF = d3.svg.line()
				.x(function(d) { return x(d.year); })
				.y(function(d) { return y(d.female); });

			// Define the male line
			var valuelineM = d3.svg.line()
				.x(function(d) { return x(d.year); })
				.y(function(d) { return y(d.male); });

			// Define the SDI average lines
			if (typeof formattedData[0].sdi !== 'undefined') {
				var sdifline = d3.svg.line()
					.x(function(d) { return x(d.year); })
					.y(function(d) { return y(d.sdiFemale); });
					
				var sdimline = d3.svg.line()
					.x(function(d) { return x(d.year); })
					.y(function(d) { return y(d.sdiMale); });	
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
				var domain = d3.extent(formattedData, function(d) { return d.female; });
				var mdomain = d3.extent(formattedData, function(d) { return d.male; });
				domain.push(mdomain[0])
				domain.push(mdomain[1])
				if (typeof formattedData[0].sdi !== 'undefined') {
					var sdifdomain = d3.extent(formattedData, function(d) { return d.sdiFemale; });
					domain.push(sdifdomain[0])
					domain.push(sdifdomain[1])
					var sdimdomain = d3.extent(formattedData, function(d) { return d.sdiMale; });
					domain.push(sdimdomain[0])
					domain.push(sdimdomain[1])
				}
				// console.log(domain);
				var max = Math.max.apply(Math, domain);
				var min = Math.min.apply(Math, domain);
				
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
						.attr("class", "sdi female")
						.attr("d", sdifline(formattedData));
					
					svg.append("path")
						.attr("class", "sdi male")
						.attr("d", sdimline(formattedData));
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

			if (typeof formattedData[0].sdi !== 'undefined') {
				var sdif = d3.select(sdifbar)
					.append("svg")
						.attr("class", "sdi female")
						.attr("width", "24px")
						.attr("height", "14px")
					.append("line")
						.attr("x1", "3px")
						.attr("x2", "21px")
						.attr("y1", "9px")
						.attr("y2", "9px")

				$(sdiftext).text("SDI average, females")
				
				var sdim = d3.select(sdimbar)
					.append("svg")
						.attr("class", "sdi male")
						.attr("width", "24px")
						.attr("height", "14px")
					.append("line")
						.attr("x1", "3px")
						.attr("x2", "21px")
						.attr("y1", "9px")
						.attr("y2", "9px")

				$(sdimtext).text("SDI average, males")
			}

			// text label for the x axis
			svg.append("text")
				.attr("transform",
					"translate(" + (width/2) + " ," +
					(height + margins.bottom - 6) + ")")
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
			
			// Values table
			var containerDiv = document.getElementById(lineDivID);
						
			var table = document.createElement("table");
			
			var tableHeader = table.createTHead();
			
			var row = tableHeader.insertRow(0);
			row.insertCell(0);
			
			var countryCell = row.insertCell(1)
			countryCell.innerHTML = location_name;
			countryCell.colSpan = "2";
			
			if (typeof formattedData[0].sdi !== 'undefined') {
				var SDICell = row.insertCell(2);
				SDICell.innerHTML = "SDI Average";
				SDICell.colSpan = "2";
			}
			
			row = tableHeader.insertRow(1);
			row.insertCell(0);
			row.insertCell(1).innerHTML = "1990";
			row.insertCell(2).innerHTML = "2016";
			if (typeof formattedData[0].sdi !== 'undefined') {
				row.insertCell(3).innerHTML = "1990";
				row.insertCell(4).innerHTML = "2016";
			}
			
			var tableBody = table.createTBody();
			
			row = tableBody.insertRow(0);
			row.className = "female";
			row.insertCell(0).innerHTML = "Females";
			row.insertCell(1).innerHTML = (Math.round(formattedData[0].female * 10) / 10).toFixed(1);
			row.insertCell(2).innerHTML = (Math.round(formattedData[formattedData.length - 1].female * 10) / 10).toFixed(1);
			if (typeof formattedData[0].sdi !== 'undefined') {
				row.insertCell(3).innerHTML = (Math.round(formattedData[0].sdiFemale * 10) / 10).toFixed(1);
				row.insertCell(4).innerHTML = (Math.round(formattedData[formattedData.length - 1].sdiFemale * 10) / 10).toFixed(1);
			}
			
			row = tableBody.insertRow(1);
			row.className = "male";
			row.insertCell(0).innerHTML = "Males";
			row.insertCell(1).innerHTML = (Math.round(formattedData[0].male * 10) / 10).toFixed(1);
			row.insertCell(2).innerHTML = (Math.round(formattedData[formattedData.length - 1].male * 10) / 10).toFixed(1);
			if (typeof formattedData[0].sdi !== 'undefined') {
				row.insertCell(3).innerHTML = (Math.round(formattedData[0].sdiMale * 10) / 10).toFixed(1);
				row.insertCell(4).innerHTML = (Math.round(formattedData[formattedData.length - 1].sdiMale * 10) / 10).toFixed(1);
			}
			
			row = tableBody.insertRow(2);
			row.className = "all";
			row.insertCell(0).innerHTML = "All";
			row.insertCell(1).innerHTML = (Math.round(formattedData[0].both * 10) / 10).toFixed(1);
			row.insertCell(2).innerHTML = (Math.round(formattedData[formattedData.length - 1].both * 10) / 10).toFixed(1);
			if (typeof formattedData[0].sdi !== 'undefined') {
				row.insertCell(3).innerHTML = (Math.round(formattedData[0].sdi * 10) / 10).toFixed(1);
				row.insertCell(4).innerHTML = (Math.round(formattedData[formattedData.length - 1].sdi * 10) / 10).toFixed(1);
			}
			
			containerDiv.appendChild(table);
			
			// Footer
			var footer = document.createElement("p");
			var footer_text = document.createTextNode(caption);
			footer.appendChild(footer_text);
			containerDiv.appendChild(footer);

		}).fail(function (error) {
			console.log(error);
		});
	}
});
