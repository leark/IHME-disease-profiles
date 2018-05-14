$(function() {

	lineDiagram("yld_line", "#yldLineGraph", '#yld_lineTitle', `How much disability is caused by `,
		'#yld_fembar', "#yld_femtext", '#yld_mbar', "#yld_mtext", '#yld_sdifbar', "#yld_sdiftext", "#yld_sdimbar", "#yld_sdimtext",
		"YLDs per 100,000 people", "yldLineGraph", `Age-standardized years lived with disability (YLDs) rate per 100,000, 1990-2016, ${location_name}`, "yldLineSave", "yld_lineDiv");

});
