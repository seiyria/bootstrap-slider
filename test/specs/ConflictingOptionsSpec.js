/*	
	*************************
	
	Conflicting Options Tests

	*************************

	This spec has tests for checking if two or more options do not conflict with one another
	As option conflicts are reported and resolved, write tests for them here.
	This will help ensure that they are accounted for and do not arise again.
*/	
describe("Conflicting Options Tests", function() {
	it("should set the `precision` to be the number of digits after the decimal of the `step` (assuming no `precision` is specified)", function() {
		// Create Slider
		var $testSlider = $("#testSlider1").slider({
			value: 8.115,
			step: 0.01
		});
		// Retrieve slider value
		var value = $testSlider.slider("getValue");
		// Run tests
		expect(value).toBe(8.12);
	});
});