<!doctype html>
<!--[if lt IE 7 ]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		
		<title>qws - QuickWebShell</title>
		
		<meta name="description" content="QuickWebShell">
		<meta name="author" content="Fabio Trezzi - ArtBits snc">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<link rel="stylesheet" href="css/master.css" type="text/css" media="screen" title="no title" charset="utf-8">
	</head>
	<body>
		
		<div id='subtitle'><div>Mashups for developers</div></div>
		<div id='title'>qws</div>
		
		<input type='text' id='shell' />
		<div id='autocomplete'></div>
		
		<div id='help'>Type help for a list of available commands</div>
		
		<div id='output'></div>
		
		<div id='notice'>
			Copyright (c) <?php echo(date("Y")); ?> <a href='http://www.ct19.it'>artBits snc</a>
		</div>
		
		<script type="text/javascript" charset="utf-8">
			// Global namespace
			var Q = {};
			// Namepsace for commands
			Q.tools = {};
			
		</script>
		
		<!-- libs -->
		<script src='libs/jquery-1.6.2.js' type="text/javascript" charset="utf-8"></script>
		<script src='qws-tools/tools_index.js' type="text/javascript" charset="utf-8"></script>
		
		<script src='libs/jquery.caret.1.02.js' type="text/javascript" charset="utf-8"></script>
		<script src='libs/prettyprint.js' type="text/javascript" charset="utf-8"></script>
		
		<!-- infrastructure -->
		<script src='js/qws.js' type="text/javascript" charset="utf-8"></script>
		<script src='js/controller.js' type="text/javascript" charset="utf-8"></script>
		<script src='js/parser.js' type="text/javascript" charset="utf-8"></script>
		<script src='js/display.js' type="text/javascript" charset="utf-8"></script>
		<script src='js/loader.js' type="text/javascript" charset="utf-8"></script>
		<script src='js/executor.js' type="text/javascript" charset="utf-8"></script>
		
	</body>
</html>