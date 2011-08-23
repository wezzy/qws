
Q.Loader = function(){

	var _repositoryUrl = "https://raw.github.com/wezzy/qws-tools/master/";	// Production
	//var _repositoryUrl = "http://127.0.0.1/qws/qws-tools/";						// Development

	var _counter = 0;
	var _callback = null;

	var _scriptLoaded =  function(){

		_counter = _counter - 1;
		if(_counter == 0){
			// All the modules are laoded
			_loadingComplete();
		}
	}

	var _loadingComplete = function(){

		// Call the saved callback
		if(_callback) _callback();

		// Don't need to keep the callback in memory
		_callback = null;

	}

	return {

		/* Takes an array of tools, load everyone of them and their dependencies and call the callback when finished */
		load: function(tools, callback){

			// Store the callback
			_callback = callback;

			// Build the requests list
			var list = [];

			var depParser = function(name){

				if(list.indexOf(name) >= 0) return;
				if(Q.tools._index.hasOwnProperty(name)) list.push(name);

				var tData = Q.tools._index[name];
				if(tData.dependencies && tData.dependencies.length > 0){
					for(var j = 0; j < tData.dependencies.length; j++){
						var depName = tData.dependencies[j];
						depParser(depName);
					}
				}

			}

			if(jQuery.isArray(tools)){
				for(var i = 0; i < tools.length; i++){
				 	depParser(tools[i]);
				}
			}else{
				depParser(tools);
			}

			if(list.length == 0){
				Q.Display.show("Command <b>" + tools + "</b> not found");
				return;
			}

			_counter = list.length;

			// Load every file itentified
			for(var i = 0; i < list.length; i++){
				jQuery.getScript(_repositoryUrl + list[i] + ".js", _scriptLoaded);
			}

		}



	}

}();

