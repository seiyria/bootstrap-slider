describe("Aria-valuetext Tests", function() {
    it("Sets the aria-valuetext to 'formatter' value", function() {
      var textValArray = new Array('Monday','Wednesday','Friday');
      var tooltipFormatter = function(value) {
        var arrActiveValue = value;
        return textValArray[arrActiveValue-1];
      };
      
      //Formatter is used
      var testSlider = $("#accessibilitySliderA").slider({
        formatter : tooltipFormatter
      });
      testSlider.slider('setValue', 2);
      
      var tooltipMessage = $("#accessibilitySliderA").siblings(".slider").children(".min-slider-handle").attr("aria-valuetext");
      var expectedMessage = tooltipFormatter(2);
      expect(tooltipMessage).toBe(expectedMessage);
     
    });
    it("Does not use aria-valuetext if 'formatter' is not used", function() {
    	  
      //Formatter is not used  
      var testSliderB = $("#accessibilitySliderB").slider({});
      testSliderB.slider('setValue', 2);
    
      var ariaValueText = $("#accessibilitySliderB").siblings(".slider").children(".min-slider-handle").attr("aria-valuetext");
      expect(ariaValueText).not.toBeDefined();
    });

    it("aria-valuetext if 'formatter' is used and has min & max value", function() {
      var textValArray = new Array('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday');
      var tooltipFormatter = function(value) {
        var arrActiveValue0 = value[0];
        var arrActiveValue1 = value[1];  
        return [textValArray[arrActiveValue0-1], textValArray[arrActiveValue1-1]];
      };
      
      //Formatter is used
      var testSliderC = $("#accessibilitySliderC").slider({
        formatter : tooltipFormatter
      });
      testSliderC.slider('setValue', [2,4]);
      
      var ttminMessage = $("#accessibilitySliderC").siblings(".slider").children(".min-slider-handle").attr("aria-valuetext");
      var ttmaxMessage = $("#accessibilitySliderC").siblings(".slider").children(".max-slider-handle").attr("aria-valuetext");
      var bothMessages = ttminMessage+ ',' + ttmaxMessage;
      var expectedMessage = tooltipFormatter(2,4);
      expect(bothMessages).toBe(expectedMessage);
     
    });
});
