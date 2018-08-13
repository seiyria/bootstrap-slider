/*
  *************************

  tooltip_split Option Test

  *************************

  This spec tests if tooltip_main, tooltip_min and tooltip_max
  behave correctly when tooltip_split option is set to true or false.
*/
describe("'tooltip_split' Option tests", function() {
  var testSlider, sliderId = "tooltipedSlider",
      $slider, $tooltipMain, $tooltipMin, $tooltipMax,
      sliderOptions = {id: sliderId, value: [0, 10], tooltip: "always"}; // for the sake of testing, always display the tooltip

  describe("When 'tooltip_split' is false", function() {
    beforeEach(function() {
      testSlider = $("#testSlider1").slider($.extend(sliderOptions, {tooltip_split: false}));
      $slider = $("#"+sliderId);
      $tooltipMain = $slider.find(".tooltip-main");
      $tooltipMin  = $slider.find(".tooltip-min");
      $tooltipMax  = $slider.find(".tooltip-max");
    });

    it("should have `tooltip-main` displayed with `show` class", function() {
      expect($tooltipMain.css("display")).not.toBe("none");
      expect($tooltipMain.hasClass("show")).toBeTruthy();
    });

    it("should have `tooltip-min, tooltip-max` not displayed", function() {
      expect($tooltipMin.css("display")).toBe("none");
      expect($tooltipMin.hasClass("show")).toBeFalsy();
      expect($tooltipMax.css("display")).toBe("none");
      expect($tooltipMax.hasClass("show")).toBeFalsy();
    });
  });

  describe("When 'tooltip_split' is true", function() {
    beforeEach(function() {
      testSlider = $("#testSlider1").slider($.extend(sliderOptions, {tooltip_split: true}));
      $slider = $("#"+sliderId);
      $tooltipMain = $slider.find(".tooltip-main");
      $tooltipMin  = $slider.find(".tooltip-min");
      $tooltipMax  = $slider.find(".tooltip-max");
    });

    it("should have `tooltip-min, tooltip-max` displayed with `show` class", function() {
      expect($tooltipMin.css("display")).not.toBe("none");
      expect($tooltipMin.hasClass("show")).toBeTruthy();
      expect($tooltipMax.css("display")).not.toBe("none");
      expect($tooltipMax.hasClass("show")).toBeTruthy();
    });

    it("should have `tooltip-main` not displayed", function() {
      expect($tooltipMain.css("display")).toBe("none");
      expect($tooltipMain.hasClass("show")).toBeFalsy();
    });

    it("should be aligned above the handle on init if set to 'top'", function() {
      expect($tooltipMin.hasClass("bs-tooltip-top")).toBeTruthy();
      expect($tooltipMax.hasClass("bs-tooltip-top")).toBeTruthy();
    });
  });

  afterEach(function() {
    if(testSlider) {
      testSlider.slider('destroy');
      testSlider = null;
    }
  });
});
