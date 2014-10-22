describe("Event Tests", function() {
  var testSlider, flag;

  beforeEach(function() {
    testSlider = $("#testSlider2").slider();
    flag = false;
  });

  describe("Mouse Events", function() {
    var mouse;

    beforeEach(function() {
      mouse = document.createEvent('MouseEvents');
    });

    it("'slideStart' event is triggered properly and can be binded to", function() {
      testSlider.on('slideStart', function() {
        flag = true;
      });
      testSlider.data('slider')._mousedown(mouse);
      expect(flag).toBeTruthy();
    });

    it("'slide' event is triggered properly and can be binded to", function() {
      testSlider.on('slide', function() {
        flag = true;
      });
      testSlider.data('slider')._mousemove(mouse);
      expect(flag).toBeTruthy();
    });

    it("'slide' event sets the right value on the input", function() {
      testSlider.on('slide', function() {
        flag = true;
        expect(isNaN(testSlider.val())).not.toBeTruthy();
      });
      testSlider.data('slider')._mousemove(mouse);
      expect(flag).toBeTruthy();
    });

    it("'slideStop' event is triggered properly and can be binded to", function() {
      testSlider.on('slideStop', function() {
        flag = true;
      });
      testSlider.data('slider')._mouseup();
      expect(flag).toBeTruthy();
    });

    it("slider should not have duplicate events after calling 'refresh'", function() {
      flag = 0;
      testSlider.on('slideStop', function() {
        flag += 1;
      });
      testSlider.slider('refresh');
      testSlider.data('slider')._mouseup();
      expect(flag).toEqual(1);
    });

    describe("Disabled Slider Event Tests", function() {
      beforeEach(function() {
        testSlider.slider('disable');
      });

      it("should not trigger 'slideStart' event when disabled", function() {
        testSlider.on('slideStart', function() {
          flag = true;
        });
        testSlider.data('slider')._mousedown(mouse);
        expect(flag).not.toBeTruthy();
      });

      it("should not trigger 'slide' event when disabled", function() {
        testSlider.on('slide', function() {
          flag = true;
        });
        testSlider.data('slider')._mousemove(mouse);
        expect(flag).not.toBeTruthy();
      });

      it("should not trigger 'slideStop' event when disabled", function() {
        testSlider.on('slideStop', function() {
          flag = true;
        });
        testSlider.data('slider')._mouseup();
        expect(flag).not.toBeTruthy();
      });
    });

  });

  describe("Touch Events", function() {
    var touch;

    beforeEach(function() {
      touch = document.createEvent('Event');
      var dummyTouchEvent = document.createEvent('MouseEvents');
      touch.touches = [dummyTouchEvent];
      window.ontouchstart = true;
    });

    afterEach(function() {
      window.ontouchstart = null;
    });

    it("'slideStart' event is triggered properly and can be binded to", function() {
      touch.initEvent("touchstart");

      testSlider.on('slideStart', function() {
        flag = true;
      });
      testSlider.data('slider')._mousedown(touch);

      expect(flag).toBeTruthy();
    });

    it("'slide' event is triggered properly and can be binded to", function() {
      touch.initEvent("touchmove");
      
      testSlider.on('slide', function() {
        flag = true;
      });
      testSlider.data('slider')._mousemove(touch);
      
      expect(flag).toBeTruthy();
    });

    it("'slide' event sets the right value on the input", function() {
      touch.initEvent("touchmove");

      testSlider.on('slide', function() {
        flag = true;
        expect(isNaN(testSlider.val())).not.toBeTruthy();
      });
      testSlider.data('slider')._mousemove(touch);
      
      expect(flag).toBeTruthy();
    });

    it("'slideStop' event is triggered properly and can be binded to", function() {
      touch.initEvent("touchstop");

      testSlider.on('slideStop', function() {
        flag = true;
      });
      testSlider.data('slider')._mouseup();
      
      expect(flag).toBeTruthy();
    });

    it("slider should not have duplicate events after calling 'refresh'", function() {
      touch.initEvent("touchstop");
      flag = 0;

      testSlider.on('slideStop', function() {
        flag += 1;
      });
      testSlider.slider('refresh');
      testSlider.data('slider')._mouseup();

      expect(flag).toEqual(1);
    });

    it("slider should not bind multiple touchstart events after calling 'refresh'", function() {
      touch.initEvent("touchstart", true, true);
      flag = 0;

      testSlider.on('slideStart', function() {
        flag += 1;
      });
      testSlider.slider('refresh');
      $('.slider .slider-handle').get(0).dispatchEvent(touch);

      expect(flag).toEqual(1);
    });

    describe("Disabled Slider Event Tests", function() {
      beforeEach(function() {
        testSlider.slider('disable');
      });

      it("should not trigger 'slideStart' event when disabled", function() {
        touch.initEvent("touchstart");

        testSlider.on('slideStart', function() {
          flag = true;
        });
        testSlider.data('slider')._mousedown(touch);

        expect(flag).not.toBeTruthy();
      });

      it("should not trigger 'slide' event when disabled", function() {
        touch.initEvent("touchmove");

        testSlider.on('slide', function() {
          flag = true;
        });
        testSlider.data('slider')._mousemove(touch);

        expect(flag).not.toBeTruthy();
      });

      it("should not trigger 'slideStop' event when disabled", function() {
        touch.initEvent("touchend");

        testSlider.on('slideStop', function() {
          flag = true;
        });
        testSlider.data('slider')._mouseup();
        
        expect(flag).not.toBeTruthy();
      });

    });

  });

  describe("Enabled/Disabled tests", function() {
    it("'slideDisabled' event is triggered properly and can be binded to", function() {
      testSlider.on('slideDisabled', function() {
        flag = true;
      });
      testSlider.slider('disable');
      expect(flag).toBeTruthy();
    });

    it("'slideDisabled' event is triggered properly and can be binded to", function() {
      testSlider.on('slideEnabled', function() {
        flag = true;
      });
      testSlider.slider('disable');
      testSlider.slider('enable');
      expect(flag).toBeTruthy();
    });
  });

  afterEach(function() {
    if(testSlider) {
      testSlider.slider('destroy');
      testSlider = null;
    }
  });

});
