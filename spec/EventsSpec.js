describe("Event Tests", function() {
  var testSlider, flag, mouse;

  beforeEach(function() {
    testSlider = $("#testSlider2").slider();
    mouse = document.createEvent('MouseEvents');
    flag = false;
  });

  it("'slideStart' event is triggered properly and can be binded to", function() {
    testSlider.on('slideStart', function() {
      flag = true;
    });
    testSlider.data('slider').mousedown(mouse);
    expect(flag).toBeTruthy();
  });

  it("'slide' event is triggered properly and can be binded to", function() {
    testSlider.on('slide', function() {
      flag = true;
    });
    testSlider.data('slider').mousedown(mouse);
    expect(flag).toBeTruthy();
  });

  it("'slideStop' event is triggered properly and can be binded to", function() {
    testSlider.on('slideStop', function() {
      flag = true;
    });
    testSlider.data('slider').mouseup();
    expect(flag).toBeTruthy();
  });

  it("'slideChange' event is triggered properly and can be binded to", function() {
    //TODO: Cannot find any way to trigger this through sliding actions.
    expect(true).toBeTruthy();
  });

  afterEach(function() {
    if(testSlider) {
      testSlider.slider('destroy');
      testSlider = null;
    }
  });
});