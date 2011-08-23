Q.Display = function(){
	
	var _lineNumber = 0;
	
	return {
		
		init: function(){
			
			// Resize the output to fill the white area
			Q.Display.resize();
			$(window).resize(Q.Display.resize());
			$('#output').html("<table><tbody id='outputBody'></tbody></table>");
		},
		
		show: function(s){
			
			if(!s) return;
			var html = "";
			
			if(typeof(s) == "string" || typeof(s) == "number"){
				s = s + "";	// Force conversion to String
			
				var lines = s.split("\n");
				
				_lineNumber = _lineNumber + 1;
			
				for(var i = 0; i < lines.length; i++){
				
					var lineContent = lines[i];
				
					html += "<tr>";
					if(i == 0){
						html += "<td class='lineNumber'>" + _lineNumber + "</td>";
					}else{
						html += "<td class='lineNumber'>&nbsp;</td>";
					}
					html += "<td class='lineContent'>" + lineContent + "</td>";
					html += "</tr>";
				}
			
			}else{
				
				_lineNumber = _lineNumber + 1;
			
				// Thanks to https://github.com/jamespadolsey/prettyPrint.js
				var lineContent = prettyPrint(s);
				
				html += "<tr>";
			 	html += "<td class='lineNumber'>" + _lineNumber + "</td>";
				html += "<td class='lineContent'>" + lineContent.innerHTML + "</td>";
				html += "</tr>";
				
				
			}
			
			$("#outputBody").prepend(html);
		},
		
		resize: function(e){
			$('#output').height($(window).height() -  260);
		}
		
	}
	
}();