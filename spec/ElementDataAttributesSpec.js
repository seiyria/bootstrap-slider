describe("Element Data Attributes Tests", function() {
  var slider;

  it("reads the 'data-slider-min' property and sets it on slider", function() {
    slider = $("#minSlider").slider();
    slider.slider('setValue', 1);

    var sliderValue = slider.slider('getValue');
    expect(sliderValue).toBe(5);
  });

  it("reads the 'data-slider-max' property and sets it on slider", function() {
    slider = $("#maxSlider").slider();
    slider.slider('setValue', 10);

    var sliderValue = slider.slider('getValue');
    expect(sliderValue).toBe(5);
  });

  it("reads the 'data-slider-step' property and sets it on slider", function() {

    slider = $("#stepSlider").slider();
    //TODO How do you test this? Maybe manually trigger a slideChange event?
    expect(true).toBeTruthy();
  });

  it("reads the 'data-slider-orientation' property and sets it on slider", function() {
    slider = $("#orientationSlider").slider();
      
    var orientationClassApplied = $("#orientationSlider").parent("div.slider").hasClass("slider-vertical");
    expect(orientationClassApplied).toBeTruthy();
  });

  it("reads the 'data-slider-value' property and sets it on slider", function() {
    slider = $("#valueSlider").slider();

    var sliderValue = slider.slider('getValue');
    expect(sliderValue).toBe(5);
  });

  it("reads the 'data-slider-selection' property and sets it on slider", function() {
    slider = $("#selectionSlider").slider();
    slider.slider('setValue', 10);

    var sliderSelectionWidthAtMaxValue = $("#selectionSlider").siblings("div.slider-track").children("div.slider-selection").width();
    expect(sliderSelectionWidthAtMaxValue).toBe(0);
  });

  it("reads the 'data-slider-tooltip' property and sets it on slider", function() {
    slider = $("#tooltipSlider").slider();
    var tooltipIsHidden = $("#tooltipSlider").siblings("div.tooltip").hasClass("hide");
    expect(tooltipIsHidden).toBeTruthy();
  });

  it("reads the 'data-slider-handle' property and sets it on slider", function() {
    slider = $("#handleSlider").slider();
    var handleIsSetToTriangle = $("#handleSlider").siblings("div.slider-track").children("div.slider-handle").hasClass("triangle");
    expect(handleIsSetToTriangle).toBeTruthy();
  });

  it("reads the 'data-slider-reversed' property and sets it on slider", function() {
    slider = $("#reversedSlider").slider();
    slider.slider('setValue', 10);
      
    var sliderSelectionHeightAtMaxValue = $("#reversedSlider").siblings("div.slider-track").children("div.slider-selection").width();
    expect(sliderSelectionHeightAtMaxValue).toBe(0);
  });

  it("reads the 'data-slider-enabled' property and sets it on slider", function() {
    slider = $("#disabledSlider").slider();
    var isEnabled = slider.slider('isEnabled');
    expect(isEnabled).not.toBeTruthy();
  });

  it("changes the 'data-slider-orientation' property from horizontal to vertical", function() {
    slider = $("#changeOrientationSlider").slider();
    slider.slider('setAttribute', 'orientation', 'vertical').slider('refresh');

    var $slider = $("#changeOrientationSlider").parent("div.slider");
    var orientationClassApplied = $slider.hasClass("slider-vertical");
    var secondSliderHidden = $slider.find('.slider-handle').last().hasClass('hide');
    expect(orientationClassApplied).toBeTruthy();
    expect(secondSliderHidden).toBeTruthy();
  });

  afterEach(function() {
    if(slider) { slider.slider('destroy'); }
  });
});