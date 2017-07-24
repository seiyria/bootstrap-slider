describe("Original Event trasmittance test", function () {
    var SLIDER_ID = "testSlider1";
    var slider;
    var options;
    var origEvtInSlidestart, origEvtInSlide, origEvtInSlidestop;

    describe('When a slider w/o jQuery is dragged...,', function () {
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

            slider.on("slideStart", function (val, evt) {
                if (evt && evt.type && evt.type === "mousedown") {
                    origEvtInSlidestart = 1;
                } else {
                }
            });
            slider.on("slide", function (val, evt) {
                if (evt && evt.type && evt.type === "mousemove") {
                    origEvtInSlide = 1;
                } else {
                }
            });
            slider.on("slideStop", function (val, evt) {
                if (evt && evt.type && evt.type === "mouseup") {
                    origEvtInSlidestop = 1;
                } else {
                }
            });

        });

        it("slideStart event should contain mousedown evt", function () {
            var sliderLeft = $("#myslider")[0].offsetLeft;
            var offsetY = $("#myslider")[0].offsetTop;
            var offsetX = sliderLeft + $("#myslider")[0].clientWidth;
            var mouseDownEvent = getMouseEvent('mousedown', offsetX, offsetY);
            var mouseMoveEvent = getMouseEvent('mousemove', offsetX - 20, offsetY);
            var mouseUpEvent = getMouseEvent('mouseup', offsetX - 20, offsetY);
            slider.mousedown(mouseDownEvent);
            slider.mousemove(mouseMoveEvent);
            slider.mouseup(mouseUpEvent);
            expect(origEvtInSlidestart).toBe(1);
        });
        it("slide event should contain mousemove evt", function () {
            var sliderLeft = $("#myslider")[0].offsetLeft;
            var offsetY = $("#myslider")[0].offsetTop;
            var offsetX = sliderLeft + $("#myslider")[0].clientWidth;
            var mouseDownEvent = getMouseEvent('mousedown', offsetX, offsetY);
            var mouseMoveEvent = getMouseEvent('mousemove', offsetX - 20, offsetY);
            var mouseUpEvent = getMouseEvent('mouseup', offsetX - 20, offsetY);
            slider.mousedown(mouseDownEvent);
            slider.mousemove(mouseMoveEvent);
            slider.mouseup(mouseUpEvent);
            expect(origEvtInSlide).toBe(1);
        });
        it("slideStop event should contain mouseup evt", function () {
            var sliderLeft = $("#myslider")[0].offsetLeft;
            var offsetY = $("#myslider")[0].offsetTop;
            var offsetX = sliderLeft + $("#myslider")[0].clientWidth;
            var mouseDownEvent = getMouseEvent('mousedown', offsetX, offsetY);
            var mouseMoveEvent = getMouseEvent('mousemove', offsetX - 20, offsetY);
            var mouseUpEvent = getMouseEvent('mouseup', offsetX - 20, offsetY);
            slider.mousedown(mouseDownEvent);
            slider.mousemove(mouseMoveEvent);
            slider.mouseup(mouseUpEvent);
            expect(origEvtInSlidestop).toBe(1);
        });
    });

    describe('When a slider with jQuery is dragged...,', function () {
        beforeEach(function () {
            options = {
                id: "myslider",
                min: 0,
                max: 100,
                value: 0
            };
            slider = $("#"+SLIDER_ID).slider(options);
            origEvtInSlidestart = 0;
            origEvtInSlide = 0;
            origEvtInSlidestop = 0;

            slider.on("slideStart", function (val, evt) {
                if (evt && evt.type && evt.type === "mousedown") {
                    origEvtInSlidestart = 1;
                } else {
                }
            });
            slider.on("slide", function (val, evt) {
                if (evt && evt.type && evt.type === "mousemove") {
                    origEvtInSlide = 1;
                } else {
                }
            });
            slider.on("slideStop", function (val, evt) {
                if (evt && evt.type && evt.type === "mouseup") {
                    origEvtInSlidestop = 1;
                } else {
                }
            });

        });

        it("slideStart event should contain mousedown evt", function () {
            var sliderLeft = $("#myslider")[0].offsetLeft;
            var offsetY = $("#myslider")[0].offsetTop;
            var offsetX = sliderLeft + $("#myslider")[0].clientWidth;
            var mouseDownEvent = getMouseEvent('mousedown', offsetX, offsetY);
            var mouseMoveEvent = getMouseEvent('mousemove', offsetX - 20, offsetY);
            var mouseUpEvent = getMouseEvent('mouseup', offsetX - 20, offsetY);
            $("#myslider")[0].dispatchEvent(mouseDownEvent);
            $("#myslider").find(".slider-handle")[0].dispatchEvent(mouseMoveEvent);
            $("#myslider").find(".slider-handle")[0].dispatchEvent(mouseUpEvent);
            expect(origEvtInSlidestart).toBe(1);
        });
        it("slide event should contain mousemove evt", function () {
            var sliderLeft = $("#myslider")[0].offsetLeft;
            var offsetY = $("#myslider")[0].offsetTop;
            var offsetX = sliderLeft + $("#myslider")[0].clientWidth;
            var mouseDownEvent = getMouseEvent('mousedown', offsetX, offsetY);
            var mouseMoveEvent = getMouseEvent('mousemove', offsetX - 20, offsetY);
            var mouseUpEvent = getMouseEvent('mouseup', offsetX - 20, offsetY);
            $("#myslider")[0].dispatchEvent(mouseDownEvent);
            $("#myslider").find(".slider-handle")[0].dispatchEvent(mouseMoveEvent);
            $("#myslider").find(".slider-handle")[0].dispatchEvent(mouseUpEvent);
            expect(origEvtInSlide).toBe(1);
        });
        it("slideStop event should contain mouseup evt", function () {
            var sliderLeft = $("#myslider")[0].offsetLeft;
            var offsetY = $("#myslider")[0].offsetTop;
            var offsetX = sliderLeft + $("#myslider")[0].clientWidth;
            var mouseDownEvent = getMouseEvent('mousedown', offsetX, offsetY);
            var mouseMoveEvent = getMouseEvent('mousemove', offsetX - 20, offsetY);
            var mouseUpEvent = getMouseEvent('mouseup', offsetX - 20, offsetY);
            $("#myslider")[0].dispatchEvent(mouseDownEvent);
            $("#myslider").find(".slider-handle")[0].dispatchEvent(mouseMoveEvent);
            $("#myslider").find(".slider-handle")[0].dispatchEvent(mouseUpEvent);
            expect(origEvtInSlidestop).toBe(1);
        });
    });

    afterEach(function () {
        slider.destroy();
    });

    function getMouseEvent(type, offsetXToClick, offsetYToClick) {
        var args = {
            clientX: offsetXToClick, // clientX
            clientY: offsetYToClick, // clientY,
            ctrlKey: false, // ctrlKey
            shiftKey: false, // altKey
            altKey: false, // shiftKey
        };
        var event = new MouseEvent(type, args);
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
