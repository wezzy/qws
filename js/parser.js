Q.Parser = function(){
	
	var _tokenizer = function(s){
		
		s = s + "";
		s = $.trim(s);	// Removes spaces from the head and the tail of the string
		
		var output = [];
		var tmpString = "";
		var isString = false;
		for(var i = 0; i < s.length; i++){
			var c = s.charAt(i);
			if(c == ' '){
				if(tmpString != ""){
					if(isString == false){
						output.push(tmpString);
						tmpString = "";		// Spaces outside string change the token
					}else{
						tmpString += " ";	// The space inside a string
					}
				}
			}else if(c == '"' && s.charAt(i - 1) != '\\'){
				if(isString == false){
					isString  = true;	// The beginning of a string
				}else{
					output.push(tmpString);
					tmpString = "";
					isString = false;	// The end of a string
				}
				
				tmpString += c;
				
			}else{
				tmpString += c;	// The buffer
			}
		}
		
		output.push(tmpString);
		
		Q.log(output);
		
		return output;
	}
	
	return {
	
		parse:function(s){
			
			var results = [];
			
			// First divide pipes
			var pipes = s.split("|");
			for(var i = 0; i < pipes.length; i++){
				var result = {};
				
				var tmp = _tokenizer(pipes[i]);
				
				var cmd = tmp.splice(0,1);
				result.command = cmd[0];
				result.args = tmp;
			
				results.push(result);
			}
			
			return results;
		}
		
	}
	
}();