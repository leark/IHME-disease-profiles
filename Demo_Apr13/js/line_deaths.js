$(function() {

	lineDiagram("death_line", "#lineDiv", '#lineTitle', `How many people died from ${cause_name}?`, 
		'#fembar', "#femtext", '#mbar', "#mtext", '#bothbar', "#bothtext", 
		"Deaths per 100,000 people", "lineDiv", "Morality rate, 1990-2016, all ages, rate");

});