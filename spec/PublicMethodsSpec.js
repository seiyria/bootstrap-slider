describe("Public Method Tests", function() {
  var testSlider,
      callingContextNotSliderInstanceErrorMsg = "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method";

  describe("slider constructor", function() {
    it("reads and sets the 'id' attribute of the slider instance that is created", function() {
      var sliderId = "mySlider";

      testSlider = $("#testSlider1").slider({
        id : sliderId
      });

      var sliderInstanceHasExpectedId = $("#testSlider1").parent("div.slider").is("#" + sliderId);
      expect(sliderInstanceHasExpectedId).toBeTruthy();
    });

    it("generates multiple slider instances from selector", function() {

      $(".makeSlider").slider();

      var sliderInstancesExists = $(".makeSlider").parent().is(".slider");
      expect(sliderInstancesExists).toBeTruthy();

      var sliderInstancesCount = $(".makeSlider").parent(".slider").length;
      expect(sliderInstancesCount).toEqual(2);
    });

    it("reads and sets the 'min' option properly", function() {
      var minVal = -5;

      testSlider = $("#testSlider1").slider({
        min : minVal
      });
      testSlider.slider('setValue', minVal);

      var sliderValue = testSlider.slider('getValue');
      expect(sliderValue).toBe(minVal);
    });

    it("reads and sets the 'max' option properly", function() {
      var maxVal = 15;

      testSlider = $("#testSlider1").slider({
        max : maxVal
      });
      testSlider.slider('setValue', maxVal);

      var sliderValue = testSlider.slider('getValue');
      expect(sliderValue).toBe(maxVal);
    });

    describe("reads and sets the 'step' option properly", function() {
      // TODO: Don't really know how to properly test this
      expect(true).toBeTruthy();
    });

    it("reads and sets the 'orientation' option properly", function() {
      var orientationVal = "vertical";

      testSlider = $("#testSlider1").slider({
        orientation : orientationVal
      });
      
      var orientationClassApplied = $("#testSlider1").parent("div.slider").hasClass("slider-vertical");
      expect(orientationClassApplied).toBeTruthy();
    });

    it("reads and sets the 'value' option properly", function() {
      var val = 8;

      testSlider = $("#testSlider1").slider({
        value : val
      });
      testSlider.slider('setValue', val);

      var sliderValue = testSlider.slider('getValue');
      expect(sliderValue).toBe(val);
    });

    it("reads and sets the 'selection' option properly", function() {
      var selectionVal = "after",
          maxSliderVal = 10;

      testSlider = $("#testSlider1").slider({
        selection : selectionVal
      });
      testSlider.slider('setValue', maxSliderVal);

      var sliderSelectionWidthAtMaxValue = $("#testSlider1").siblings("div.slider-track").children("div.slider-selection").width();
      expect(sliderSelectionWidthAtMaxValue).toBe(0);
    });

    it("reads and sets the 'handle' option properly", function() {
      var handleVal = "triangle";

      testSlider = $("#testSlider1").slider({
        handle : handleVal
      });
      
      var handleIsSetToTriangle = $("#testSlider1").siblings("div.slider-track").children("div.slider-handle").hasClass("triangle");
      expect(handleIsSetToTriangle).toBeTruthy();
    });

    it("reads and sets the 'reversed' option properly", function() {
      var reversedVal = true,
          maxSliderVal = 10;

      testSlider = $("#testSlider1").slider({
        reversed : reversedVal
      });
      testSlider.slider('setValue', maxSliderVal);
      
      var sliderSelectionHeightAtMaxValue = $("#testSlider1").siblings("div.slider-track").children("div.slider-selection").width();
      expect(sliderSelectionHeightAtMaxValue).toBe(0);
    });

    it("reads and sets the 'formater' option properly", function() {
      var tooltipFormater = function(value) {
        return 'Current value: ' + value;
      };

      testSlider = $("#testSlider1").slider({
        formater : tooltipFormater
      });
      testSlider.slider('setValue', 9);

      var tooltipMessage = $("#testSlider1").siblings("div.tooltip").children("div.tooltip-inner").text();
      expect(tooltipMessage).toBe("Current value: 9");
    });

    it("reads and sets the 'enabled' option properly", function() {
      testSlider = $("#testSlider1").slider({
        enabled: false
      });
      var isEnabled = testSlider.slider('isEnabled');
      expect(isEnabled).not.toBeTruthy();
    });

    describe("reads and sets the 'tooltip' option properly", function() {
      it("tooltip is not shown if set to 'hide'", function() {
        testSlider = $("#testSlider1").slider({
          tooltip : "hide"
        });
        
        var tooltipIsHidden = $("#testSlider1").siblings("div.tooltip").hasClass("hide");
        expect(tooltipIsHidden).toBeTruthy();
      });

      it("tooltip is shown during sliding if set to 'show'", function() {
        testSlider = $("#testSlider1").slider({
          tooltip : "show"
        });

        var tooltipIsHidden = !($("#testSlider1").siblings("div.tooltip").hasClass("in"));
        expect(tooltipIsHidden).toBeTruthy();

        // Trigger hover
        $("#testSlider1").trigger('mouseenter');
        
        var tooltipIsShownAfterSlide = $("#testSlider1").siblings("div.tooltip").hasClass("in");
        expect(tooltipIsShownAfterSlide).toBeTruthy();
      });

      it("tooltip is always shown if set to 'always'", function() {
        testSlider = $("#testSlider1").slider({
          tooltip : "always"
        });
        
        var tooltipIsShown = $("#testSlider1").siblings("div.tooltip").hasClass("in");
        expect(tooltipIsShown).toBeTruthy();
      });

      it("defaults to 'show' option if invalid value is passed", function() {
        testSlider = $("#testSlider1").slider({
          tooltip : "invalid option value"
        });

        var tooltipIsHidden = !($("#testSlider1").siblings("div.tooltip").hasClass("in"));
        expect(tooltipIsHidden).toBeTruthy();

        // Trigger hover
        $("#testSlider1").trigger('mouseenter');
        
        var tooltipIsShownOnHover = $("#testSlider1").siblings("div.tooltip").hasClass("in");
        expect(tooltipIsShownOnHover).toBeTruthy();
      });
    });
  });


  describe("'setValue()' tests", function() {
    var formatInvalidInputMsg = function(invalidValue) { return "Invalid input value '" + invalidValue + "' passed in"; };

    describe("if slider is a single value slider", function() {
      beforeEach(function() {
        testSlider = $("#testSlider1").slider();
      });

      it("properly sets the value of the slider when given a numeric value", function() {
        var valueToSet = 5;
        testSlider.slider('setValue', valueToSet);

        var sliderValue = testSlider.slider('getValue');
        expect(sliderValue).toBe(valueToSet);
      });

      it("if a value passed in is greater than the max (10), the slider only goes to the max", function() {
        var maxValue = 10,
            higherThanSliderMaxVal = maxValue + 5;
      
        testSlider.slider('setValue', higherThanSliderMaxVal);

        var sliderValue = testSlider.slider('getValue');
        expect(sliderValue).toBe(maxValue);
      });

      it("if a value passed in is less than the min (0), the slider only goes to the min", function() {
        var minValue = 0,
            lowerThanSliderMaxVal = minValue - 5;
      
        testSlider.slider('setValue', lowerThanSliderMaxVal);

        var sliderValue = testSlider.slider('getValue');
        expect(sliderValue).toBe(minValue);
      });

      it("return value is jquery object", function() {
        var valueToSet = 8,
            result = testSlider.slider('setValue', valueToSet);

        expect(result.attr).toBeDefined();
        expect(result.attr('id')).toBe('testSlider1');
      });

      describe("when an invalid value type is passed in", function() {
        var invalidValue;
        
        beforeEach(function() {
          invalidValue = "a";
        });

        it("throws an error and does not alter the slider value", function() {
          var originalSliderValue = testSlider.slider('getValue');

          var settingValue = function() {
            testSlider.slider('setValue', invalidValue);
          };
          expect(settingValue).toThrow(new Error( formatInvalidInputMsg(invalidValue) ));

          var sliderValue = testSlider.slider('getValue');
          expect(sliderValue).toBe(originalSliderValue);
        });
      });
    });

    describe("if slider is a range slider", function() {
      beforeEach(function() {
        testSlider = $("#testSlider1").slider({
          value : [3, 8]
        });
      });

      it("properly sets the values if both within the max and min", function() {
        var valuesToSet = [5, 7];
        testSlider.slider('setValue', valuesToSet);

        var sliderValues = testSlider.slider('getValue');
        expect(sliderValues[0]).toBe(valuesToSet[0]);
        expect(sliderValues[1]).toBe(valuesToSet[1]);
      });

      describe("caps values to the min if they are set to be less than the min", function() {
        var minValue = -5,
            otherValue = 7;

        it("first value is capped to min", function() {
          testSlider.slider('setValue', [minValue, otherValue]);
          
          var sliderValues = testSlider.slider('getValue');
          expect(sliderValues[0]).toBe(0);
        });

        it("second value is capped to min", function() {
          testSlider.slider('setValue', [otherValue, minValue]);
          
          var sliderValues = testSlider.slider('getValue');
          expect(sliderValues[1]).toBe(0);
        });
      });

      describe("caps values to the max if they are set to be higher than the max", function() {
        var maxValue = 15,
            otherValue = 7;

        it("first value is capped to max", function() {
          testSlider.slider('setValue', [maxValue, otherValue]);
          
          var sliderValues = testSlider.slider('getValue');
          expect(sliderValues[0]).toBe(10);
        });

        it("second value is capped to max", function() {
          testSlider.slider('setValue', [otherValue, maxValue]);
          
          var sliderValues = testSlider.slider('getValue');
          expect(sliderValues[1]).toBe(10);
        });
      });

      describe("if either value is of invalid type", function() {
        var invalidValue = "a",
            otherValue = 7;

        it("first value is of invalid type", function() {
          var setSliderValueFn = function() {
            testSlider.slider('setValue', [invalidValue, otherValue]);
          };
          expect(setSliderValueFn).toThrow(new Error( formatInvalidInputMsg(invalidValue) ));
        });
        it("second value is of invalid type", function() {
          var setSliderValueFn = function() {
            testSlider.slider('setValue', [otherValue, invalidValue]);
          };
          expect(setSliderValueFn).toThrow(new Error( formatInvalidInputMsg(invalidValue) ));
        });
      });
    });
    
    it("throws an error if an element without a 'slider' data property tries to call setValue()", function() {
      var settingValue = function() {
        $("#testSlider1").slider('setValue', 3);
      };
      expect(settingValue).toThrow(new Error(callingContextNotSliderInstanceErrorMsg));
    });
  });


  describe("'getValue()' tests", function() {
    it("returns the current value of the slider", function() {
      testSlider = $("#testSlider1").slider();

      var valueToSet = 5;
      testSlider.slider('setValue', valueToSet);

      var sliderValue = testSlider.slider('getValue');
      expect(sliderValue).toBe(valueToSet);
    });

    it("throws an error if an element without a 'slider' data property tries to call getValue()", function() {
      var gettingValue = function() {
        $("#testSlider1").slider('getValue');
      };
      expect(gettingValue).toThrow(new Error(callingContextNotSliderInstanceErrorMsg));
    });
  });


  describe("'destroy()' tests", function() {
    describe("slider instance tests", function() {
      beforeEach(function() {
        testSlider = $("#testSlider1").slider();
      });

      it("removes the extra DOM elements associated with a slider", function() {
        testSlider.slider('destroy');

        var sliderParentElement = $("#testSlider1").parent('div.slider').length,
            sliderChildrenElements = $("#testSlider1").siblings('div.slider-track, div.tooltip').length;
        
        expect(sliderParentElement).toBe(0);
        expect(sliderChildrenElements).toBe(0);
      });

      it("return value is jquery object", function() {
        var result = testSlider.slider('destroy');

        expect(result.attr).toBeDefined();
        expect(result.attr('id')).toBe('testSlider1');
      });

      describe("unbinds all slider events", function() {
        var flag, evtName;

        beforeEach(function() {
          flag = false;
        });

        it("unbinds from 'slideStart' event", function() {
          evtName = 'slideStart';
          testSlider.on(evtName, function() {
            flag = true;
          });
          testSlider.slider('destroy');
          testSlider.trigger(evtName);
          expect(flag).toBeFalsy();
        });

        it("unbinds from 'slide' event", function() {
          evtName = 'slide';
          testSlider.on(evtName, function() {
            flag = true;
          });
          testSlider.slider('destroy');
          testSlider.trigger(evtName);
          expect(flag).toBeFalsy();
        });

        it("unbinds from 'slideStop' event", function() {
          evtName = 'slideStop';
          testSlider.on(evtName, function() {
            flag = true;
          });
          testSlider.slider('destroy');
          testSlider.trigger(evtName);
          expect(flag).toBeFalsy();
        });

        it("unbinds from 'slideChange' event", function() {
          evtName = 'slideChange';
          testSlider.on(evtName, function() {
            flag = true;
          });
          testSlider.slider('destroy');
          testSlider.trigger(evtName);
          expect(flag).toBeFalsy();
        });
      });

      afterEach(function() {
        testSlider = null;
      });
    });

    it("throws an error if an element without a 'slider' data property tries to call destroy()", function() {
      var destroySlider = function() {
        $("#testSlider1").slider('destroy');
      };
      expect(destroySlider).toThrow(new Error(callingContextNotSliderInstanceErrorMsg));
    });
  });

  describe("'enable()' tests", function() {
    it("correctly enables a slider", function() {
      testSlider = $("#testSlider1").slider({
        enabled: false
      });
      testSlider.slider("enable");
      var isEnabled = testSlider.slider("isEnabled");
      expect(isEnabled).toBeTruthy();
    });

    it("throws an error if an element without a 'slider' data property tries to call enable()", function() {
      var enableSlider = function() {
        $("#testSlider1").slider('enable');
      };
      expect(enableSlider).toThrow(new Error(callingContextNotSliderInstanceErrorMsg));
    });

    it("return value is jquery object", function() {
      testSlider = $("#testSlider1").slider({
        enabled: false
      });
      var result = testSlider.slider("enable");

      expect(result.attr).toBeDefined();
      expect(result.attr('id')).toBe('testSlider1');
    });
  });

  describe("'disable()' tests", function() {
    it("correctly disable a slider", function() {
      testSlider = $("#testSlider1").slider();
      testSlider.slider("disable");
      var isEnabled = testSlider.slider("isEnabled");
      expect(isEnabled).not.toBeTruthy();
    });

    it("throws an error if an element without a 'slider' data property tries to call disable()", function() {
      var disableSlider = function() {
        $("#testSlider1").slider('disable');
      };
      expect(disableSlider).toThrow(new Error(callingContextNotSliderInstanceErrorMsg));
    });

    it("return value is jquery object", function() {
      testSlider = $("#testSlider1").slider();
      var result = testSlider.slider("disable");

      expect(result.attr).toBeDefined();
      expect(result.attr('id')).toBe('testSlider1');
    });
  });

  describe("'toggle()' tests", function() {
    it("correctly enables a disabled slider", function() {
      testSlider = $("#testSlider1").slider({
        enabled: false
      });
      testSlider.slider("toggle");
      var isEnabled = testSlider.slider("isEnabled");
      expect(isEnabled).toBeTruthy();
    });

    it("correctly disables an enabled slider", function() {
      testSlider = $("#testSlider1").slider();
      testSlider.slider("toggle");
      var isEnabled = testSlider.slider("isEnabled");
      expect(isEnabled).not.toBeTruthy();
    });

    it("throws an error if an element without a 'slider' data property tries to call toggle()", function() {
      var toggleSlider = function() {
        $("#testSlider1").slider("toggle");
      };
      expect(toggleSlider).toThrow(new Error(callingContextNotSliderInstanceErrorMsg));
    });

    it("return value is jquery object", function() {
      testSlider = $("#testSlider1").slider();
      var result = testSlider.slider("toggle");

      expect(result.attr).toBeDefined();
      expect(result.attr('id')).toBe('testSlider1');
    });
  });

  describe("'isEnabled()' tests", function() {
    it("returns true for an enabled slider", function() {
      testSlider = $("#testSlider1").slider();
      var isEnabled = testSlider.slider("isEnabled");
      var hasDisabledClass = testSlider.parent().hasClass("slider") && testSlider.parent().hasClass("slider-disabled");
      expect(isEnabled).toBeTruthy();
      expect(hasDisabledClass).not.toBeTruthy();
    });

    it("returns false for a disabled slider", function() {
      testSlider = $("#testSlider1").slider({
        enabled: false
      });
      var isEnabled = testSlider.slider("isEnabled");
      var hasDisabledClass = testSlider.parent().hasClass("slider") && testSlider.parent().hasClass("slider-disabled");
      expect(isEnabled).not.toBeTruthy();
      expect(hasDisabledClass).toBeTruthy();
    });

    it("throws an error if an element without a 'slider' data property tries to call isEnabled()", function() {
      var sliderIsEnabled = function() {
        $("#testSlider1").slider("isEnabled");
      };
      expect(sliderIsEnabled).toThrow(new Error(callingContextNotSliderInstanceErrorMsg));
    });
  });

  it("throws an exception if the user tries to call a non-public method", function() {
    testSlider = $("#testSlider1").slider();
    var nonPublicMethodName = "calculateValue";
    var invokingNonPublicMethod = function() { testSlider.slider(nonPublicMethodName); };
    expect(invokingNonPublicMethod).toThrow(new Error("method '" + nonPublicMethodName + "()' does not exist for slider."));
  });

  it("get attribute", function() {
    testSlider = $("#testSlider1").slider();

    var sliderMaxValue = testSlider.slider('getAttribute', 'max');
    expect(sliderMaxValue).toBe(10);
  });

  it("changes slider from basic to range", function() {
    testSlider = $("#makeRangeSlider").slider();
    testSlider.slider('setAttribute', 'range', true).slider('refresh');

    var isRangeSlider = $("#changeOrientationSlider").parent("div.slider").find('.slider-handle').last().hasClass('hide');
    expect(isRangeSlider).toBeFalsy();
  });

  afterEach(function() {
    if(testSlider) {
      testSlider.slider('destroy');
      testSlider = null;
    }
  });

});