function create() {
	var cause_name = $("#causeName").val();
	var location_name = $("#locationName").val();
	
	var data = null;
	
	$.ajax({
		url:"search.php", //the page containing php script
		type: "get", //request type
		dataType: 'json',
		data: {causeName: cause_name, locationName: location_name},
		success: function(req){
			//console.log(req);
			data = req[0];
		},
		complete: function(){
			console.log(data);
			/*var svg = d3.select("body").append("svg").append("rect")
				.attr("width", 600)
				.attr("height", 600)
				.style("fill", "blue")*/
			var svg = d3.select("svg");
			
			/*
			var x = d3.scaleOrdinal().range([0, 500])
				.domain(data.location_name);
			
			var y = d3.scaleLinear()
				.range([500, 0])
				.domain([0, data.val]);
				
			
			var rects = svg.selectAll('rect')
				.data(data);
				
			var newRects = rects.enter();
			
			newRects.append('rect')
				.attr('y', y(0))
				.attr('x', x(data.val))
				.attr('width', 200)
				.attr('height', data.val);
			
			*/
			
			var width = 420,
				barHeight = 20;
				
			var x = d3.scale.linear()
				.domain([0, data.val])
				.range([0, width]);
				
			//alert(data.val)
			
			var chart = d3.select(".chart")
				.attr("width", width)
				.attr("height", barHeight * 3 );
				
			var bar = chart.selectAll("g")
				.data(data)
				.enter().append("g")
			
			bar.append("rect")
				.attr("width", x)
				.attr("height", barHeight - 1)
				.style("fill", "blue");

		}

	});
	
	
}