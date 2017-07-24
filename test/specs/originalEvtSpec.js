describe("Original Event trasmittance test", function () {
    var SLIDER_ID = "testSlider1";
    var slider;
    var options;
    var origEvtInSlidestart, origEvtInSlide, origEvtInSlidestop;
    var is_jquery;

    describe('When a slider is initialized w/o jQuery, and the handle is dragged...,', function () {
        beforeEach(function () {
            options = {
                id: "myslider",
                min: 0,
                max: 100,
                value: 0
            };
            slider = new Slider(document.getElementById(SLIDER_ID), options);
            origEvtInSlidestart = 0;
            origEvtInSlide = 0;
            origEvtInSlidestop = 0;
            is_jquery = 0;
        });

        it("a slideStart event fired should contain the original mouse event as second argument. (type mousedown)", function () {
            slider.on("slideStart", function (val, evt) {
                console.log(evt);
                console.log('slideStart');
                if (evt && evt.type === "mousedown") {
                    console.log('yes');
                    origEvtInSlidestart = 1;
                } else {
                    console.log('no');
                }
            });
            var sliderLeft = $("#myslider")[0].offsetLeft;
            var offsetY = $("#myslider")[0].offsetTop;
            var offsetX = sliderLeft + $("#myslider")[0].clientWidth;
            var mouseDownEvent = getMouseEvent(is_jquery, 'mousedown', offsetX, offsetY);
            console.log(mouseDownEvent);
            slider.mousedown(mouseDownEvent);
            var mouseMoveEvent = getMouseEvent(is_jquery, 'mousemove', offsetX - 20, offsetY);
            console.log(mouseMoveEvent);
            slider.mousemove(mouseMoveEvent);
            var mouseUpEvent = getMouseEvent(is_jquery, 'mouseup', offsetX - 20, offsetY);
            console.log(mouseUpEvent);
            slider.mouseup(mouseUpEvent);
            expect(origEvtInSlidestart).toBe(1);
        });

    });

    afterEach(function () {
        slider.destroy();
    });

    function getMouseEvent(is_jquery, type, offsetXToClick, offsetYToClick) {
        var event;
        if (is_jquery) {
            // create a jQuery event
            event = $.Event(type);

            // set coordinates
            event.pageX = offsetXToClick;
            event.clientX = offsetXToClick;
            event.pageY = offsetYToClick;
            event.clientY = offsetYToClick;
        } else {
            var args = {
                clientX: offsetXToClick, // clientX
                clientY: offsetYToClick, // clientY,
                ctrlKey: false, // ctrlKey
                shiftKey: false, // altKey
                altKey: false, // shiftKey
            };
            event = new MouseEvent(type, args);
        }
        return event;
    }

    // MouseEvent constructor  polyfill
    (function (window) {
        try {
            new MouseEvent('test');
            return false; // No need to polyfill
        } catch (e) {
            // Need to polyfill - fall through
        }

        // Polyfills DOM4 MouseEvent

        var MouseEvent3 = function (eventType, params) {
            params = params || { bubbles: false, cancelable: false };
            var mouseEvent2 = document.createEvent('MouseEvent');
            mouseEvent2.initMouseEvent(eventType, params.bubbles, params.cancelable, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

            return mouseEvent2;
        };

        MouseEvent3.prototype = Event.prototype;

        window.MouseEvent = MouseEvent3;
    })(window);
});
