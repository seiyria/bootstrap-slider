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
      var spy;

      beforeEach(function() {
        spy = jasmine.createSpy('spy');
      });

      it("'slideStart' event is triggered properly and can be binded to", function(done) {
        testSlider.on('slideStart', spy);
        testSlider.data('slider')._mousedown(mouse);
        setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });
      });

      it("'slide' event is triggered properly and can be binded to", function(done) {
        testSlider.on('slide', spy);
        testSlider.data('slider')._mousemove(mouse);
        setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });
      });

      it("'slide' event sets the right value on the input", function(done) {
        testSlider.on('slide', function() {
          expect(isNaN(testSlider.val())).not.toBeTruthy();
          done();
        });
        testSlider.data('slider')._mousemove(mouse);
      });

      it("'slide' event value and input value properties are synchronous", function() {
        testSlider.on('slide', function(e) {
          expect(e.value.toString()).toEqual(this.value);
        });
        testSlider.slider("setValue", 3, true, false);
      });

      it("'change' event value and input value properties are synchronous", function() {
        testSlider.on('change', function(e) {
          expect(e.value.newValue.toString()).toEqual(testSlider.val());
        });
        testSlider.slider("setValue", 3, false, true);
      });

      it("'slideStop' event is triggered properly and can be binded to", function(done) {
        testSlider.on('slideStop', spy);
        testSlider.data('slider')._mouseup(mouse);
        setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });
      });

      it("slider should not have duplicate events after calling 'refresh'", function(done) {
        var numTimesFired = 0;
        var obj = {
            addOne: function() {
              numTimesFired++;
            }
        };
        spyOn(obj, 'addOne').and.callThrough();

        testSlider.on('slideStop', obj.addOne);
        testSlider.slider('refresh');
        testSlider.data('slider')._mouseup(mouse);

        setTimeout(function() {
          expect(numTimesFired).toBe(1);
          expect(obj.addOne.calls.count()).toBe(1);
          done();
        });
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
          });
        });

        it("should not trigger 'slide' event when disabled", function(done) {
          testSlider.on('slide', spy);
          testSlider.data('slider')._mousemove(mouse);
          window.setTimeout(function() {
            expect(spy).not.toHaveBeenCalled();
            done();
          });
        });

        it("should not trigger 'slideStop' event when disabled", function(done) {
          testSlider.on('slideStop', spy);
          testSlider.data('slider')._mouseup(mouse);
          window.setTimeout(function() {
            expect(spy).not.toHaveBeenCalled();
            done();
          });
        });
      });

    });

    describe("Touch Events", function() {
      var touch;
      var spy;

      beforeEach(function() {
        touch = document.createEvent('Event');
        var dummyTouchEvent = document.createEvent('MouseEvents');
        touch.touches = [dummyTouchEvent];
        window.ontouchstart = true;
        spy = jasmine.createSpy('spy');
      });

      afterEach(function() {
        window.ontouchstart = null;
      });

      it("'slideStart' event is triggered properly and can be binded to", function(done) {
        touch.initEvent("touchstart");
        testSlider.on('slideStart', spy);
        testSlider.data('slider')._mousedown(touch);
        window.setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });
      });

      it("'slide' event is triggered properly and can be binded to", function(done) {
        touch.initEvent("touchmove");
        testSlider.on('slide', spy);
        testSlider.data('slider')._mousemove(touch);
        window.setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });
      });

      it("'slide' event sets the right value on the input", function(done) {
        touch.initEvent("touchmove");

        testSlider.on('slide', function() {
          expect(isNaN(testSlider.val())).not.toBeTruthy();
          done();
        });
        testSlider.data('slider')._mousemove(touch);
      });

      it("'slide' event value and input value properties are synchronous", function() {
        testSlider.on('slide', function(e) {
          expect(e.value.toString()).toEqual(testSlider.val());
        });
        testSlider.slider("setValue", 3, true, false);
      });

      it("'change' event value and input value properties are synchronous", function() {
        testSlider.on('change', function(e) {
          expect(e.value.newValue.toString()).toEqual(testSlider.val());
        });
        testSlider.slider("setValue", 3, false, true);
      });

      it("'slideStop' event is triggered properly and can be binded to", function(done) {
        touch.initEvent("touchstop");
        testSlider.on('slideStop', spy);
        testSlider.data('slider')._mouseup(mouse);
        window.setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });
      });


      it("slider should not have duplicate events after calling 'refresh'", function(done) {
        touch.initEvent("touchstop");
        testSlider.on('slideStop', spy);
        testSlider.slider('refresh');
        testSlider.data('slider')._mouseup(mouse);
        window.setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });
      });

      it("slider should not bind multiple touchstart events after calling 'refresh'", function(done) {
        flag = 0;
        var obj = {
            addOne: function() {
            flag++;
            }
        };
        spyOn(obj, 'addOne').and.callThrough();

        touch.initEvent("touchstart", true, true);

        testSlider.on('slideStart', obj.addOne);

        testSlider.slider('refresh');
        $('#testSlider2').prev('div.slider').find('.slider-handle').get(0).dispatchEvent(touch);

        window.setTimeout(function() {
            expect(flag).toBe(1);
            expect(obj.addOne.calls.count()).toBe(1);
            done();
        });
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
          });
        });

        it("should not trigger 'slide' event when disabled", function(done) {
          touch.initEvent("touchmove");

          testSlider.on('slide', spy);
          testSlider.data('slider')._mousemove(touch);

          window.setTimeout(function() {
            expect(spy).not.toHaveBeenCalled();
            done();
          });
        });

        it("should not trigger 'slideStop' event when disabled", function(done) {
          touch.initEvent("touchend");

          testSlider.on('slideStop', spy);
          testSlider.data('slider')._mouseup(mouse);

          window.setTimeout(function() {
            expect(spy).not.toHaveBeenCalled();
            done();
          });
        });
      });

    });

    describe("Enabled/Disabled tests", function() {
      var spy;

      beforeEach(function() {
        spy = jasmine.createSpy('spy');
      });

      it("'slideDisabled' event is triggered properly and can be binded to", function(done) {
        testSlider.on('slideDisabled', spy);
        testSlider.slider('disable');
        window.setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });
      });

      it("'slideDisabled' event is triggered properly and can be binded to", function(done) {
          testSlider.on('slideEnabled', spy);
          testSlider.slider('disable');
          testSlider.slider('enable');
          window.setTimeout(function() {
            expect(spy).toHaveBeenCalled();
            done();
          });
      });

      it("'change' event is triggered properly and can be binded to", function(done) {
        testSlider.on('change', spy);
        testSlider.slider("setValue", 3, false, true);
        window.setTimeout(function() {
          expect(spy).toHaveBeenCalled();
          done();
        });
      });
    });

  }); // End of JQuery version tests

  describe("CommonJS version", function() {
    describe("Event repetition tests", function() {
      var testSlider, numTimesFired;
      var testObj;

      beforeEach(function() {
        testSlider = new Slider("#testSlider2");
        numTimesFired = 0;
        testObj = {
          addOne: function() {
            numTimesFired++;
          }
        };
      });

      afterEach(function() {
        testSlider.destroy();
      });

      it("'slide' event is triggered only once per slide action", function(done) {
        spyOn(testObj, 'addOne').and.callThrough();

        testSlider.on('slide', testObj.addOne);
        testSlider._mousemove(mouse);

        setTimeout(function() {
          expect(numTimesFired).toBe(1);
          expect(testObj.addOne.calls.count()).toBe(1);
          done();
        });
      });

      it("'slideStart' event is triggered only once per slide action", function(done) {
        spyOn(testObj, 'addOne').and.callThrough();

        testSlider.on('slideStart', testObj.addOne);
        testSlider._mousedown(mouse);

        setTimeout(function() {
          expect(numTimesFired).toBe(1);
          expect(testObj.addOne.calls.count()).toBe(1);
          done();
        });
      });

      it("'slideStop' event is triggered only once per slide action", function(done) {
        spyOn(testObj, 'addOne').and.callThrough();

        testSlider.on('slideStop', testObj.addOne);
        testSlider._mouseup(mouse);

        setTimeout(function() {
          expect(numTimesFired).toBe(1);
          expect(testObj.addOne.calls.count()).toBe(1);
          done();
        });
      });

      it("'change' event is triggered only once per value change action", function(done) {
        spyOn(testObj, 'addOne').and.callThrough();

        testSlider.on('change', testObj.addOne);
        testSlider.setValue(3, false, true);

        setTimeout(function() {
          expect(numTimesFired).toBe(1);
          expect(testObj.addOne.calls.count()).toBe(1);
          done();
        });
      });
    });
  }); // End of common JS tests

}); // End of spec
