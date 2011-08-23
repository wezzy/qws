
Q.bin.Flickr = function(){
	
	var _apiKey = "24e353608ab04ecb3b61328bd2104984";
	
	var _search = function(args){
		
		args.splice(0,1);
		
		var url = "http://api.flickr.com/services/rest/?";
		url += "method=flickr.photos.search";
		url += "&api_key=24e353608ab04ecb3b61328bd2104984";
		url += "&text=" + escape(args.join(" "));
		url += "&format=json";
		url += "&jsoncallback=?";
		
		$.getJSON(url, function(data){
			
			Q.log(data);
			
			var out = "";
			
			var list = data.photos.photo;
			for(var i = 0; i < list.length; i++){
				
				var img = list[i];
				var imgUrl = "http://farm" + img.farm + ".static.flickr.com/" + img.server + "/" + img.id + "_" + img.secret;
				
				out += "<a style='float:left' href='" + imgUrl + ".jpg' target='_blank'>";
				out += "<img src='" + imgUrl + "_s.jpg' alt='" + img.title + "' style='border:0px;margin:5px'/>";
				out += "</a>"
				
			}
			
			Q.Display.show(out);
        });

        return "Loading ...";
	}
	
	var _help = function(){
		var out = "qws Flickr interface\n";
		out += "flickr help - show this help message\n";
		out += "flickr search &lt;string&gt; - search twitter for a string\n";
		
		return out;
	}
	
	return {
		
		description:"Flickr qws interface, type flickr help for more informations",
		
		run: function(args){

			if(!args || args.length == 0) return _help();
			
			if(args[0] == "help") return _help();
			
			if(args[0] == "search") return _search(args);
			
			return _help();

		}
		
	}
	
}();

// Register the command
Q.Executor.register('flickr', Q.bin.Flickr.run, Q.bin.Flickr.description);