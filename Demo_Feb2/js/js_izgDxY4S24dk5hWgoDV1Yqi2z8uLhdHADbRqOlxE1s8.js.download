jQuery(document).ready(function($) {
	$('.accordian-items').each(function(index) {
		$(this).hide();
	});
	$('.related-accordian:first .accordian-group:first h4').addClass("expanded");
	$('.related-accordian:first .accordian-group:first .accordian-items').show(); // set .related-accordian class in theme template.php

	$('.accordian-group h4').click(function() {
		$(this).toggleClass('expanded');
		$(this).next('.accordian-items').slideToggle('fast');
	});
});;
