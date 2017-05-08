/*
	*************************

	Lock To Ticks Tests

	*************************

    Verify that the when lock_to_ticks is true, the selected values will be snapped to closest tick values


*/
describe("Slider with lock_to_ticks: true tests", function() {

	var testSlider;

	it("Should snap to closest tick value", function() {
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

	it("Should snap to closest tick value (vertical orientation)", function() {
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
