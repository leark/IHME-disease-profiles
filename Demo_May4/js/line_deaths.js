$(function() {

	lineDiagram("death_line", "#lineGraph", '#lineTitle', `How many people died from `, 
		'#fembar', "#femtext", '#mbar', "#mtext", '#sdifbar', "#sdiftext", "#sdimbar", "#sdimtext", 
		"Deaths per 100,000 people", "lineGraph", `Age-standardized mortality rate per 100,000, 1990-2016, ${location_name}`, "lineSave", "lineDiv");

});