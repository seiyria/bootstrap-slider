/*
  *************************

  Window resize test

  *************************

  This spec tests if Window resizes, tick labels should have been on right position
*/
describe("Window resize, test", function() {
  var testSlider;

    it("Should show the correct number of tick labes", function() {
  		var options = {
  			ticks: [100, 200, 300, 400, 500],
            ticks_labels: ['100', '200', '300', '400', '500'],
  			value: 250,
  			selection: 'after'
  		},
  		$el = $("#testSlider1");

  		testSlider = $el.slider(options);
  		expect($el.siblings('div.slider').find('.slider-tick-label').length).toBe(5);
    });

    it("Should have the correct tick labes at it's position initially and after resize", function() {
        var tick = [100, 200, 300, 400, 500];
        var options = {
            ticks: tick,
            ticks_labels: ['100', '200', '300', '400', '500'],
            value: 250,
            selection: 'after'
        },
        per = 1/tick.length,
        $el = $("#testSlider1");

        testSlider = $el.slider(options);

        window.onresize = function() {
            $("div.slider").width($(window).width());
        };

        expect($el.siblings('div.slider').find('.slider-tick-label:eq(0)').width()).toBe($el.siblings('div.slider').width()*per);
        $(window).trigger('resize');
        expect($el.siblings('div.slider').find('.slider-tick-label:eq(0)').width()).toBe($el.siblings('div.slider').width()*per);
    });
	
	afterEach(function() {
		testSlider.slider('destroy');
		testSlider = null;
	});
});
