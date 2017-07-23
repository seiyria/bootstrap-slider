describe("Original Event trasmittance test", function() {
  var SLIDER_ID = "testSlider1";
  var slider;
  var options;
  var originalEventTransmitted;

  describe('When the slider track is clicked,', function() {
    beforeEach(function() {
      options = {
        min: 0,
        max: 100,
        value: 0
      };
      slider = new Slider(document.getElementById(SLIDER_ID), options);
    });

    it("a slideStop event should be fired and contain the original mouse event of type mouseup", function() {
      slider.on("slideStop", function(evt) {
          console.log('slide');
          console.log(evt);
          console.log(evt.originalEvent);
          console.log(evt.type);
          if (evt.originalEvent) {
            console.log('yes');
            originalEventTransmitted = 1;
          } else {
            console.log('no');
          }
      });
      var sliderLeft = slider.sliderElem.offsetLeft;
      var offsetY = slider.sliderElem.offsetTop;
      var offsetX = sliderLeft + slider.sliderElem.clientWidth;
      var mouseMoveEvent = getMouseEvent('mousedown', offsetX, offsetY);
      var mouseUpEvent = getMouseEvent('mouseup', offsetX, offsetY);

      originalEventTransmitted = 0;
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
    var args = [
      type, // type, mousedown, mouseup, mousemove
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
