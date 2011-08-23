Q.bin.Calculate = function(){
	
	return {
		
		description:"calc <expression> to execute math calcs",
		
		run: function(args){
            args = args.join(" ");
			args = args.replace("x", "*");
			return eval(args);
		}
		
	}
	
}();

// Register the command
Q.Executor.register('calc', Q.bin.Calculate.run, Q.bin.Calculate.description);