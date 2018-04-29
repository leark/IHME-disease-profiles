$(function() {

	lineDiagram("yld_line", "#yld_lineDiv", '#yld_lineTitle', `How much disability is caused by ${cause_name}?`,
		'#yld_fembar', "#yld_femtext", '#yld_mbar', "#yld_mtext", '#yld_bothbar', "#yld_bothtext", "#yld_sdibar", "#yld_sditext",
		"YLDs per 100,000 people", "yld_lineDiv", "Years lived with disability, 1990-2016, age standardized, rate", "yldTable");

});
