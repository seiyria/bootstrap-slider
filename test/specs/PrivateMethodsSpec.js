describe("Private Method Tests", function() {
	var testSlider;
	describe("_adjustPercentageForRangeSliders", function() {
		it("handles should swap reliably given imprecision", function() {
			testSlider = new Slider(document.getElementById("testSlider1"), {
				ticks: [0, 1, 2, 3, 4, 5, 6],
				value: [0, 4],
				step: 1,
				range: true,
			});
			testSlider.dragged = 0;
			// Simulate drag without swapping
			testSlider._adjustPercentageForRangeSliders(16.666666666666668);
			expect(testSlider.dragged).toBe(0);
			// Simulate left over right drag with imprecision in reported percentage
			testSlider.setValue([5,5]);
			testSlider._adjustPercentageForRangeSliders(83.33333333333334);
			expect(testSlider.dragged).toBe(0);
			testSlider._adjustPercentageForRangeSliders(100);
			expect(testSlider.dragged).toBe(1);
			// Simulate right over left drag with imprecision in reported percentage
			testSlider.setValue([5,6]);
			testSlider._adjustPercentageForRangeSliders(83.33333333333334);
			expect(testSlider.dragged).toBe(1);
			testSlider._adjustPercentageForRangeSliders(66.66666666666667);
			expect(testSlider.dragged).toBe(0);
		});
	});
	afterEach(function() {
		if(testSlider) {
			if(testSlider instanceof Slider) { testSlider.destroy(); }
			testSlider = null;
		}
	});
});