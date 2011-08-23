Q.Executor = function(){
	
	var _storage = {};
	
	return {
		
		/*
			Run a command, it the requested tool is not loaded it ask Q.Loader to laod it and then call the passed callback. 
			If the tool is already loaded the result is immidiatly returned
		*/
		run: function(command, parameters, callback){
			
			Q.log("RUN: " + command + " [" + parameters + "]");
			
			// Check if the requested tool really exists in the index
			if(Q.tools._index.hasOwnProperty(command)){
				
				if(_storage.hasOwnProperty(command)){
					// The tool si already laoded
					var cmd = this.getCallback(command);
					cmd(callback, parameters);
					
				}else{
					
					// The tool exists but it has to be loaded
					var self = this;
				
					Q.Loader.load(command, function(){
						var cmd = self.getCallback(command);
					    cmd(callback, parameters);
					});				
				}
			}else{
				Q.Display.show("Command <b>" + command + "</b> not found");
			}
			
		},
		
		/*
			Register a command to allow its execution
		*/
		register: function(command, toolConstructor){
			_storage[command] = toolConstructor();
		},
		
		/*
			Return an array with all the available commands
		*/
		getList: function(){
			var out = [];
			for(var el in Q.tools._index){
				out.push(el);
			}
			
			return out;
		},
		
		/*
			Return an array with all the tools loaded
		*/
		getLoadedList: function(){
			var out = [];
			for(var el in _storage){
				out.push(el);
			}
			
			return out;
		},
		
		/*
			Get the code for a specific command
		*/
		getCallback: function(command){
			return _storage[command].run;
		}, 
		
		/*
			Get the description for a specific command
		*/
		getDescription: function(command){
			return Q.tools._index[command].description;
		}
		
	}
	
}();