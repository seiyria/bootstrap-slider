it("Sets the aria-valuetext to 'formatter' value", function() {
  var textValArray = new Array('Monday','Wednesday','Friday');
  var tooltipFormatter = function(value) {
    arrActiveValue = value;
    return 'Current value: ' + textValArray[arrActiveValue-1];
  };
  
  //Formatter is used
  testSlider = $("#accessibilitySliderA").slider({
    formatter : tooltipFormatter
  });
  testSlider.slider('setValue', 2);
  
  var tooltipMessage = $("#accessibilitySliderA").siblings(".slider").children(".min-slider-handle").attr("aria-valuetext");
  var expectedMessage = tooltipFormatter(2);
  expect(tooltipMessage).toBe(expectedMessage);
 
});
it("Does not use aria-valuetext if 'formatter' is not used", function() {
	  
  //Formatter is not used  
  testSliderB = $("#accessibilitySliderB").slider({});
  testSliderB.slider('setValue', 2);

  var ariaValueText = $("#accessibilitySliderB").siblings(".slider").children(".min-slider-handle").attr("aria-valuetext");
  expect(ariaValueText).not.toBeDefined();
});
