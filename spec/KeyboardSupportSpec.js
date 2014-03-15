describe("Keyboard Support Tests", function() {
  var testSlider,
      handle1,
      handle2,
      initialMinVal = 0,
      initialMaxVal = 10,
      initialStepVal = 1,
      initialSliderVal = 5;


  describe("Clicking on slider handle automatically gives it focus", function() {
    
    beforeEach(function() {
      testSlider = $("#testSlider1").slider({
        id: 'testSlider'
      });
      handle1 = $("#testSlider").find(".slider-track > .slider-handle:first");
    });

    it("clicking on handle1 gives focus to handle1", function() {
      var focusWasTriggered = false;
      handle1.focus(function() {
        focusWasTriggered = true;
        expect(focusWasTriggered).toBeTruthy();
      });
      handle1.mousedown();
    });
  });

  describe("When slider handle has TAB focus", function() {

    it("should display it's tooltip if 'tooltip' option is set to 'show'", function() {
      testSlider = $("#testSlider1").slider({
        id: 'testSlider',
        tooltip: 'show'
      });
      handle1 = $("#testSlider").find(".slider-track > .slider-handle:first");

      // Check for no tooltip before focus
      var tooltipIsShown = $("#testSlider").find("div.tooltip").hasClass("in");
      expect(tooltipIsShown).toBeFalsy();
      
      handle1.focus();

      // Tooltip should be present after focus
      tooltipIsShown = $("#testSlider").find("div.tooltip").hasClass("in");
      expect(tooltipIsShown).toBeTruthy();
    });

    it("should not display it's tooltip if 'tooltip' option is set to 'hide'", function() {
      testSlider = $("#testSlider1").slider({
        id: 'testSlider',
        tooltip: 'hide'
      });
      handle1 = $("#testSlider").find(".slider-track > .slider-handle:first");

      // Check for hidden tooltip before focus
      var tooltipIsHidden = $("#testSlider1").siblings("div.tooltip").hasClass("hide");
      expect(tooltipIsHidden).toBeTruthy();
      
      handle1.focus();

      // Tooltip should remain hidden after focus
      tooltipIsHidden = $("#testSlider1").siblings("div.tooltip").hasClass("hide");
      expect(tooltipIsHidden).toBeTruthy();
    });

    it("should not affect the tooltip display if 'tooltip' option is set to 'always'", function() {
      testSlider = $("#testSlider1").slider({
        id: 'testSlider',
        tooltip: 'always'
      });
      handle1 = $("#testSlider").find(".slider-track > .slider-handle:first");

      // Check for shown tooltip before focus
      var tooltipIsShown = $("#testSlider1").siblings("div.tooltip").hasClass("in");
      expect(tooltipIsShown).toBeTruthy();
      
      handle1.focus();

      // Tooltip should remain present after focus
      tooltipIsShown = $("#testSlider1").siblings("div.tooltip").hasClass("in");
      expect(tooltipIsShown).toBeTruthy();
    });
  });


  describe("For horizontal sliders where its handle has focus", function() {

    beforeEach(function() {
      // Initialize the slider
      testSlider = $("#testSlider1").slider({
        id: 'testSlider',
        orientation: 'horizontal',
        min: initialMinVal,
        max: initialMaxVal,
        step: initialStepVal,
        value: initialSliderVal
      });
      // Focus on handle1
      handle1 = $("#testSlider").find(".slider-track > .slider-handle:first");
      handle1.focus();
    });

    it("moves to the left by the 'step' value when the LEFT arrow key is pressed", function() {
      handle1.on("keydown", function() {
        var sliderValue = testSlider.slider('getValue');
        var expectedSliderValue = initialSliderVal - initialStepVal;
        
        expect(sliderValue).toBe(expectedSliderValue);
      });

      var leftArrowKeyDownEvent = $.Event('keydown');
      leftArrowKeyDownEvent.which = 37;
      handle1.trigger(leftArrowKeyDownEvent);
    });

    it("moves to the right by the 'step' value when the RIGHT arrow key is pressed", function() {
      handle1.on("keydown", function() {
        var sliderValue = testSlider.slider('getValue');
        var expectedSliderValue = initialSliderVal + initialStepVal;
        
        expect(sliderValue).toBe(expectedSliderValue);
      });

      var rightArrowKeyDownEvent = $.Event('keydown');
      rightArrowKeyDownEvent.which = 39;
      handle1.trigger(rightArrowKeyDownEvent);
    });

    it("moves to the left by the 'step' value when the DOWN arrow key is pressed", function() {
      handle1.on("keydown", function() {
        var sliderValue = testSlider.slider('getValue');
        var expectedSliderValue = initialSliderVal - initialStepVal;
        
        expect(sliderValue).toBe(expectedSliderValue);
      });

      var downArrowKeyDownEvent = $.Event('keydown');
      downArrowKeyDownEvent.which = 40;
      handle1.trigger(downArrowKeyDownEvent);
    });

    it("moves to the right by the 'step' value when the UP arrow key is pressed", function() {
      handle1.on("keydown", function() {
        var sliderValue = testSlider.slider('getValue');
        var expectedSliderValue = initialSliderVal + initialStepVal;
        
        expect(sliderValue).toBe(expectedSliderValue);
      });

      var upArrowKeyDownEvent = $.Event('keydown');
      upArrowKeyDownEvent.which = 38;
      handle1.trigger(upArrowKeyDownEvent);
    });
  });


  describe("For vertical sliders where its handle has focus", function() {
    
    beforeEach(function() {
      // Initialize the slider
      testSlider = $("#testSlider1").slider({
        id: 'testSlider',
        orientation: 'vertical',
        min: initialMinVal,
        max: initialMaxVal,
        step: initialStepVal,
        value: initialSliderVal
      });
      // Focus on handle1
      handle1 = $("#testSlider").find(".slider-track > .slider-handle:first");
      handle1.focus();
    });

    it("moves down by the 'step' value when the LEFT arrow key is pressed", function() {
      handle1.on("keydown", function() {
        var sliderValue = testSlider.slider('getValue');
        var expectedSliderValue = initialSliderVal - initialStepVal;
        
        expect(sliderValue).toBe(expectedSliderValue);
      });

      var leftArrowKeyDownEvent = $.Event('keydown');
      leftArrowKeyDownEvent.which = 37;
      handle1.trigger(leftArrowKeyDownEvent);
    });

    it("moves up by the 'step' value when the RIGHT arrow key is pressed", function() {
      handle1.on("keydown", function() {
        var sliderValue = testSlider.slider('getValue');
        var expectedSliderValue = initialSliderVal + initialStepVal;
        
        expect(sliderValue).toBe(expectedSliderValue);
      });

      var rightArrowKeyDownEvent = $.Event('keydown');
      rightArrowKeyDownEvent.which = 39;
      handle1.trigger(rightArrowKeyDownEvent);
    });

    it("moves down by the 'step' value when the DOWN arrow key is pressed", function() {
      handle1.on("keydown", function() {
        var sliderValue = testSlider.slider('getValue');
        var expectedSliderValue = initialSliderVal - initialStepVal;
        
        expect(sliderValue).toBe(expectedSliderValue);
      });

      var downArrowKeyDownEvent = $.Event('keydown');
      downArrowKeyDownEvent.which = 40;
      handle1.trigger(downArrowKeyDownEvent);
    });

    it("moves up by the 'step' value when the UP arrow key is pressed", function() {
      handle1.on("keydown", function() {
        var sliderValue = testSlider.slider('getValue');
        var expectedSliderValue = initialSliderVal + initialStepVal;
        
        expect(sliderValue).toBe(expectedSliderValue);
      });

      var upArrowKeyDownEvent = $.Event('keydown');
      upArrowKeyDownEvent.which = 38;
      handle1.trigger(upArrowKeyDownEvent);
    });
  });


  describe("For a reversed slider (regardless of 'orientation')", function() {
      
    beforeEach(function() {
      // Initialize the slider
      testSlider = $("#testSlider1").slider({
        id: 'testSlider',
        reversed: true,
        min: initialMinVal,
        max: initialMaxVal,
        step: initialStepVal,
        value: initialSliderVal
      });
      // Focus on handle1
      handle1 = $("#testSlider").find(".slider-track > .slider-handle:first");
      handle1.focus();
    });

    it("moves to the left by the 'step' value when the LEFT arrow key is pressed", function() {
      handle1.on("keydown", function() {
        var sliderValue = testSlider.slider('getValue');
        var expectedSliderValue = initialSliderVal - initialStepVal;
        
        expect(sliderValue).toBe(expectedSliderValue);
      });

      var leftArrowKeyDownEvent = $.Event('keydown');
      leftArrowKeyDownEvent.which = 37;
      handle1.trigger(leftArrowKeyDownEvent);
    });

    it("moves to the right by the 'step' value when the RIGHT arrow key is pressed", function() {
      handle1.on("keydown", function() {
        var sliderValue = testSlider.slider('getValue');
        var expectedSliderValue = initialSliderVal + initialStepVal;
        
        expect(sliderValue).toBe(expectedSliderValue);
      });

      var rightArrowKeyDownEvent = $.Event('keydown');
      rightArrowKeyDownEvent.which = 39;
      handle1.trigger(rightArrowKeyDownEvent);
    });

    it("moves to the left by the 'step' value when the DOWN arrow key is pressed", function() {
      handle1.on("keydown", function() {
        var sliderValue = testSlider.slider('getValue');
        var expectedSliderValue = initialSliderVal - initialStepVal;
        
        expect(sliderValue).toBe(expectedSliderValue);
      });

      var downArrowKeyDownEvent = $.Event('keydown');
      downArrowKeyDownEvent.which = 40;
      handle1.trigger(downArrowKeyDownEvent);
    });

    it("moves to the right by the 'step' value when the UP arrow key is pressed", function() {
      handle1.on("keydown", function() {
        var sliderValue = testSlider.slider('getValue');
        var expectedSliderValue = initialSliderVal + initialStepVal;
        
        expect(sliderValue).toBe(expectedSliderValue);
      });

      var upArrowKeyDownEvent = $.Event('keydown');
      upArrowKeyDownEvent.which = 38;
      handle1.trigger(upArrowKeyDownEvent);
    });
  });


  describe("For a range slider (regardless of 'orientation')", function() {
    
    beforeEach(function() {
      // Initialize the slider
      testSlider = $("#testSlider1").slider({
        id: 'testSlider',
        min: initialMinVal,
        max: initialMaxVal,
        step: initialStepVal,
        value: [initialSliderVal, initialSliderVal]
      });
    });

    describe("when handle1 tries to overtake handle2 from the left", function() {
      beforeEach(function() {
        handle1 = $("#testSlider").find(".slider-track > .slider-handle:first");
        handle1.focus();
      });

      it("handle2 moves to the right by the step value", function() {
        handle1.on("keydown", function() {
          var sliderValue = testSlider.slider('getValue');
          var expectedSliderValue = initialSliderVal + initialStepVal;
          
          expect(sliderValue[1]).toBe(expectedSliderValue);
        });

        var rightArrowKeyDownEvent = $.Event('keydown');
        rightArrowKeyDownEvent.which = 39;
        handle1.trigger(rightArrowKeyDownEvent);
      });

      it("handle1's value remains unchanged", function() {
        var sliderValue = testSlider.slider('getValue');

        handle1.on("keydown", function() {
          expect(sliderValue[0]).toBe(initialSliderVal);
        });

        var rightArrowKeyDownEvent = $.Event('keydown');
        rightArrowKeyDownEvent.which = 39;
        handle1.trigger(rightArrowKeyDownEvent);
      });
    });

    describe("when handle2 tries to overtake handle1 from the right", function() {
      beforeEach(function() {
        handle2 = $("#testSlider").find(".slider-track > .slider-handle:eq( 1 )");
        handle2.focus();
      });

      it("handle1 moves to the left by the step value", function() {
        handle2.on("keydown", function() {
          var sliderValue = testSlider.slider('getValue');
          var expectedSliderValue = initialSliderVal - initialStepVal;
          
          expect(sliderValue[0]).toBe(expectedSliderValue);
        });

        var leftArrowKeyDownEvent = $.Event('keydown');
        leftArrowKeyDownEvent.which = 37;
        handle2.trigger(leftArrowKeyDownEvent);
      });

      it("handle2's value remains unchanged", function() {
        var sliderValue = testSlider.slider('getValue');

        handle2.on("keydown", function() {
          expect(sliderValue[1]).toBe(initialSliderVal);
        });

        var leftArrowKeyDownEvent = $.Event('keydown');
        leftArrowKeyDownEvent.which = 37;
        handle2.trigger(leftArrowKeyDownEvent);
      });
    });
  });

  afterEach(function() {
    if(testSlider) { testSlider.slider('destroy'); }
  });
});