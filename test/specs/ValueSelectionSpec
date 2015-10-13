/*
  *************************

  Value Selection Tests

  *************************

  This spec has tests for checking if a specific value can be selected, given certain slider options.
  
*/
describe("Value Selection Tests", function() {

  var testSlider;

  it("Should slide to the 4200 when slider handle is dragged to the right most.", function() {
    testSlider = $("#testSlider1").slider({
      min:0,
      max: 4200,
      value:1000,
      step:1000
    });
    var flag = false;
    var mouse = document.createEvent('MouseEvents');

    testSlider.on('slide', function(slideEvt) {
      expect(slideEvt.value).toBe(4200);
      flag = true;
    });

    testSlider.data('slider')._mousemove(mouse);
    expect(flag).toBeTruthy();
  });

  
  afterEach(function() {
    if(testSlider) {
      testSlider.slider('destroy');
      testSlider = null;
    }
  });

});
