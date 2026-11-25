describe("Release after bounds change", function() {
  var slider;

  afterEach(function() {
    slider.destroy();
  });

  it("emits the normalized value when an old tick exceeds the new maximum", function() {
    slider = new Slider(document.getElementById("testSlider1"), {
      min: 0,
      max: 100,
      value: 80,
      ticks: [0, 80, 100],
      lock_to_ticks: true,
      ticks_snap_bounds: 100
    });
    var stopped = jasmine.createSpy("stopped");
    slider.on("slideStop", stopped);
    var rect = slider.sliderElem.getBoundingClientRect();
    var x = rect.left + rect.width * 0.8;
    var y = rect.top + rect.height / 2;
    function event(type) {
      var result = document.createEvent("MouseEvents");
      result.initMouseEvent(type, true, true, window, 0, 0, 0, x, y,
        false, false, false, false, 0, null);
      return result;
    }
    slider.mousedown(event("mousedown"));
    slider.setAttribute("max", 60);
    slider.mouseup(event("mouseup"));
    expect(slider.getValue()).toBe(60);
    expect(stopped).toHaveBeenCalledWith(60);
  });
});
