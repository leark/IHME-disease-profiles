$(function() {

	lineDiagram("yld_line", "#yld_lineDiv", '#yld_lineTitle', `How much disability is caused by ${cause_name}?`,
		'#yld_fembar', "#yld_femtext", '#yld_mbar', "#yld_mtext", '#yld_sdifbar', "#yld_sdiftext", "#yld_sdimbar", "#yld_sdimtext",
		"YLDs per 100,000 people", "yld_lineDiv", "Years lived with disability, 1990-2016, age standardized, rate");

});
