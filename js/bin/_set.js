Q.bin.Set = function(){
	
	return {
		
		description: "store a value in qws memory &lt;identifier&gt;=&lt;value&gt;. This returns the saved value",
		
		run: function(args){
            args = args.join(" ");
			var params = $.trim(args).split("=");
			Q.variables[$.trim(params[0])] = $.trim(params[1]);
			
			return params[1]
		}
		
	}
	
}();

// Register the command
Q.Executor.register('set', Q.bin.Set.run, Q.bin.Set.description);