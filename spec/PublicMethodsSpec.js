describe("Public Method Tests", function() {
  var testSlider;

  describe("slider constructor", function() {
    it("reads and sets the 'id' attribute of the slider instance that is created", function() {
      var sliderId = "mySlider";

      testSlider = $("#testSlider1").slider({
        id : sliderId
      });

      var sliderInstanceHasExpectedId = $("#testSlider1").parent("div.slider").is("#" + sliderId);
      expect(sliderInstanceHasExpectedId).toBeTruthy();
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

    it("reads and sets the 'tooltip' option properly", function() {
      var tooltipVal = "hide";

      testSlider = $("#testSlider1").slider({
        tooltip : tooltipVal
      });
      
      var tooltipIsHidden = $("#testSlider1").siblings("div.tooltip").hasClass("hide");
      expect(tooltipIsHidden).toBeTruthy();
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
  });


  describe("'getValue()' tests", function() {
    beforeEach(function() {
      testSlider = $("#testSlider1").slider();
    });

    it("returns the current value of the slider", function() {
      var valueToSet = 5;
      testSlider.slider('setValue', valueToSet);

      var sliderValue = testSlider.slider('getValue');
      expect(sliderValue).toBe(valueToSet);
    });
  });


  describe("'destroy()' tests", function() {
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

  it("throws an exception if the user tries to call a non-public method", function() {
    testSlider = $("#testSlider1").slider();
    var nonPublicMethodName = "calculateValue";
    var invokingNonPublicMethod = function() { testSlider.slider(nonPublicMethodName); };
    expect(invokingNonPublicMethod).toThrow(new Error("method '" + nonPublicMethodName + "()' does not exist for slider."));
  });


  afterEach(function() {
    if(testSlider) {
      testSlider.slider('destroy');
      testSlider = null;
    }
  });

});