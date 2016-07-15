describe("Namespace Tests", function() {
  var sourceJS = "temp/bootstrap-slider.js";

  it("should always set the plugin namespace to 'bootstrapSlider'", function() {
    var scriptLoaded;

    runs(function() {
      $.getScript(sourceJS, function() {
        scriptLoaded = true;
      });
    });

    waitsFor(function() {
      return scriptLoaded === true;
    });

    runs(function() {
      expect($.fn.bootstrapSlider).toBeDefined();
    });
  });

  it("should set the plugin namespace to 'slider' if the namespace is available", function() {
    var scriptLoaded;

    runs(function() {
      $.getScript(sourceJS, function() {
        scriptLoaded = true;
      });
    });

    waitsFor(function() {
      return scriptLoaded === true;
    });

    runs(function() {
      expect($.fn.slider).toBeDefined();
    });
  });

  it("should print a console warning if the 'slider' namespace is already bound", function() {
    var scriptLoaded;

    $.fn.slider = function() {};
    spyOn(window.console, "warn");

    runs(function() {
      $.getScript(sourceJS, function() {
        scriptLoaded = true;
      });
    });

    waitsFor(function() {
      return scriptLoaded === true;
    });

    runs(function() {
      var expectedWarningMessage = "bootstrap-slider.js - WARNING: $.fn.slider namespace is already bound. Use the $.fn.bootstrapSlider namespace instead.";
      expect(window.console.warn).toHaveBeenCalledWith(expectedWarningMessage);
    });
  });

  afterEach(function() {
    /*
      Set the namespaces back to undefined and reload slider
      So that namespace is returned to $.fn.slider
    */
    var scriptLoaded;

    runs(function() {
      $.fn.bootstrapSlider = undefined;
      $.fn.slider = undefined;

      $.getScript(sourceJS, function() {
        scriptLoaded = true;
      });
    });

    waitsFor(function() {
      return scriptLoaded === true;
    });
  });
});