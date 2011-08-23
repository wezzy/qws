
Q.bin.Search = function(){
	
	var _apiKey = "ABQIAAAAc7XIyXq-YbjA17Nh85OyZBRi_j0U6kJrkFvY4-OX2XYmEAa76BTAawWgkuMiIVBoeGPPnc-qQmn7gA";
	
	var _searcher = null;
	
	return {

		description:"search google for the specified text",

		run: function(args){
			
			var url = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=";
			url += escape(args.join(" "));
			url += "&callback=?";
			
			$.getJSON(url, function(data){
				
				var list = data.responseData.results;
				
				var out = "<table>";
				
				for(var i = 0; i < list.length; i++){
					var r = list[i];
					
					out += "<tr style='font-size:11px'>";
					out += "<td>";
					out += "<a href='" + r.url + "' target='_blank'>";
					out += r.title;
					out += "</a>";
					out += "</td>";
					out += r.content;
					out += "<td>";
					out += "</td>";
					out += "</tr>";
				}
				
				
				out += "<table>";
				
				Q.Display.show(out);
				
			});
				
			Q.Display.show("Loading ...");
		}

	}

}();

// Register the command
Q.Executor.register('search', Q.bin.Search.run, Q.bin.Search.description);