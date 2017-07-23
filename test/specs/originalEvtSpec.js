describe("Original Event trasmittance test", function() {
  var SLIDER_ID = "testSlider1";
  var slider;
  var options;
  var slidestopfired

  describe('When clicking the slider track', function() {
    beforeEach(function() {
      options = {
        min: 0,
        max: 100,
        value: 0
      };
      slider = new Slider(document.getElementById(SLIDER_ID), options);
    });

    it("the slideStop event should contain the original mouse event", function() {
      slider.on("slideStop", function() {
          slidestopfired = 1;
          console.log('slide');
      });
      var sliderLeft = slider.sliderElem.offsetLeft;
      var offsetY = slider.sliderElem.offsetTop;
      var offsetX = sliderLeft + slider.sliderElem.clientWidth;
      var mouseEvent = getMouseDownEvent(offsetX, offsetY);
      slidestopfired = 0;
      slider.mousedown(mouseEvent);
      slider.mouseup();
      expect(slidestopfired).toBe(1);
    });
  });

  afterEach(function() {
    slider.destroy();
  });

  // helper functions
  function getMouseDownEvent(offsetXToClick, offsetYToClick) {
    var args = [
      'mousedown', // type
      true, // canBubble
      true, // cancelable
      document, // view,
      0, // detail
      0, // screenX
      0, // screenY
      offsetXToClick, // clientX
      offsetYToClick, // clientY,
      false, // ctrlKey
      false, // altKey
      false, // shiftKey
      false, // metaKey,
      0, // button
      null // relatedTarget
    ];

    var event = document.createEvent('MouseEvents');
    event.initMouseEvent.apply(event, args);
    return event;
  }

});
