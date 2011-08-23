
// Global variables
Q.variables = {};

Q.log = function(msg){
	console.log(msg);
}

$(document).ready(function(){
	
	Q.log("Startup");
	
	// Init the controller
	Q.Controller.init();
	
});