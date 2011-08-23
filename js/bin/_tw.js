
Q.bin.Twitter = function(){

    var _twParser = function(s){

        s = s + "";
        var out = [];
        var list = s.split(" ");
        for(var i = 0; i < list.length; i++){
            var w = list[i];
            if(w.charAt(0) == "@"){
                w = "<a href='http://www.twitter.com/" + w.substr(1, w.length - 1) + "'>" + w + "</a>";
            }

            if(w.substr(0, 7) == "http://"){
                w = "<a href='" + w + "'>" + w + "</a>";
            }

            out.push(w);
        }
        return out.join(" ");
    }

    var _search = function(args){
        // http://search.twitter.com/search.json?callback=foo&q=twitter
        $.getJSON("http://search.twitter.com/search.json?q=" + args[1] + "&callback=?", function(data){
            var out = "<table>";
            for(var i = 0; i < data.results.length; i++){

                var r = data.results[i];

                out += "<tr>";

                out += "<td align='center'>";
                out += "<img src='" + r.profile_image_url + "' alt='" + r.from_user + "' style='border:0px' />";
                out += "<br /";
                out += "<a href='http://www.twitter.com/" + r.from_user + "'>" + r.from_user + "</a>";
                out += "</td>";

                out += "<td>" + _twParser(r.text) + "</td>";

                out += "</tr>";

            }
            out += "</table>";

            Q.Display.show(out);
        });

        return "Loading ...";
    }

    var _trends = function(){
        $.getJSON("http://search.twitter.com/trends.json?q=1&callback=?", function(data){
            var out = "<table>";
            out += "<tr><td colspan='2'>Trends on: <b>" + data.as_of + "</b></td></tr>";
            for(var i = 0; i < data.trends.length; i++){

                var t = data.trends[i];

                out += "<tr>";

                out += "<td align='center'>" + (i + 1) + "</td>";

                out += "<td><a href='" + t.url + "'>" +t.name + "</a></td>";

                out += "</tr>";

            }
            out += "</table>";

            Q.Display.show(out);
        });

        return "Loading ...";
    }

    var _help = function(){
        var out = "";
        out += "qws Twitter help\n";
        out += "tw search &lt;keyword&gt; - search twitter for the specified keyword\n";
        out += "tw help - show this help message\n";
        out += "tw trends - display current trends\n";

        return out;
    }

	return {
		
		description:"Interacts with Twitter, type tw help for more information",

		run: function(args){

            if(!args || args.length == 0) return _help();

            if(args[0] == "help") return _help();
            
			if(args[0] == "search") return _search(args);

            if(args[0] == "trends") return _trends();

            return _help();
		}
		
	}
	
}();

// Register the command
Q.Executor.register('tw', Q.bin.Twitter.run, Q.bin.Twitter.description);