$(function() {

	lineDiagram("death_line", "#lineDiv", '#lineTitle', `How many people died from `, 
		'#fembar', "#femtext", '#mbar', "#mtext", '#sdifbar', "#sdiftext", "#sdimbar", "#sdimtext", 
		"Deaths per 100,000 people", "lineDiv", `Mortality, 1990-2016, age-standardized, rate, ${location_name}`);

});