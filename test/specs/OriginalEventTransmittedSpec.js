/*
  *************************

  oritinal Event in slide events Test

  *************************

  This spec tests if the slide event of a slider contains the original
  mouse event.
*/
describe("'originalEvent' slider tests", function() {
  var testSlider, sliderId = "origEvtTestSlider",
      $slider, originalEvent_passed,
	  sliderOptions = {id: sliderId, value: [0, 10]}; // for the sake of testing, always display the tooltip

  describe("When a slide event is triggered", function() {
      beforeEach(function () {
          testSlider = $("#testSlider1").slider(sliderOptions);
          $slider = $("#" + sliderId);
          originalEvent_passed = 0;
          $slider.on('slide', function (evt) {
              if (evt && evt.originalEvent) {
                  originalEvent_passed = 1;
              }
          });
          $slider.trigger('slide');
      });

      it("should contain the original mouse event as property in the passed slide event.", function () {
          expect(originalEvent_passed).toBe(1);
      });
  });

  afterEach(function() {
    if(testSlider) {
      testSlider.slider('destroy');
      testSlider = null;
    }
  });
});
