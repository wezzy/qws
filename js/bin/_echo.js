Q.bin.Echo = function(){
	
	return {
		
		description: "return it's input as a result, if a string is prefixed with $ echo try load the value setted with 'set'",
		
		run: function(args){
            args = args.join(" ");
			var words = args.split(" ");

			for(var i = 0; i < words.length; i++){
				var w = words[i];
				if(w.charAt(0) == '$'){
					var variable = w.replace('$', '');
					if(Q.variables[variable]){
						args = args.replace(w, Q.variables[variable]);
					}
				}
			}
			
			return args
		}
		
	}
	
}();

// Register the command
Q.Executor.register('echo', Q.bin.Echo.run, Q.bin.Echo.description);