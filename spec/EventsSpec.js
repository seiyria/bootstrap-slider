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
    testSlider.data('slider').mousemove(mouse);
    expect(flag).toBeTruthy();
  });

  it("'slide' event sets the right value on the input", function() {
    testSlider.on('slide', function() {
      flag = true;
      expect(isNaN(testSlider.val())).not.toBeTruthy();
    });
    testSlider.data('slider').mousemove(mouse);
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

  describe("Disabled Slider Event Tests", function() {
    beforeEach(function() {
      testSlider.slider('disable');
    });

    it("should not trigger 'slideStart' event when disabled", function() {
      testSlider.on('slideStart', function() {
        flag = true;
      });
      testSlider.data('slider').mousedown(mouse);
      expect(flag).not.toBeTruthy();
    });

    it("should not trigger 'slide' event when disabled", function() {
      testSlider.on('slide', function() {
        flag = true;
      });
      testSlider.data('slider').mousemove(mouse);
      expect(flag).not.toBeTruthy();
    });

    it("should not trigger 'slideStop' event when disabled", function() {
      testSlider.on('slideStop', function() {
        flag = true;
      });
      testSlider.data('slider').mouseup();
      expect(flag).not.toBeTruthy();
    });

    it("should not trigger 'slideChange' event when disabled", function() {
      //TODO: Cannot find any way to trigger this through sliding actions.
      expect(false).not.toBeTruthy();
    });

  });

  it("'slideDisabled' event is triggered properly and can be binded to", function() {
    testSlider.on('slideDisabled', function() {
      flag = true;
    });
    testSlider.slider('disable');
    expect(flag).toBeTruthy();
  });

  it("'slideDisabled' event is triggered properly and can be binded to", function() {
    testSlider.on('slideEnabled', function() {
      flag = true;
    });
    testSlider.slider('disable');
    testSlider.slider('enable');
    expect(flag).toBeTruthy();
  });

  it("slider should not have duplicate events after calling 'refresh'", function() {
    flag = 0;
    testSlider.on('slideStop', function() {
      flag += 1;
    });
    testSlider.slider('refresh');
    testSlider.data('slider').mouseup();
    expect(flag).toEqual(1);
  });

  afterEach(function() {
    if(testSlider) {
      testSlider.slider('destroy');
      testSlider = null;
    }
  });
});
