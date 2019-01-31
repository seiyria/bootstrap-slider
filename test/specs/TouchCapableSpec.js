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
  var inputId = 'testSlider1';
  var sliderId;
  var sliderOptions;

  beforeEach(function() {
    sliderId = 'mySlider';

    sliderOptions = {
      id: sliderId,
      step: 1,
      value: 5,
      ticks: [0, 3, 5, 7, 10]
    };

    // Initialize the slider
    $testSlider = $('#' + inputId).slider(sliderOptions);

    // Enable touch
    window.ontouchstart = true;

    // Get slider instance
    sliderInst = $testSlider.data('slider');
  });

  afterEach(function() {
    window.ontouchstart = null;

    if ($testSlider) {
      $testSlider.slider('destroy');
      $testSlider = null;
    }
  });

  // 0 1 2 3 4
  // 0 3 5 7 10
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
    coords = coords = [sliderCoords.x + tick.offsetLeft, sliderCoords.y];
    touchMove = createTouchEvent(sliderElem, 'touchmove', coords);

    touchEnd = createTouchEvent(sliderElem, 'touchend', coords);

    sliderElem.dispatchEvent(touchStart);
    sliderElem.dispatchEvent(touchMove);
    sliderElem.dispatchEvent(touchEnd);
  });

});