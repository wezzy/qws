Q.Controller = function(){
	
	var _history = [];
	var _historyPadding = 0;
	var _wordDelimiters = [" ", "|"];
	var _autocompleteIsVisible = false;
	var _pipeList = null;
	var _pipeIndex = 0;
	
	var _findCurrentWord = function(){
		
		// Find the beginning of the current word
		var caret = $("#shell").caret();
		var text = $("#shell").val();
		
		for(var i = caret.start; i >= 0; i--){
			if(_wordDelimiters.indexOf(text[i]) >= 0){
				break;
			}
		}
		
		var word = text.substr(i + 1, caret.start);
		return word;
		
	}
	
	var _endAutoComplete = function(word){
				
		$('#autocomplete').hide();
		_autocompleteIsVisible = false;
		
		var partialWord = _findCurrentWord();
		
		var caret = $("#shell").caret();
		var remainingWord = word.replace(partialWord, "");
		var text = $("#shell").val();
		var prevText = text.substr(0, caret.start);
		var postText = text.substr(caret.start, text.length);
		
		// Update shell text
		var newText = prevText + remainingWord + postText;
		$("#shell").val(newText);
		
		// Repositioning caret
		$('#shell')
			.focus()
			.caret({start:caret.start + remainingWord.length, end: (caret.start + remainingWord.length + 1)})
	
	}
	
	var _autoComplete = function(){

		var word = _findCurrentWord();

		if(word.length < 2){
			$('#autocomplete').hide();
			_autocompleteIsVisible = false;
			return; 
		}
		
		var output = document.createElement("ul");
		
		var founded = false;
		
		for(var tool in Q.tools._index){
			if(tool.indexOf(word) == 0){
				var element = document.createElement('li');
				$(element)
					.click(function(){
						_endAutoComplete($(this).html());
					})
					.html(tool);
				output.appendChild(element);
				
				founded = true;
			}
		}
		
		if(!founded) return;
		
		var position = $('#shell').offset();
		$('#autocomplete')
			.html("")
			.show()
			.append(output)
			.css('left', position.left + "px")
			.css('top', (position.top + 45) + "px");
			
		_autocompleteIsVisible = true;
	}
	
	var _handlePipeElement = function(result){
		
		if(_pipeIndex >= _pipeList.length){
			// End of pipe
			Q.Display.show(result);
		}else{
			
			var cmd = _pipeList[_pipeIndex];
			_pipeIndex = _pipeIndex + 1;
			
			// The previus result in the pipe is added to the args
			if(result) cmd.args.push(result);
			
			Q.Executor.run(cmd.command, cmd.args, _handlePipeElement);
	
		}
			
	}
	
	return {
		
		init: function(){
			// Register controller events handlers
			$('#shell').keyup(Q.Controller.keypressed);
			$(window).resize(Q.Controller.resized);

			// Initialize the screen
			Q.Display.init();

			// Empty the shell
			$('#shell').val("");
			
			// Set the focus on the shell input
			$('#shell').focus();
			
		},
	
		keypressed:function(e){
			
			var keyCode = e.keyCode || e.which;
			var keys = {RETURN:13, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, TAB: 9 };
			
			//Q.log("key code = " + keyCode);
			
			switch(keyCode){ 
				
				case keys.RETURN:

					// if autocomplete is visible just complete the word
					if(_autocompleteIsVisible && _findCurrentWord() != $('#autocomplete li').first().html()){
						_endAutoComplete($('#autocomplete li').first().html());
					}else{
						
						$('#autocomplete').hide();
						_autocompleteIsVisible = false;
						
						// Execute the command
						var v = $('#shell').val();
				
						if(!v || v.length == 0) return;
					
						_history.push(v);
					
						var parsed = Q.Parser.parse(v);
						
						if(parsed.length == 1){
							var cmd = parsed[0];
							Q.Executor.run(cmd.command, cmd.args, function(result){
								Q.Display.show(result);
								
							});
						}else if(parsed.length > 1){
							// Handle pipes
							_pipeList = parsed;
							_pipeIndex = 0;
							_handlePipeElement();
						}
						
						$('#shell').val("");
					}
					
				break;
				
				case keys.UP:
					var index = _history.length - 1 - _historyPadding;
					if(index < 0) index = 0;
					var value = _history[index];
					_historyPadding ++;
					$('#shell').val(value);
				break;
				
				case keys.DOWN:
					var index = _history.length - 1 - _historyPadding;
					if(index > _history.length - 1) index = _history.length - 1;
					var value = _history[index];
					_historyPadding --;
					$('#shell').val(value);
				break;
				
				case keys.TAB:
				
					if(_autocompleteIsVisible){
						_endAutoComplete($('#autocomplete li').first().html());
					}
					
				break;
				
				default:
				
					if(_wordDelimiters.indexOf())
					_autoComplete();
					
				break;
			}
			
			if(keyCode != keys.UP) _historyPadding = 0;
		},
		
		resized:function(e){
			// Notify the display
			Q.Display.resize(e);
		}
		
		
	}
}();