$(function() {
	causeToLowerCase = function(cause_name){
		var cause = cause_name;
		if (cause != "HIV/AIDS"){
			cause = cause.charAt(0).toLowerCase() + cause.slice(1);
		}
		return cause;
	}
});