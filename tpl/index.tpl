<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Examples for bootstrap-slider plugin">
    <meta name="author" content="">

    <title>Slider for Bootstrap Examples Page</title>

    <!-- core CSS -->
    <link href="<%= css.bootstrap %>" rel="stylesheet">
    <link href="<%= css.slider %>" rel="stylesheet">

    <!-- Custom styles for this template -->
    <style type='text/css'>
    	/* Space out content a bit */
		body {
		  padding-top: 20px;
		  padding-bottom: 20px;
		}

		h1 small {
			font-size: 51%;
		}

		/* Everything but the jumbotron gets side spacing for mobile first views */
		.header,
		.marketing,
		.footer {
		  padding-left: 15px;
		  padding-right: 15px;
		}

		/* Custom page header */
		.header {
		  border-bottom: 1px solid #e5e5e5;
		}
		/* Make the masthead heading the same height as the navigation */
		.header h3 {
		  margin-top: 0;
		  margin-bottom: 0;
		  line-height: 40px;
		  padding-bottom: 19px;
		}

		/* Custom page footer */
		.footer {
		  padding-top: 19px;
		  color: #777;
		  border-top: 1px solid #e5e5e5;
		}

		/* Customize container */
		.container {
			min-width: 640px;
		}
		@media (min-width: 768px) {
		  .container {
		    max-width: 1000px;
		  }
		}
		.container-narrow > hr {
		  margin: 30px 0;
		}

		/* Main marketing message and sign up button */
		.title {
		  text-align: center;
		  border-bottom: 1px solid #e5e5e5;
		}

		/* Responsive: Portrait tablets and up */
		@media screen and (min-width: 768px) {
		  /* Remove the padding we set earlier */
		  .header,
		  .footer {
		    padding-left: 0;
		    padding-right: 0;
		  }
		  /* Space out the masthead */
		  .header {
		    margin-bottom: 30px;
		  }
		  /* Remove the bottom border on the jumbotron for visual effect */
		  .title {
		    border-bottom: 0;
		  }
		}

		.well {
			background-color: #E0E0E0;
		}

		.slider-example {
			padding: 10px 0;
			margin: 35px 0;
		}

		#destroyEx5Slider, #ex6CurrentSliderValLabel, #ex7-enabled {
			margin-left: 45px;
		}

		#ex6SliderVal {
			color: green;
		}
    </style>

    <style type='text/css'>
		/* Example 1 custom styles */
		#ex1Slider .slider-selection {
   			background: #BABABA;
  		}

    	/* Example 3 custom styles */
		#RGB {
    		height: 20px;
    		background: rgb(128, 128, 128);
  		}
		#RC .slider-selection {
		    background: #FF8282;
		}
		#RC .slider-handle {
			background: red;
		}
		#GC .slider-selection {
			background: #428041;
		}
		#GC .slider-handle {
			background: green;
		}
		#BC .slider-selection {
			background: #8283FF;
		}
		#BC .slider-handle {
			border-bottom-color: blue;
		}
		#R, #G, #B {
			width: 300px;
		}
    </style>
	<script type='text/javascript' src="<%= js.modernizr %>"></script>
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="../../assets/js/html5shiv.js"></script>
      <script src="../../assets/js/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <div class="container">

      <div class="jumbotron">
        <h1>Slider for Bootstrap <small>bootstrap-slider.js</small></h1>
        <p class="lead">Examples for the bootstrap-slider component.<p>
      </div>

      <div class="examples">
      	<div class='slider-example'>
      		<h3>Example 1:</h3>
      		<p>Basic example with custom formater and colored selected region via CSS.</p>
      		<div class="well">
				<input id="ex1" data-slider-id='ex1Slider' type="text" data-slider-min="-5" data-slider-max="20" data-slider-step="1" data-slider-value="14"/>
			</div>
			<pre><code>
###################
       HTML	
###################

&ltinput id="ex1" data-slider-id='ex1Slider' type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="14"/&gt



###################
    JavaScript	
###################

$('#ex1').slider({
	formater: function(value) {
		return 'Current value: ' + value;
	}
});



###################
       CSS	
###################

#ex1Slider .slider-selection {
	background: #BABABA;
}

            </code></pre>
      	</div>

      	<div class='slider-example'>
      		<h3>Example 2:</h3>
      		<p>Range selector, options specified via data attribute.</p>
      		<div class="well">
      			Filter by price interval: <b>€ 10</b> <input id="ex2" type="text" class="span2" value="" data-slider-min="10" data-slider-max="1000" data-slider-step="5" data-slider-value="[250,450]"/> <b>€ 1000</b>
      		</div>
      		<pre><code>
###################
       HTML	
###################

Filter by price interval: &ltb&gt€ 10&lt/b&gt &ltinput id="ex2" type="text" class="span2" value="" data-slider-min="10" data-slider-max="1000" data-slider-step="5" data-slider-value="[250,450]"/&gt &ltb&gt€ 1000&lt/b&gt


###################
    JavaScript	
###################

