/* The following functions are taken and slightly modified from mock-phantom-touch-events.
 * 
 * The original mock-phantom-touch-events can be found at https://github.com/gardr/mock-phantom-touch-events
 * 
 * mock-phantom-touch-events is licensed under:
 * 
 * The MIT License (MIT)
 * Copyright (c) 2013 FINN.no AS
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */

/*
    list can be either [[x, y], [x, y]] or [x, y]
*/
function createTouchList(target, list) {
  if (Array.isArray(list) && list[0] && !Array.isArray(list[0])) {
      list = [list];
  }
  list = list.map(function (entry, index) {
      var x = entry[0], y = entry[1], id = entry[2] ? entry[2] : index + 1;
      return createTouch(x, y, target, id);
  });
  return document.createTouchList.apply(document, list);
}

function createTouch(x, y, target, id) {
  return document.createTouch(window, target,
      id || 1,  //identifier
      x,  //pageX / clientX
      y,  //pageY / clientY
      x,  //screenX
      y  //screenY
  );
}

function initTouchEvent(touchEvent, type, touches) {
  var touch1 = touches[0];
  return touchEvent.initTouchEvent(
      touches, //touches
      touches, //targetTouches
      touches, //changedTouches
      type, //type
      window, //view
      touch1.screenX, //screenX
      touch1.screenY, //screenY
      touch1.clientX, //clientX
      touch1.clientY, //clientY
      false, //ctrlKey
      false, //altKey
      false, //shiftKey
      false //metaKey
  );
}

function createTouchEvent(elem, type, touches) {
  var touchEvent = document.createEvent('TouchEvent');
  if (Array.isArray(touches)) {
      touches = createTouchList(elem, touches);
  }

  initTouchEvent(touchEvent, type, touches);
  return touchEvent;
}

function calcTouchEventCoords(element) {
  var elementBB = element.getBoundingClientRect();

  return {
    x: elementBB.left,
    y: elementBB.top
  };
}

