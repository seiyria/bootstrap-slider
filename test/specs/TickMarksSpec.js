/*
	*************************

	Tick Marks Tests

	*************************

    Verify that the number of tick marks matches what you set
    Verify the tick marks are at the correct intervals


*/
describe("Slider with ticks tests", function() {

	var testSlider;

	it("Should have the number of tick marks you specify", function() {
		testSlider = $("#testSlider1").slider({
			ticks: [100, 200, 300, 400, 500]
		});

		var numTicks = $("#testSlider1").siblings('div.slider').find('.slider-tick').length;
		expect(numTicks).toBe(5);
	});

	it("Should have the number of tick marks you specify", function() {
		testSlider = $("#testSlider1").slider({
			ticks: [100, 200, 300, 400, 500]
		});

		$("#testSlider1").siblings('div.slider').find('.slider-tick').each(function(i) {
			expect(this.style.left).toBe(100 * i / 4.0 + '%');
		});
	});

	it("Should have the tick labels you specify", function() {
		var tickLabels = ['$0', '$100', '$200', '$300', '$400'];
		testSlider = $("#testSlider1").slider({
			ticks: [100, 200, 300, 400, 500],
		    tick_labels: tickLabels
		});

		$("#testSlider1").siblings('div.slider').find('.slider-tick-label').each(function(i) {
			expect(this.innerHTML).toBe(tickLabels[i]);
		});
	});

	it("Should overwrite the min/max values", function() {
		testSlider = $("#testSlider1").slider({
			ticks: [100, 200, 300, 400, 500],
			min: 15000,
			max: 25000
		});

		expect(testSlider.slider('getAttribute','min')).toBe(100);
		expect(testSlider.slider('getAttribute','max')).toBe(500);
	});


	afterEach(function() {
	    if(testSlider) {
	      testSlider.slider('destroy');
	      testSlider = null;
	    }
  	});
});
