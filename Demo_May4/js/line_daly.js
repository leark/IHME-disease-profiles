$(function() {

	lineDiagram("daly_line", "#daly_lineDiv", '#daly_lineTitle', `How much death and disability is caused by ${cause_name}?`,
		'#daly_fembar', "#daly_femtext", '#daly_mbar', "#daly_mtext", '#daly_bothbar', "#daly_bothtext", "#daly_sdibar", "#daly_sditext",
		"DALYs per 100,000 people", "daly_lineDiv", "Disability-adjusted life years, 1990-2016, age standardized, rate", "dalyTable");

});