$("#ex2").slider({});

            </code></pre>
      	</div>

      	<div class='slider-example'>
      		<h3>Example 3:</h3>
      		<p>Using events to work with the values and style the selection and handles via CSS. The tooltip is disabled and diferent shapes for the handles.</p>
      		<div class="well">
      			<p>
	        	<b>R</b> <input type="text" class="span2" value="" data-slider-min="0" data-slider-max="255" data-slider-step="1" data-slider-value="128" data-slider-id="RC" id="R" data-slider-tooltip="hide" data-slider-handle="square" />
	            </p>
	            <p>
	            <b>G</b> <input type="text" class="span2" value="" data-slider-min="0" data-slider-max="255" data-slider-step="1" data-slider-value="128" data-slider-id="GC" id="G" data-slider-tooltip="hide" data-slider-handle="round" />
	            </p>
	            <p>
	            <b>B</b> <input type="text" class="span2" value="" data-slider-min="0" data-slider-max="255" data-slider-step="1" data-slider-value="128" data-slider-id="BC" id="B" data-slider-tooltip="hide" data-slider-handle="triangle" />
	            </p>
	            <div id="RGB"></div>
      		</div>
      		<pre><code>
###################
       HTML	
###################

&ltp&gt
&ltb&gtR&lt/b&gt &ltinput type="text" class="span2" value="" data-slider-min="0" data-slider-max="255" data-slider-step="1" data-slider-value="128" data-slider-id="RC" id="R" data-slider-tooltip="hide" data-slider-handle="square" /&gt
&lt/p&gt
&ltp&gt
&ltb&gtG&lt/b&gt &ltinput type="text" class="span2" value="" data-slider-min="0" data-slider-max="255" data-slider-step="1" data-slider-value="128" data-slider-id="GC" id="G" data-slider-tooltip="hide" data-slider-handle="round" /&gt
&lt/p&gt
&ltp&gt
&ltb&gtB&lt/b&gt &ltinput type="text" class="span2" value="" data-slider-min="0" data-slider-max="255" data-slider-step="1" data-slider-value="128" data-slider-id="BC" id="B" data-slider-tooltip="hide" data-slider-handle="triangle" /&gt
&lt/p&gt
&ltdiv id="RGB"&gt&lt/div&gt


###################
    JavaScript	
###################

var RGBChange = function() {
	$('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
};

var r = $('#R').slider()
		.on('slide', RGBChange)
		.data('slider');
var g = $('#G').slider()
		.on('slide', RGBChange)
		.data('slider');
var b = $('#B').slider()
		.on('slide', RGBChange)
		.data('slider');


###################
       CSS	
###################

#RGB {
	height: 20px;
	background: rgb(128, 128, 128);
}
#RC .slider-selection {
	background: #FF8282;
}
#RC .slider-handle {
	background: red;
}
#GC .slider-selection {
	background: #428041;
}
#GC .slider-handle {
	background: green;
}
#BC .slider-selection {
	background: #8283FF;
}
#BC .slider-handle {
	border-bottom-color: blue;
}
#R, #G, #B {
	width: 300px;
}

            </code></pre>
      	</div>

      	<div class='slider-example'>
      		<h3>Example 4:</h3>
      		<p>Vertical Slider with reversed values (largest to smallest).</p>
      		<div class="well">
      			<input id="ex4" type="text" data-slider-min="-5" data-slider-max="20" data-slider-step="1" data-slider-value="-3" data-slider-orientation="vertical"/>
      		</div>
      		<pre><code>
###################
       HTML	
###################

&ltinput id="ex4" type="text" data-slider-min="-5" data-slider-max="20" data-slider-step="1" data-slider-value="-3" data-slider-orientation="vertical"/&gt


###################
    JavaScript	
###################

$("#ex4").slider({
	reversed : true
});

            </code></pre>
      	</div>

      	<div class='slider-example'>
      		<h3>Example 5:</h3>
      		<p>Destroy instance of slider by calling destroy() method on slider instance via JavaScript.
      		<div class="well">
      			<input id="ex5" type="text" data-slider-min="-5" data-slider-max="20" data-slider-step="1" data-slider-value="0"/>
      			<button id="destroyEx5Slider" class='btn btn-danger'>Click to Destroy</button>
      		</div>
      		<pre><code>
###################
       HTML	
###################

&ltinput id="ex5" type="text" data-slider-min="-5" data-slider-max="20" data-slider-step="1" data-slider-value="0"/&gt
&ltbutton id="destroyEx5Slider" class='btn btn-danger'>Click to Destroy&lt/button&gt


###################
    JavaScript	
###################

$("#ex5").slider();
$("#destroyEx5Slider").click(function() {
	$("#ex5").slider('destroy');
});

            </code></pre>
      	</div>

      	<div class='slider-example'>
      		<h3>Example 6:</h3>
      		<p>Able to bind to 'slide' JQuery event on slider, which is triggered whenever the slider is used.</p>
      		<div class="well">
      			<input id="ex6" type="text" data-slider-min="-5" data-slider-max="20" data-slider-step="1" data-slider-value="3"/>
      			<span id="ex6CurrentSliderValLabel">Current Slider Value: <span id="ex6SliderVal">3</span></span>
      		</div>
      		<pre><code>
