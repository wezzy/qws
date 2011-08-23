Q.bin.Help = function(){
	
	return {
		
		description: "shows this help",
		
		run: function(args){
			var out = "";
			
			out += Q.bin.About.run();
			
			out += "\n";
			out += "Available commands:\n";
			
			var list = Q.Executor.getList();
			for(var i = 0; i < list.length; i++){
				out += "<b>" + list[i] + "</b> - " + Q.Executor.getDescription(list[i]) + "\n";
			}
			return out;
		}
		
	}
	
}();

// Register the command
Q.Executor.register('help', Q.bin.Help.run, Q.bin.Help.description);