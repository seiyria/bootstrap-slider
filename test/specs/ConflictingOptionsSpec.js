/*
  *************************

  Conflicting Options Tests

  *************************

  This spec has tests for checking if two or more options do not conflict with one another
  As option conflicts are reported and resolved, write tests for them here.
  This will help ensure that they are accounted for and do not arise again.
*/
describe("Conflicting Options Tests", function() {

  var testSlider;

  it("Should have the value zero when it is slided to zero", function() {
    testSlider = $("#testSlider1").slider({
      value: 0,
      step: 1
    });
    var flag = false;
    var mouse = document.createEvent('MouseEvents');

    testSlider.on('slide', function(slideEvt) {
      expect(slideEvt.value).toBe(0);
      flag = true;
    });

    testSlider.data('slider')._mousemove(mouse);
    expect(flag).toBeTruthy();
  });

  it("should set the `precision` to be the number of digits after the decimal of the `step` (assuming no `precision` is specified)", function() {
    // Create Slider
    testSlider = $("#testSlider1").slider({
      value: 8.115,
      step: 0.01
    });
    // Retrieve slider value
    var value = testSlider.slider("getValue");
    // Run tests
    expect(value).toBe(8.12);
  });

  it("Should have `tooltip-main` displayed with `in` class and `tooltip-min, tooltip-max` not displayed", function() {
    var sliderId = "tooltipedSlider";
    testSlider = $("#testSlider1").slider({
      id: sliderId,
      value: [0, 10],
      tooltip: "always", // for the sake of testing, always display the tooltip
      tooltip_split: false
    });

    var $slider = $("#"+sliderId),
        $tooltipMain = $slider.find(".tooltip-main"),
        $tooltipMin = $slider.find(".tooltip-min"),
        $tooltipMax = $slider.find(".tooltip-max");

    expect($tooltipMain.css("display")).not.toBe("none");
    expect($tooltipMain.hasClass("in")).toBeTruthy();
    expect($tooltipMin.css("display")).toBe("none");
    expect($tooltipMin.hasClass("in")).toBeFalsy();
    expect($tooltipMax.css("display")).toBe("none");
    expect($tooltipMax.hasClass("in")).toBeFalsy();
  });

  it("Should have `tooltip-min, tooltip-max` displayed with `in` class and `tooltip-main` not displayed", function() {
    var sliderId = "tooltipedSlider";
    testSlider = $("#testSlider1").slider({
      id: sliderId,
      value: [0, 10],
      tooltip: "always", // for the sake of testing, always display the tooltip
      tooltip_split: true
    });

    var $slider = $("#"+sliderId),
        $tooltipMain = $slider.find(".tooltip-main"),
        $tooltipMin = $slider.find(".tooltip-min"),
        $tooltipMax = $slider.find(".tooltip-max");

    expect($tooltipMain.css("display")).toBe("none");
    expect($tooltipMain.hasClass("in")).toBeFalsy();
    expect($tooltipMin.css("display")).not.toBe("none");
    expect($tooltipMin.hasClass("in")).toBeTruthy();
    expect($tooltipMax.css("display")).not.toBe("none");
    expect($tooltipMax.hasClass("in")).toBeTruthy();
  });

  afterEach(function() {
    if(testSlider) {
      testSlider.slider('destroy');
      testSlider = null;
    }
  });

});
