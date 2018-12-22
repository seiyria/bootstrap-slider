describe("Event Tests", function() {
  var testSlider, flag, mouse;

  beforeEach(function() {
    flag = false;
    mouse = document.createEvent('MouseEvents');
  });

  describe("JQuery version", function() {
    beforeEach(function() {
      testSlider = $("#testSlider2").slider({
        value: 1
      });
    });

    afterEach(function() {
      if(testSlider) {
        testSlider.slider('destroy');
        testSlider = null;
      }
    });

    describe("Mouse Events", function() {

      it("'slideStart' event is triggered properly and can be binded to", function(done) {
        testSlider.on('slideStart', function() {
          done();
        });
        testSlider.data('slider')._mousedown(mouse);
      });

      it("'slide' event is triggered properly and can be binded to", function(done) {
        testSlider.on('slide', function() {
          done();
        });
        testSlider.data('slider')._mousemove(mouse);
      });

      it("'slide' event sets the right value on the input", function(done) {
        testSlider.on('slide', function() {
          expect(isNaN(testSlider.val())).not.toBeTruthy();
          done();
        });
        testSlider.data('slider')._mousemove(mouse);
      });

      it("'slide' event value and input value properties are synchronous", function(done) {
        testSlider.on('slide', function(e) {
          expect(e.value.toString()).toEqual(this.value);
          done();
        });
        testSlider.slider("setValue", 3, true, false);
      });

      it("'change' event value and input value properties are synchronous", function(done) {
        testSlider.on('change', function(e) {
          expect(e.value.newValue.toString()).toEqual(testSlider.val());
          done();
        });
        testSlider.slider("setValue", 3, false, true);
      });

      it("'slideStop' event is triggered properly and can be binded to", function(done) {
        testSlider.on('slideStop', function() {
          done();
        });
        testSlider.data('slider')._mouseup(mouse);
      });

      it("slider should not have duplicate events after calling 'refresh'", function(done) {
        testSlider.on('slideStop', function() {
          done();
        });
        testSlider.slider('refresh');
        testSlider.data('slider')._mouseup(mouse);
      });

      describe("Disabled Slider Event Tests", function() {
        var spy;

        beforeEach(function() {
          testSlider.slider('disable');
          spy = jasmine.createSpy('spy');
        });

        it("should not trigger 'slideStart' event when disabled", function(done) {
          testSlider.on('slideStart', spy);
          testSlider.data('slider')._mousedown(mouse);
          window.setTimeout(function() {
            expect(spy).not.toHaveBeenCalled();
            done();
          }, 0);
        });

        it("should not trigger 'slide' event when disabled", function(done) {
          testSlider.on('slide', spy);
          testSlider.data('slider')._mousemove(mouse);
          window.setTimeout(function() {
            expect(spy).not.toHaveBeenCalled();
            done();
          }, 0);
        });

        it("should not trigger 'slideStop' event when disabled", function(done) {
          testSlider.on('slideStop', spy);
          testSlider.data('slider')._mouseup(mouse);
          window.setTimeout(function() {
            expect(spy).not.toHaveBeenCalled();
            done();
          }, 0);
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

      it("'slideStart' event is triggered properly and can be binded to", function(done) {
        touch.initEvent("touchstart");

        testSlider.on('slideStart', function() {
          done();
        });
        testSlider.data('slider')._mousedown(touch);
      });

      it("'slide' event is triggered properly and can be binded to", function(done) {
        touch.initEvent("touchmove");

        testSlider.on('slide', function() {
          done();
        });
        testSlider.data('slider')._mousemove(touch);
      });

      it("'slide' event sets the right value on the input", function(done) {
        touch.initEvent("touchmove");

        testSlider.on('slide', function() {
          expect(isNaN(testSlider.val())).not.toBeTruthy();
          done();
        });
        testSlider.data('slider')._mousemove(touch);
      });

      it("'slide' event value and input value properties are synchronous", function(done) {
        touch.initEvent("touchmove");

        testSlider.on('slide', function(e) {
          expect(e.value.toString()).toEqual(testSlider.val());
          done();
        });
        testSlider.slider("setValue", 3, true, false);
      });

      it("'change' event value and input value properties are synchronous", function(done) {
        touch.initEvent("touchmove");

        testSlider.on('change', function(e) {
          expect(e.value.newValue.toString()).toEqual(testSlider.val());
          done();
        });
        testSlider.slider("setValue", 3, false, true);
      });

      it("'slideStop' event is triggered properly and can be binded to", function(done) {
        touch.initEvent("touchstop");

        testSlider.on('slideStop', function() {
          done();
        });
        testSlider.data('slider')._mouseup(mouse);
      });


      it("slider should not have duplicate events after calling 'refresh'", function(done) {
        touch.initEvent("touchstop");

        testSlider.on('slideStop', function() {
          done();
        });
        testSlider.slider('refresh');
        testSlider.data('slider')._mouseup(mouse);
      });

      it("slider should not bind multiple touchstart events after calling 'refresh'", function(done) {
        touch.initEvent("touchstart", true, true);

        testSlider.on('slideStart', function() {
          done();
        });
        testSlider.slider('refresh');
        $('#testSlider2').prev('div.slider').find('.slider-handle').get(0).dispatchEvent(touch);
      });

      describe("Disabled Slider Event Tests", function() {
        var spy;

        beforeEach(function() {
          testSlider.slider('disable');
          spy = jasmine.createSpy('spy');
        });

        it("should not trigger 'slideStart' event when disabled", function(done) {
          touch.initEvent("touchstart");

          testSlider.on('slideStart', spy);
          testSlider.data('slider')._mousedown(touch);

          window.setTimeout(function() {
            expect(spy).not.toHaveBeenCalled();
            done();
          }, 0);
        });

        it("should not trigger 'slide' event when disabled", function(done) {
          touch.initEvent("touchmove");

          testSlider.on('slide', spy);
          testSlider.data('slider')._mousemove(touch);

          window.setTimeout(function() {
            expect(spy).not.toHaveBeenCalled();
            done();
          });
        }, 0);

        it("should not trigger 'slideStop' event when disabled", function(done) {
          touch.initEvent("touchend");

          testSlider.on('slideStop', spy);
          testSlider.data('slider')._mouseup(mouse);

          window.setTimeout(function() {
            expect(spy).not.toHaveBeenCalled();
            done();
          }, 0);
        });
      });

    });

    describe("Enabled/Disabled tests", function() {
      it("'slideDisabled' event is triggered properly and can be binded to", function(done) {
        testSlider.on('slideDisabled', function() {
          done();
        });
        testSlider.slider('disable');
      });

      it("'slideDisabled' event is triggered properly and can be binded to", function(done) {
          testSlider.on('slideEnabled', function() {
            done();
          });
          testSlider.slider('disable');
          testSlider.slider('enable');
      });

      it("'change' event is triggered properly and can be binded to", function(done) {
        testSlider.on('change', function() {
          done();
        });
        testSlider.slider("setValue", 3, false, true);
      });
    });

  }); // End of JQuery version tests

  describe("CommonJS version", function() {
    describe("Event repetition tests", function() {
      var testSlider, numTimesFired;

      beforeEach(function() {
        testSlider = new Slider("#testSlider2");
        numTimesFired = 0;
      });

      afterEach(function() {
        testSlider.destroy();
      });

      it("'slide' event is triggered only once per slide action", function(done) {
        testSlider.on('slide', function() {
          done();
        });
        testSlider._mousemove(mouse);
      });

      it("'slideStart' event is triggered only once per slide action", function(done) {
        testSlider.on('slideStart', function() {
          done();
        });
        testSlider._mousedown(mouse);
      });

      it("'slideStop' event is triggered only once per slide action", function(done) {
        testSlider.on('slideStop', function() {
          done();
        });
        testSlider._mouseup(mouse);
      });

      it("'change' event is triggered only once per value change action", function(done) {
        testSlider.on('change', function() {
          done();
        });
        testSlider.setValue(3, false, true);
      });
    });
  }); // End of common JS tests

}); // End of spec
