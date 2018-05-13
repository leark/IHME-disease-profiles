$(function() {

	lineDiagram("daly_line", "#dalyLineGraph", '#daly_lineTitle', `How much death and disability is caused by `,
		'#daly_fembar', "#daly_femtext", '#daly_mbar', "#daly_mtext", '#daly_sdifbar', "#daly_sdiftext", "#daly_sdimbar", "#daly_sdimtext",
		"DALYs per 100,000 people", "dalyLineGraph", `Age-standardized disability-adjusted life years (DALYs) rate per 100,000, 1990-2016, ${location_name}`, "dalyLineSave", "daly_lineDiv");

});