describe("Touch Capable Tests", function() {
  var touchStart;
  var touchMove;
  var touchEnd;

  var $testSlider;
  var sliderInst;
  var inputId;
  var sliderId;
  var sliderOptions;

  beforeEach(function() {
    inputId = 'testSlider1';
    sliderId = 'mySlider';

    sliderOptions = {
      id: sliderId,
      step: 1,
      value: 5,
      ticks: [0, 3, 5, 7, 10]
    };

    // Enable touch
    window.ontouchstart = true;
  });

  afterEach(function() {
    window.ontouchstart = null;

    if ($testSlider) {
      $testSlider.slider('destroy');
      $testSlider = null;
    }
  });

  describe("single slider", function() {

    beforeEach(function() {
      // Initialize the slider
      $testSlider = $('#' + inputId).slider(sliderOptions);

      // Get slider instance
      sliderInst = $testSlider.data('slider');
    });

    // index= [0 1 2 3 4]
    // ticks= [0 3 5 7 10]
    it("should slide the handle to the left from 5 to 3", function(done) {
      var sliderElem = $testSlider.slider('getElement');
      $testSlider.on('slideStop', function() {
        var value = $testSlider.slider('getValue');
        expect(value).toBe(3);
        done();
      });

      var tick = sliderInst.ticks[2];  // 5
      var sliderCoords = calcTouchEventCoords(sliderElem);
      var coords = [sliderCoords.x + tick.offsetLeft, sliderCoords.y];
      touchStart = createTouchEvent(sliderElem, 'touchstart', coords);

      tick = sliderInst.ticks[1];  // 3
      coords = [sliderCoords.x + tick.offsetLeft, sliderCoords.y];
      touchMove = createTouchEvent(sliderElem, 'touchmove', coords);

      touchEnd = createTouchEvent(sliderElem, 'touchend', coords);

      sliderElem.dispatchEvent(touchStart);
      sliderElem.dispatchEvent(touchMove);
      sliderElem.dispatchEvent(touchEnd);
    });

    it("should slide the handle to the right from 5 to 7", function(done) {
      var sliderElem = $testSlider.slider('getElement');
      $testSlider.on('slideStop', function() {
        var value = $testSlider.slider('getValue');
        expect(value).toBe(7);
        done();
      });

      var tick = sliderInst.ticks[2];  // 5
      var sliderCoords = calcTouchEventCoords(sliderElem);
      var coords = [sliderCoords.x + tick.offsetLeft, sliderCoords.y];
      touchStart = createTouchEvent(sliderElem, 'touchstart', coords);

      tick = sliderInst.ticks[3];  // 7
      coords = [sliderCoords.x + tick.offsetLeft, sliderCoords.y];
      touchMove = createTouchEvent(sliderElem, 'touchmove', coords);

      touchEnd = createTouchEvent(sliderElem, 'touchend', coords);

      sliderElem.dispatchEvent(touchStart);
      sliderElem.dispatchEvent(touchMove);
      sliderElem.dispatchEvent(touchEnd);
    });

  });

  describe("single, vertical slider", function() {

    beforeEach(function() {
      // Initialize the slider
      sliderOptions.orientation = 'vertical';
      $testSlider = $('#' + inputId).slider(sliderOptions);

      // Get slider instance
      sliderInst = $testSlider.data('slider');
    });

    // index= [0 1 2 3 4]
    // ticks= [0 3 5 7 10]
    it("should slide the handle to the top from 5 to 3", function(done) {
      var sliderElem = $testSlider.slider('getElement');
      $testSlider.on('slideStop', function() {
        var value = $testSlider.slider('getValue');
        expect(value).toBe(3);
        done();
      });

      var tick = sliderInst.ticks[2];  // 5
      var sliderCoords = calcTouchEventCoords(sliderElem);
      var coords = [sliderCoords.x, sliderCoords.y + tick.offsetTop];
      touchStart = createTouchEvent(sliderElem, 'touchstart', coords);

      tick = sliderInst.ticks[1];  // 3
      coords = [sliderCoords.x, sliderCoords.y + tick.offsetTop];
      touchMove = createTouchEvent(sliderElem, 'touchmove', coords);

      touchEnd = createTouchEvent(sliderElem, 'touchend', coords);

      sliderElem.dispatchEvent(touchStart);
      sliderElem.dispatchEvent(touchMove);
      sliderElem.dispatchEvent(touchEnd);
    });

    it("should slide the handle to the bottom from 5 to 7", function(done) {
      var sliderElem = $testSlider.slider('getElement');
      $testSlider.on('slideStop', function() {
        var value = $testSlider.slider('getValue');
        expect(value).toBe(7);
        done();
      });

      var tick = sliderInst.ticks[2];  // 5
      var sliderCoords = calcTouchEventCoords(sliderElem);
      var coords = [sliderCoords.x, sliderCoords.y + tick.offsetTop];
      touchStart = createTouchEvent(sliderElem, 'touchstart', coords);

      tick = sliderInst.ticks[3];  // 7
      coords = [sliderCoords.x, sliderCoords.y + tick.offsetTop];
      touchMove = createTouchEvent(sliderElem, 'touchmove', coords);

      touchEnd = createTouchEvent(sliderElem, 'touchend', coords);

      sliderElem.dispatchEvent(touchStart);
      sliderElem.dispatchEvent(touchMove);
      sliderElem.dispatchEvent(touchEnd);
    });

  });

  describe("range slider", function() {

    beforeEach(function() {
      sliderOptions.range = true;
      sliderOptions.value = [3, 7];

      // Initialize the slider
      $testSlider = $('#' + inputId).slider(sliderOptions);

      // Get slider instance
      sliderInst = $testSlider.data('slider');
    });

    // index= [0 1 2 3 4]
    // ticks= [0 3 5 7 10]
    it("should slide the first handle to the left from 3 to 0", function(done) {
      var sliderElem = $testSlider.slider('getElement');
      $testSlider.on('slideStop', function() {
        var value = $testSlider.slider('getValue');
        expect(value).toEqual([0, 7]);
        done();
      });

      var tick = sliderInst.ticks[1];  // 3
      var sliderCoords = calcTouchEventCoords(sliderElem);
      var coords = [sliderCoords.x + tick.offsetLeft, sliderCoords.y];
      touchStart = createTouchEvent(sliderElem, 'touchstart', coords);

      tick = sliderInst.ticks[0];  // 0
      coords = [sliderCoords.x + tick.offsetLeft, sliderCoords.y];
      touchMove = createTouchEvent(sliderElem, 'touchmove', coords);

      touchEnd = createTouchEvent(sliderElem, 'touchend', coords);

      sliderElem.dispatchEvent(touchStart);
      sliderElem.dispatchEvent(touchMove);
      sliderElem.dispatchEvent(touchEnd);
    });

    it("should slide the second handle to the right from 7 to 10", function(done) {
      var sliderElem = $testSlider.slider('getElement');
      $testSlider.on('slideStop', function() {
        var value = $testSlider.slider('getValue');
        expect(value).toEqual([3, 10]);
        done();
      });

      var tick = sliderInst.ticks[3];  // 7
      var sliderCoords = calcTouchEventCoords(sliderElem);
      var coords = [sliderCoords.x + tick.offsetLeft, sliderCoords.y];
      touchStart = createTouchEvent(sliderElem, 'touchstart', coords);

      tick = sliderInst.ticks[4];  // 10
      coords = [sliderCoords.x + tick.offsetLeft, sliderCoords.y];
      touchMove = createTouchEvent(sliderElem, 'touchmove', coords);

      touchEnd = createTouchEvent(sliderElem, 'touchend', coords);

      sliderElem.dispatchEvent(touchStart);
      sliderElem.dispatchEvent(touchMove);
      sliderElem.dispatchEvent(touchEnd);
    });

  });

});