###################
       HTML	
###################

&ltinput id="ex6" type="text" data-slider-min="-5" data-slider-max="20" data-slider-step="1" data-slider-value="3"/&t
&ltspan id="ex6CurrentSliderValLabel">Current Slider Value: &ltspan id="ex6SliderVal"&gt3&lt/span&gt&lt/span&gt


###################
    JavaScript	
###################

$("#ex6").slider();
$("#ex6").on('slide', function(slideEvt) {
	$("#ex6SliderVal").text(slideEvt.value);
});

            </code></pre>
      	</div>

      	<div class='slider-example'>
      		<h3>Example 7:</h3>
      		<p>Sliders can be enabled and disabled.</p>
      		<div class="well">
      			<input id="ex7" type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="5" data-slider-enabled="false"/>
      			<input id="ex7-enabled" type="checkbox"/> Enabled
      		</div>
      		<pre><code>
###################
       HTML	
###################

&ltinput id="ex7" type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="5" data-slider-enabled="false"/&gt
&ltinput id="ex7-enabled" type="checkbox"/&gt Enabled


###################
    JavaScript	
###################

$("#ex7").slider();
$("#ex7-enabled").click(function() {
	if(this.checked) {
		$("#ex7").slider("enable");
	}
	else {
		$("#ex7").slider("disable");
	}
});

            </code></pre>
      	</div>

      <div class='slider-example'>
      		<h3>Example 8:</h3>
      		<p>Tooltip can always be displayed.</p>
      		<div class="well">
  				<input id="ex8" data-slider-id='ex1Slider' type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="14"/>
      		</div>
      		<pre><code>
###################
       HTML	
###################

&ltinput id="ex8" data-slider-id='ex1Slider' type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="14"/&gt


###################
    JavaScript	
###################

$("#ex8").slider({
	tooltip: 'always'
});

            </code></pre>
      	</div>

      <div class='slider-example'>
      		<h3>Example 9:</h3>
      		<p>Precision (number of places after the decimal) can be specified.</p>
      		<div class="well">
  				<input id="ex9" type="text"/>
      		</div>
      		<pre><code>
###################
       HTML	
###################

&ltinput id="ex9" type="text"/&gt

###################
    JavaScript	
###################

$("#ex9").slider({
	precision: 2,
	value: 8.115 // Slider will instantiate showing 8.12 due to specified precision
});


            </code></pre>
      	</div>
<div class='slider-example'>
      		<h3>Example 10:</h3>
      		<p>Tooltip Drag Option: Tooltip only appears when dragging the handles of the slider.</p>
      		<div class="well">
  				<input id="ex10" type="text"/>
      		</div>
      		<pre><code>

###################
       HTML	
###################

&ltinput id="ex10" type="text"/&gt

###################
    JavaScript	
###################
$("#ex10").slider({
	tooltip: 'drag',
	max: 100,
	min: 0
});


            </code></pre>
      	</div>
      
      </div> <!-- /examples -->
    </div> <!-- /container -->


    <!-- core JavaScript
    ================================================== -->
    <script type='text/javascript' src="<%= js.jquery %>"></script>
    <script type='text/javascript' src="<%= js.slider %>"></script>
    <script type='text/javascript'>
    	$(document).ready(function() {
    		/* Example 1 */
	    	$('#ex1').slider({
	          	formater: function(value) {
	            	return 'Current value: ' + value;
	          	}
	        });

	    	/* Example 2 */
	        $("#ex2").slider({});

	        /* Example 3 */
	        var RGBChange = function() {
	          $('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
	        };

	        var r = $('#R').slider()
	                	.on('slide', RGBChange)
	                	.data('slider');
	        var g = $('#G').slider()
	                	.on('slide', RGBChange)
	                	.data('slider');
	        var b = $('#B').slider()
	                	.on('slide', RGBChange)
	                	.data('slider');

	        /* Example 4 */
	        $("#ex4").slider({
	        	reversed : true
	        });

	        /* Example 5 */
	        $("#ex5").slider();
			$("#destroyEx5Slider").click(function() {
				$("#ex5").slider('destroy');
			});

			/* Example 6 */
			$("#ex6").slider();
			$("#ex6").on('slide', function(slideEvt) {
				$("#ex6SliderVal").text(slideEvt.value);
			});

			/* Example 7 */
			$("#ex7").slider();
			$("#ex7-enabled").click(function() {
				if(this.checked) {
					$("#ex7").slider("enable");
				}
				else {
					$("#ex7").slider("disable");
				}
			});

			/* Example 8 */
			$("#ex8").slider({
				tooltip: 'always'
			});

			/* Example 9 */
			$("#ex9").slider({
				step: 0.01,
				value: 8.115
			});
			
                       /* Example 10 */
			$("#ex10").slider({
				tooltip: 'drag',
				max: 100,
				min: 0
			});
    	});
    </script>
    <!-- Placed at the end of the document so the pages load faster -->
  </body>
</html>
