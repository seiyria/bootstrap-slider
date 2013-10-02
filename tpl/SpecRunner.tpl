<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Jasmine Spec Runner</title>
<% css.forEach(function(style){ %>
  <link rel="stylesheet" type="text/css" href="<%= style %>">
<% }) %>
<% with (scripts) { %>
  <% [].concat(jasmine, vendor, src, specs, reporters, start).forEach(function(script){ %>
  <script src="<%= script %>"></script>
  <% }) %>
<% }; %>
</head>
<body>
	<!-- Slider used for PublicMethodsSpec and EventsSpec -->
	<input id="testSlider1" type="text"/>
	<input id="testSlider2" type="text"/>
</body>
</html>