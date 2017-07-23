describe("Original Event trasmittance test", function() {
  var SLIDER_ID = "testSlider1";
  var slider;
  var options;
  var originalEventTransmitted;
  var sliderCallback;

  describe('When a slider is initialized w/o jQuery and the track is clicked,', function() {
    beforeEach(function() {
      options = {
        min: 0,
        max: 100,
        value: 0
      };
      slider = new Slider(document.getElementById(SLIDER_ID), options);
      originalEventTransmitted=0;
    });

    it("a slideStop event should contain the original mouse event as second argument.", function() {
        slider.on("slideStop", function(val, evt) {
            if (evt.type == "mouseup") {
                originalEventTransmitted = 1;
            }
        });
        var sliderLeft = slider.sliderElem.offsetLeft;
        var offsetY = slider.sliderElem.offsetTop;
        var offsetX = sliderLeft + slider.sliderElem.clientWidth;
        var mouseMoveEvent = getMouseEvent('mousedown', offsetX, offsetY);
        var mouseUpEvent = getMouseEvent('mouseup', offsetX, offsetY);

        slider.mousedown(mouseMoveEvent);
        slider.mouseup(mouseUpEvent);

        expect(originalEventTransmitted).toBe(1);
    });
  });

  afterEach(function() {
    slider.destroy();
  });

  // helper functions
  function getMouseEvent(type, offsetXToClick, offsetYToClick) {
    var args = {
        clientX: offsetXToClick,
        clientY: offsetYToClick,
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
    }

    var event = new MouseEvent(type, args);
    return event;
  }

});
