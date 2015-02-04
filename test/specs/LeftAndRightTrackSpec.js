/*
	**********************

	Left/Right Track Tests

	**********************

	This spec has tests for checking that the widths of the left and right
	segments are the correct widths and colors, based on their CSS.
 */
describe("Left/Right Track Tests", function() {

	var unstyledID = "left-right-slider";
	var styledID = "left-right-slider-styled";

	var testSlider;

	describe("Single-value sliders, no styling", function() {

		var id = unstyledID;

		beforeEach(function() {
			testSlider = $("#testSlider1").slider({
				id: id,
				min: 0,
				max: 10,
				value: 5
			});
		});

		it("left width is zero", function()
		{
			var leftTrack = $("#" + id + " .slider-track-left");
			expect($(leftTrack).css("width")).toBe("0px");
		});

		it("right segment width is 50%", function()
		{
			var rightTrack = $("#" + id + " .slider-track-right");
			var trackWidth = rightTrack.parent().width();
			expect($(rightTrack).css("width")).toBe((trackWidth / 2) + "px");
		});

		it("right segment is transparent", function()
		{
			var rightTrack = $("#" + id + " .slider-track-right");
			var rightColor = rightTrack.css("background-color");
			var isTransparent = rightColor.match(/rgba\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}, 0\)/);
			expect(isTransparent).toBeTruthy();
		});

		afterEach(function() {
			if(testSlider) {
				testSlider.slider('destroy');
				testSlider = null;
			}
		});
	});

	describe("Single-value sliders, with styling", function() {

		var id = styledID;

		beforeEach(function() {
			testSlider = $("#testSlider1").slider({
				id: id,
				min: 0,
				max: 10,
				value: 5
			});
		});

		it("left width is zero", function()
		{
			var leftTrack = $("#" + id + " .slider-track-left");
			expect($(leftTrack).css("width")).toBe("0px");
		});

		it("right segment width is 50%", function()
		{
			var rightTrack = $("#" + id + " .slider-track-right");
			var trackWidth = rightTrack.parent().width();
			expect($(rightTrack).css("width")).toBe((trackWidth / 2) + "px");
		});

		it("right segment is red", function()
		{
			var rightTrack = $("#" + id + " .slider-track-right");
			var rightColor = rightTrack.css("background-color");
			expect(rightColor).toBe("rgb(255, 0, 0)");
		});

		afterEach(function() {
			if(testSlider) {
				testSlider.slider('destroy');
				testSlider = null;
			}
		});
	});

	describe("Range sliders, no styling", function() {

		var id = unstyledID;
		var values = {
			min: 0,
			max: 10,
			values: [ 4, 6 ]
		};

		beforeEach(function() {
			testSlider = $("#testSlider1").slider({
				id: id,
				min: values.min,
				max: values.max,
				range: true,
				value: values.values
			});
		});

		it("left width is zero", function()
		{
			var leftTrack = $("#" + id + " .slider-track-left");

			var trackWidth = leftTrack.parent().width();
			var expectedWidth = ((values.values[0] - values.min) / (values.max - values.min)) * trackWidth;

			expect($(leftTrack).css("width")).toBe(expectedWidth + "px");
		});

		it("right segment width is 50%", function()
		{
			var rightTrack = $("#" + id + " .slider-track-right");
			var trackWidth = rightTrack.parent().width();

			var expectedWidth = ((values.max - values.values[1]) / (values.max - values.min)) * trackWidth;

			expect($(rightTrack).css("width")).toBe(expectedWidth + "px");
		});

		it("left segment is transparent", function()
		{
			var leftTrack = $("#" + id + " .slider-track-left");
			var leftColor = leftTrack.css("background-color");
			var isTransparent = leftColor.match(/rgba\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}, 0\)/);
			expect(isTransparent).toBeTruthy();
		});

		it("right segment is transparent", function()
		{
			var rightTrack = $("#" + id + " .slider-track-right");
			var rightColor = rightTrack.css("background-color");
			var isTransparent = rightColor.match(/rgba\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}, 0\)/);
			expect(isTransparent).toBeTruthy();
		});

		afterEach(function() {
			if(testSlider) {
				testSlider.slider('destroy');
				testSlider = null;
			}
		});
	});

	describe("Range sliders, with styling", function() {

		var id = styledID;
		var values = {
			min: 0,
			max: 10,
			values: [ 4, 6 ]
		};

		beforeEach(function() {
			testSlider = $("#testSlider1").slider({
				id: id,
				min: values.min,
				max: values.max,
				range: true,
				value: values.values
			});
		});

		it("left width is zero", function()
		{
			var leftTrack = $("#" + id + " .slider-track-left");

			var trackWidth = leftTrack.parent().width();
			var expectedWidth = ((values.values[0] - values.min) / (values.max - values.min)) * trackWidth;

			expect($(leftTrack).css("width")).toBe(expectedWidth + "px");
		});

		it("right segment width is 50%", function()
		{
			var rightTrack = $("#" + id + " .slider-track-right");
			var trackWidth = rightTrack.parent().width();

			var expectedWidth = ((values.max - values.values[1]) / (values.max - values.min)) * trackWidth;

			expect($(rightTrack).css("width")).toBe(expectedWidth + "px");
		});

		it("left segment is green", function()
		{
			var leftTrack = $("#" + id + " .slider-track-left");
			var leftColor = leftTrack.css("background-color");
			expect(leftColor).toBe("rgb(0, 255, 0)");
		});

		it("right segment is red", function()
		{
			var rightTrack = $("#" + id + " .slider-track-right");
			var rightColor = rightTrack.css("background-color");
			expect(rightColor).toBe("rgb(255, 0, 0)");
		});

		afterEach(function() {
			if(testSlider) {
				testSlider.slider('destroy');
				testSlider = null;
			}
		});
	});
});