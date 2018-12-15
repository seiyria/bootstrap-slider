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

/**
 * The mouse navigation tests are based on the following slider properties:
 * 
 * initial value: 3 or [3, 7]
 * ticks: [0, 3, 5, 7, 10]
 * step: 0.1
 * 
 * When the values are in the range from 0 to 10 and the step is 0.1, every value
 * can be represented as 1% of the range. For example, 5.5 is 55% and 5.6 is 56%. 
 * This makes it easier to test the behaviour of tick locking.
 * 
 * The mouse clicks are based on a percentage that represents where the user clicked
 * on the slider (60% = 6.0). The percentage is then used to calculate the coordinates
 * for the mouse events (mousedown, mousemove, and mouseup).
 * 
 * These tests are setup to test for all combinations of relevant slider configurations:
 * single/range, horizontal/vertical orientation, LTR/RTL, and ordered/reversed.
 * 
 * The test data was carefully chosen based on following the test logic below.
 * 
 * The test logic for sliders:
 * - Clicking to the left of the handle should not change its value
 * - Clicking to the left of the handle should change its value and lock to another tick
 * - Ditto for clicking to the right of the handle
 * 
 * For range sliders, the same logic is applied except test both handle1 and handle2.
 */
describe("`lock_to_ticks: true` mouse navigation test cases", function() {
	var initialValue = 3;
	var initialRangeValues = [3, 7];
	var tickValues = [0, 3, 5, 7, 10];
	var stepValue = 0.1;

	var orientations = ['horizontal', 'vertical'];
	var reversed = [false, true];
	var sliderTypes = ['single', 'range'];
	var rtl = [false, true];
	var testCases = [];
	var mouseEventArguments;

	function calcMouseEventCoords(sliderElem, orientation, per) {
		var sliderBB = sliderElem.getBoundingClientRect();

		if (orientation === 'horizontal') {
			return {
				clientX: sliderBB.left + (sliderElem.offsetWidth * per / 100),
				clientY: sliderBB.top
			};
		}
		else if (orientation === 'vertical') {
			return {
				clientX: sliderBB.left,
				clientY: sliderBB.top + (sliderElem.offsetHeight * per / 100)
			};
		}
	}

	beforeEach(function() {
		// Set up default set of mouse event arguments
		mouseEventArguments = [
			'mousemove', // type
			true, // canBubble
			true, // cancelable
			document, // view,
			0, // detail
			0, // screenX
			0, // screenY
			undefined, // clientX
			undefined, // clientY,
			false, // ctrlKey
			false, // altKey
			false, // shiftKey
			false, // metaKey,
			0, // button
			null // relatedTarget
		];
	});

	function createMouseEvent(type, clientX, clientY) {
		var mouseEvent = document.createEvent('MouseEvent');
		mouseEventArguments[0] = type;
		mouseEventArguments[7] = clientX;
		mouseEventArguments[8] = clientY;
		mouseEvent.initMouseEvent.apply(mouseEvent, mouseEventArguments);
		return mouseEvent;
	}

	var mouseTestData = {
		single: {
			testData: [{
				willChange: false,
				expectedValue: initialValue,
				percent: 20
			}, {
				willChange: true,
				expectedValue: 0,
				percent: 10
			}, {
				willChange: false,
				expectedValue: initialValue,
				percent: 40
			}, {
				willChange: true,
				expectedValue: 5,
				percent: 45
			}],

			// Modify test data for RTL and reversed situations.
			altTestData: [{
				willChange: false,
				expectedValue: initialValue,
				percent: 80
			}, {
				willChange: true,
				expectedValue: 0,
				percent: 90
			}, {
				willChange: false,
				expectedValue: initialValue,
				percent: 60
			}, {
				willChange: true,
				expectedValue: 5,
				percent: 55
			}],
		},

		range: {
			testData: [{
				willChange: false,
				expectedValue: initialRangeValues,
				percent: 20
			}, {
				willChange: true,
				expectedValue: [0, 7],
				percent: 10
			}, {
				willChange: false,
				expectedValue: initialRangeValues,
				percent: 40
			}, {
				willChange: true,
				expectedValue: [5, 7],
				percent: 45
			},
			// More test data that will affect handle2
			{
				willChange: true,
				expectedValue: [3, 5],
				percent: 60
			}, {
				willChange: false,
				expectedValue: initialRangeValues,
				percent: 65
			}, {
				willChange: false,
				expectedValue: initialRangeValues,
				percent: 80
			}, {
				willChange: true,
				expectedValue: [3, 10],
				percent: 90
			}],

			// Modify test data for RTL and reversed situations.
			// Here, the order of the ticks matter when locking a handle to a tick
			// when there are two ticks that are equal in distance to lock to.
			altTestData: [{
				willChange: false,
				expectedValue: initialRangeValues,
				percent: 20
			}, {
				willChange: true,
				expectedValue: [3, 10],
				percent: 10
			}, {
				willChange: true,
				expectedValue: [3, 5],
				percent: 40
			}, {
				willChange: false,
				expectedValue: initialRangeValues,
				percent: 35
			},
			// More test data that will affect handle2
			{
				willChange: false,
				expectedValue: initialRangeValues,
				percent: 60
			}, {
				willChange: true,
				expectedValue: [5, 7],
				percent: 55
			}, {
				willChange: false,
				expectedValue: initialRangeValues,
				percent: 80
			}, {
				willChange: true,
				expectedValue: [0, 7],
				percent: 90
			}],
		}
	};

	sliderTypes.forEach(function(sliderType) {
		orientations.forEach(function(orientation) {
			rtl.forEach(function(isRTL) {
				reversed.forEach(function(isReversed) {
					var isHorizontal = orientation === 'horizontal';
					var isVertical = orientation === 'vertical';
					var isRange = sliderType === 'range';
					var whichData;

					whichData = mouseTestData[sliderType].testData;

					if (isHorizontal) {
						// XOR
						// One or the other needs to be true
						if ((isRTL && !isReversed) || (isReversed && !isRTL)) {
							whichData = mouseTestData[sliderType].altTestData;
						}
					}
					else if (isVertical) {
						if (isReversed) {
							whichData = mouseTestData[sliderType].altTestData;
						}
					}

					testCases.push({
						value: isRange ? initialRangeValues : initialValue,
						step: stepValue,
						range: isRange,
						orientation: orientation,
						reversed: isReversed,
						rtl: 'auto',
						isRTL: isRTL,
						inputId: isRTL ? 'rtlSlider' : 'testSlider1',
						testData: whichData
					});
				});
			});
		});
	});

	testCases.forEach(function(testCase) {
		describe("range=" + testCase.range + ", orientation=" + testCase.orientation +
			", rtl=" + testCase.isRTL + ", reversed=" + testCase.reversed, function() {
			var $testSlider;
			var sliderId;
			var sliderOptions;

			beforeEach(function() {
				sliderId = testCase.range ? 'myRangeSlider' : 'mySlider';

				sliderOptions = {
					id: sliderId,
					step: testCase.step,
					orientation: testCase.orientation,
					value: testCase.value,
					range: testCase.range,
					lock_to_ticks: true,
					reversed: testCase.reversed,
					rtl: 'auto',
					ticks: tickValues,
				};
			});

			afterEach(function() {
				if ($testSlider) {
					$testSlider.slider('destroy');
					$testSlider = null;
				}
			});

			testCase.testData.forEach(function(testData) {
				it("Should snap to closest tick (percent=" + testData.percent + ", changed=" + testData.willChange + ")", function(done) {
					$testSlider = $('#'+testCase.inputId).slider(sliderOptions);
					var sliderElem = $('#'+sliderId)[0];

					var coords = calcMouseEventCoords(sliderElem, testCase.orientation, testData.percent);

					sliderElem.addEventListener('mousedown', function() {
						var value = $testSlider.slider('getValue');
						expect(value).toEqual(testData.expectedValue);
					}, false);

					sliderElem.addEventListener('mousemove', function() {
						var value = $testSlider.slider('getValue');
						expect(value).toEqual(testData.expectedValue);
					}, false);

					sliderElem.addEventListener('mouseup', function() {
						var value = $testSlider.slider('getValue');
						expect(value).toEqual(testData.expectedValue);
						done();
					}, false);

					sliderElem.dispatchEvent(createMouseEvent('mousedown', coords.clientX, coords.clientY));
					sliderElem.dispatchEvent(createMouseEvent('mousemove', coords.clientX, coords.clientY));
					sliderElem.dispatchEvent(createMouseEvent('mouseup', coords.clientX, coords.clientY));
				});
			});
		});
	});
});