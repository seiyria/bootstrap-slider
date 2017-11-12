describe("Original Event trasmittance test", function () {
    var SLIDER_ID = "testSlider1";
    var slider;
    var options;
    var origEvtInSlidestart, origEvtInSlide, origEvtInSlidestop;

	function slider_callback(evt_type) {
		return function (val, evt) {
			if (evt && evt.type && evt.type === evt_type) {
				// check to which event this callback is bound:
				switch (evt.type) {
					case "mousedown":
						origEvtInSlidestart = 1;
						break;
					case "mousemove":
						origEvtInSlide = 1;
						break;
					case "mouseup":
						origEvtInSlidestop = 1;
						break;
					default:
						// do nothing.
				}
                    origEvtInSlidestart = 1;
            }
		};
	}
    
    describe('When a slider w/o jQuery is dragged', function () {
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

            slider.on("slideStart", slider_callback("mousedown"));
            slider.on("slide", slider_callback("mousemove"));
            slider.on("slideStop", slider_callback("mouseup"));

            var sliderLeft = $("#myslider")[0].offsetLeft;
            var offsetY = $("#myslider")[0].offsetTop;
            var offsetX = sliderLeft + $("#myslider")[0].clientWidth;
            var mouseDownEvent = getMouseEvent('mousedown', offsetX, offsetY);
            var mouseMoveEvent = getMouseEvent('mousemove', offsetX - 20, offsetY);
            var mouseUpEvent = getMouseEvent('mouseup', offsetX - 20, offsetY);
            slider.mousedown(mouseDownEvent);
            slider.mousemove(mouseMoveEvent);
            slider.mouseup(mouseUpEvent);
        });

        it("slideStart event should contain mousedown evt", function () {
            expect(origEvtInSlidestart).toBe(1);
        });
        it("slide event should contain mousemove evt", function () {
            expect(origEvtInSlide).toBe(1);
        });
        it("slideStop event should contain mouseup evt", function () {
            expect(origEvtInSlidestop).toBe(1);
        });
    });

    afterEach(function () {
        slider.destroy();
    });

    function getMouseEvent(type, offsetXToClick, offsetYToClick) {
        var args = {
            clientX: offsetXToClick,
            clientY: offsetYToClick,
            ctrlKey: false,
            shiftKey: false,
            altKey: false
        };
        var event = new MouseEvent(type, args);
        return event;
    }

    // MouseEvent constructor  polyfill
    function polyfill(window) {
		if (typeof MouseEvent !== "undefined") {
	        return false; // No need to polyfill
        } else {
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
    }
	polyfill(window);
});
