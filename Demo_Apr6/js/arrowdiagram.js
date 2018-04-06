$(function() {
	$.ajax({
		url:"./php/executeQuery.php", //the page containing php script
		type: "get", //request type
		datatype: 'json',
		data: {request_type:"arrow_ranking", causeName: cause_name, locationName: location_name}
	}).done(function (response) {
		var rows = JSON.parse(response);
		
		let old_rank = [], 
			new_rank = [], 
			old_cause = [], 
			new_cause = [];
			
		for (let i = 0; i < rows.length; i++) {
			if (rows[i].year === "1990") {
				old_rank.push(i);
				old_cause.push(rows[i].cause + " " + rows[i].rank);
			} else {
				new_rank.push(i);
				new_cause.push(rows[i].rank + " " + rows[i].cause);
			}
		}
		
		var data = {
			"data":[old_rank, new_rank],
			"label":[old_cause, new_cause]
		};
		console.log(data);
		
		var slopeGraph = d3.custom.slopegraph();
		d3.select('#arrowdiagramDiv')
			.datum(data)
			.call(slopeGraph);
			
	}).fail(function (e) { 
		console.log(e);
	});
});
	
d3.custom = {};
d3.custom.slopegraph = function() {

    var opts = {
        width: 700,
        height: 400,
        margin: {top: 30, right: 100, bottom: 60, left: 100},
        labelLength: 400
    };

    function exports(selection) {
        selection.each(function (dataset) {
            var chartHeight = opts.height - opts.margin.top - opts.margin.bottom;
            var chartWidth = opts.width - opts.margin.right - opts.margin.left;

            var parent = d3.select(this);
            var svg = parent.selectAll("svg.chart-root").data([0]);
            svg.enter().append("svg").attr("class", "chart-root")
                    .append('g').attr('class', 'chart-group');
            svg.attr({width: opts.width, height: 300});
            svg.exit().remove();
				
			// Title
            $('#arrowTitle').text(`${cause_name} Ranking in 1990 vs 2016`);

            var chartSvg = svg.select('.chart-group');
            var data = d3.transpose(dataset.data);
            var scale = d3.scale.linear().domain(d3.extent(d3.merge(data))).range([0, chartHeight]);

			// // slope line (don't know how to add this...)
            // var lines = chartSvg.selectAll('line.slope-line')
                // .data(data);
            // lines.enter().append("line")
            // lines.attr({
                    // class: 'slope-line',
                    // x1: opts.margin.left + opts.labelLength,
                    // x2: opts.width - opts.margin.right - opts.labelLength,
                    // y1: function(d) { return opts.margin.top + scale(d[0]); },
                    // y2: function(d) { return opts.margin.top + scale(d[1]); }});
            // lines.exit().remove();

			// left labels (1st row of causes)
            var leftLabels = chartSvg.selectAll('text.left_labels')
                .data(data);
            leftLabels.enter().append('text');
            leftLabels.attr({
                    class: 'left_labels slope-label',
                    x: opts.margin.left + opts.labelLength - 100,
                    y: function(d,i) { return opts.margin.top + scale(d[0]); },
                    dy: '.35em', 'text-anchor': 'end'})
                .text(function(d,i) { return dataset.label[0][i] });
            leftLabels.exit().remove();

			// right labels (2nd row of causes)
            var rightLabels = chartSvg.selectAll('text.right_labels')
                .data(data);
            rightLabels.enter().append('text');
            rightLabels.attr({
                    class: 'right_labels slope-label',
                    x: opts.width + opts.margin.right - opts.labelLength + 50,
                    y: function(d,i) { return opts.margin.top + scale(d[0]); },
                    dy: '.35em'})
                .text(function(d,i) { return dataset.label[1][i] });
            rightLabels.exit().remove();
        });
    }

    exports.opts = opts;
    createAccessors(exports);

    return exports;
}


createAccessors = function(visExport) {
    for (var n in visExport.opts) {
        if (!visExport.opts.hasOwnProperty(n)) continue;
        visExport[n] = (function(n) {
            return function(v) {
                return arguments.length ? (visExport.opts[n] = v, this) : visExport.opts[n];
            }
        })(n);
    }
};	
	