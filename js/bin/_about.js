Q.bin.About = function(){
	
	return {
		
		description: "What is this ?",
		
		run: function(args){
			var out = "";
			
			out += "Quick web shell\n";
			out += "&nbsp;&nbsp;&nbsp;&nbsp;version 0.1\n";
			out += "&nbsp;&nbsp;&nbsp;&nbsp;Copyright (c) <a href='http://www.artbits.it'>artBits snc</a> 2009\n";
			
			return out;
		}
		
	}
	
}();

// Register the command
Q.Executor.register('about', Q.bin.About.run, Q.bin.About.description);