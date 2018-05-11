$(function() {

	lineDiagram("death_line", "#lineGraph", '#lineTitle', `How many people died from `, 
		'#fembar', "#femtext", '#mbar', "#mtext", '#sdifbar', "#sdiftext", "#sdimbar", "#sdimtext", 
		"Deaths per 100,000 people", "lineGraph", `Mortality, 1990-2016, age-standardized, rate, ${location_name}`, "lineSave", "lineDiv");

});