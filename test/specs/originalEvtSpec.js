describe("Original Event trasmittance test", function() {
  var SLIDER_ID = "testSlider1";
  var slider;
  var options;
  var originalEventTransmitted;

  describe('When the slider is manipulated using the mouse', function() {
    beforeEach(function() {
      options = {
        min: 0,
        max: 100,
        value: 0
      };
      slider = new Slider(document.getElementById(SLIDER_ID), options);
    });

    it("a slideStop event should contain the original mouse event (mouseup)", function() {
      slider.on("slideStop", function(evt) {
          console.log('slide');
          console.log(evt);
          console.log(evt.originalEvent);
          if (evt.originalEvent) {
            console.log('yes');
            originalEventTransmitted = 1;
          } else {
            console.log('no');
          };
      });
      var sliderLeft = slider.sliderElem.offsetLeft;
      var offsetY = slider.sliderElem.offsetTop;
      var offsetX = sliderLeft + slider.sliderElem.clientWidth;
      var mouseEvent = getMouseDownEvent(offsetX, offsetY);
        originalEventTransmitted = 0;
      slider.mousedown(mouseEvent);
      slider.mouseup();
      expect(originalEventTransmitted).toBe(1);
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
