/*
	*************************

	Conflicting Options Tests

	*************************

	This spec has tests for checking if two or more options do not conflict with one another
	As option conflicts are reported and resolved, write tests for them here.
	This will help ensure that they are accounted for and do not arise again.
*/
describe("Conflicting Options Tests", function() {

	var testSlider;

	it("Should have the value zero when it is slided to zero", function() {
		testSlider = $("#testSlider1").slider({
			value: 0,
			step: 1
		});
		var flag = false;
		var mouse = document.createEvent('MouseEvents');

		testSlider.on('slide', function(slideEvt) {
			expect(slideEvt.value).toBe(0);
			flag = true;
		});

      		testSlider.data('slider')._mousemove(mouse);
		expect(flag).toBeTruthy();
    	});

	it("should set the `precision` to be the number of digits after the decimal of the `step` (assuming no `precision` is specified)", function() {
		// Create Slider
		testSlider = $("#testSlider1").slider({
			value: 8.115,
			step: 0.01
		});
		// Retrieve slider value
		var value = testSlider.slider("getValue");
		// Run tests
		expect(value).toBe(8.12);
	});


	it("Should take into account the value of the `tooltip_separator` option", function() {
		// Create Slider
		testSlider = $("#testSlider1").slider({
			min: 0,
			value: [25, 50],
			max: 100,
			'tooltip_split': false,
			'tooltip_separator': ' test '
		});
		// Retrieve tooltip content
		var content = testSlider.siblings('.slider').find('.tooltip-main .tooltip-inner').html();
		// Run tests
		expect(content).toBe('25 test 50');
	});

	afterEach(function() {
	    if(testSlider) {
	      testSlider.slider('destroy');
	      testSlider = null;
	    }
  	});
});
