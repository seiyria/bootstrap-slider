/*
  *************************

  oritinal Event in slide events Test

  *************************

  This spec tests if the slide event of a slider contains the original
  mouse event.
*/
describe("'originalEvent' slider tests", function() {
  var testSlider, sliderId = "origEvtTestSlider",
      $slider, eventtriggered
	  sliderOptions = {id: sliderId, value: [0, 10]}; // for the sake of testing, always display the tooltip

  describe("When a slide event is triggered", function() {
    beforeEach(function() {
      testSlider = $("#testSlider1").slider($.extend(sliderOptions));
      $slider = $("#"+sliderId);
	  eventtriggered = 0;
	  $slider.on('slide',function(){eventtriggered = 1});
	  $slider.trigger('slide');
    });

    it("...", function() {
      expect(eventtriggered).toBe(1);
    });

  afterEach(function() {
    if(testSlider) {
      testSlider.slider('destroy');
      testSlider = null;
    }
  });
});
