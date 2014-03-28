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
    <input class="makeSlider" type="text"/>
    <input class="makeSlider" type="text"/>

	<!-- Sliders used for ElementDataSttributesSpec -->
	<input id="minSlider" type="text" data-slider-min="5"/>
	<input id="maxSlider" type="text" data-slider-max="5"/>
	<input id="orientationSlider" type="text" data-slider-orientation="vertical"/>
	<input id="stepSlider" type="text" data-slider-step="5"/>
	<input id="valueSlider" type="text" data-slider-value="5"/>
	<input id="selectionSlider" type="text" data-slider-selection="after"/>
	<input id="tooltipSlider" type="text" data-slider-tooltip="hide"/>
	<input id="handleSlider" type="text" data-slider-handle="triangle"/>
	<input id="reversedSlider" type="text" data-slider-reversed="true"/>
	<input id="disabledSlider" type="text" data-slider-enabled="false"/>
	<input id="changeOrientationSlider" type="text"/>
	<input id="makeRangeSlider" type="text"/>
</body>
</html>