
/*
	*************************

	Logarithmic Scale Tests

	*************************

*/
describe("Slider with logarithmic scale tests", function() {

	var testSlider;

	it("Should have the number of tick marks you specify", function() {
		testSlider = $("#testSlider1").slider({
			min: 0,
			max: 10000,
			scale: 'logarithmic',
			value: 100 // This should be at 50%
		});

		var expectedPostition = 210 / 2 + 'px';

		var handle = $("#testSlider1").siblings('div.slider').find('.min-slider-handle');
		expect(handle.css('left')).toBe(expectedPostition);
	});


	afterEach(function() {
	    if(testSlider) {
	      testSlider.slider('destroy');
	      testSlider = null;
	    }
  	});
});
