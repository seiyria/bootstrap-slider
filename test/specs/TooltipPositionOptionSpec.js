/*
  *************************

  tooltip_position Option Test

  *************************
*/
describe("'tooltip_position' Option tests", function() {

  var testSlider;

  afterEach(function() {
    if(testSlider) {
      testSlider.destroy();
      testSlider = null;
    }
  });

  describe("vertical slider tests", function() {

    it("should be aligned to the left of the handle if set to 'left'", function() {

    });

    it("should be aligned to the right of the handle if set to 'right'", function() {

    });

    it("should default to 'right' if tooltip_position set to 'top' or 'bottom'", function() {

    });

  });

  describe("horizontal slider tests", function() {

    it("should be aligned above the handle if set to 'top'", function() {

    });

    it("should be aligned below the handle if set to 'bottom'", function() {

    });

    it("should default to 'top' if tooltip_position set to 'left' or 'right'", function() {

    });

  });

});