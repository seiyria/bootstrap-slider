/*
	*************************

	Lock To Ticks Tests

	*************************

    Verify that the when lock_to_ticks is true, the selected values will be snapped to closest tick values


*/
describe("Slider with lock_to_ticks: true tests", function() {

	var testSlider;

	it("Should set `options.lock_to_ticks` to false when `ticks[]` is not set", function() {
		testSlider = $('#testSlider1').slider({
			lock_to_ticks: true
		});

		var lockAttr = testSlider.slider('getAttribute', 'lock_to_ticks');
		expect(lockAttr).toBe(false);
	});

	it("Should set the slider value when `ticks[]` is not set", function() {
		testSlider = $('#testSlider1').slider({
			min: 0,
			max: 10,
			value: 1,
			lock_to_ticks: true
		});

		testSlider.slider('setValue', 5);

		var value = testSlider.slider('getValue');
		expect(value).toBe(5);
	});

	it("Should return a value (after calling `setAttribute()`)", function() {
		testSlider = $('#testSlider1').slider({
			min: 0,
			max: 10,
			value: 1,
			lock_to_ticks: true
		});

		// Try to lock to ticks when there are no ticks[]
		testSlider.slider('setAttribute', 'lock_to_ticks', true);
		testSlider.slider('setValue', 5);

		// Without proper checking, getValue() is going to return NaN in this case
		var value = testSlider.slider('getValue');
		expect(isNaN(value)).toBe(false);
	});

	it("Should snap to closest tick value (single)", function() {
		testSlider = $('#testSlider1').slider({
			value: 1,
			ticks: [1, 10, 50, 200, 500, 1000, 5000, 10000],
			lock_to_ticks: true
		});

		// Set a value that is not a tick
		testSlider.slider('setValue', 102);

		var value = testSlider.slider('getValue');
		expect(value).toBe(50);
	});

	it("Should snap to closest tick value (single, vertical)", function() {
		testSlider = $('#testSlider1').slider({
			value: 1,
			ticks: [1, 10, 50, 200, 500, 1000, 5000, 10000],
			lock_to_ticks: true,
			orientation: 'vertical'
		});

		//selecting values that are not inside tickes
		testSlider.slider('setValue', 102);

		//getting the actual values. They should be the closest values from ticks (which are 1 and 50 on this case)
		var value = testSlider.slider('getValue');
		expect(value).toBe(50);
	});

	it("Should snap to closest tick value (range)", function() {
		testSlider = $("#testSlider1").slider({
			value: [1, 10000],
			ticks: [1, 10, 50, 200, 500, 1000, 5000, 10000],
			lock_to_ticks: true
		});

		//selecting values that are not inside tickes
		testSlider.slider("setValue", [4, 102]);

		//getting the actual values. They should be the closest values from ticks (which are 1 and 50 on this case)
		var values = testSlider.slider("getValue");
		expect(values[0]).toBe(1);
		expect(values[1]).toBe(50);
	});

	it("Should snap to closest tick value (range, vertical)", function() {
		testSlider = $("#testSlider1").slider({
			value: [1, 10000],
			ticks: [1, 10, 50, 200, 500, 1000, 5000, 10000],
			lock_to_ticks: true,
			orientation: 'vertical'
		});

		//selecting values that are not inside tickes
		testSlider.slider("setValue", [4, 102]);

		//getting the actual values. They should be the closest values from ticks (which are 1 and 50 on this case)
		var values = testSlider.slider("getValue");
		expect(values[0]).toBe(1);
		expect(values[1]).toBe(50);
	});

	afterEach(function() {
		if(testSlider) {
			testSlider.slider('destroy');
			testSlider = null;
		}
	});
});