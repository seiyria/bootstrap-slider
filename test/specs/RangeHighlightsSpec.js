/*
 RangeHighlights Render Tests
 */

describe("RangeHighlights Render Tests", function() {
    var testSlider1;
    var testSlider2;

    //setup
    beforeEach(function() {
        testSlider1 = $('#testSlider1').slider({
            id: 'slider1',
            min: 0,
            max: 20,
            step: 1,
            value: 14,
            rangeHighlights: [
                { "start": 2, "end": 5 },    // left: 10%; width: 15%
                { "start": 7, "end": 8 },    // left: 35%; width: 5%
                { "start": 17, "end": 19 },  // left: 85%; width: 10%
                { "start": 17, "end": 24 },  //out of range - not visible
                { "start": -3, "end": 19 }   //out of range - not visible
            ]
        });

        testSlider2 = $('#testSlider2').slider({
            id: 'slider2',
            min: 0,
            max: 20,
            step: 1,
            value: 14,
            orientation: 'vertical',
            rangeHighlights: [
                { "start": 2, "end": 5 },   // top: 10%; height: 15%
                { "start": 7, "end": 8 },   // top: 35%; height: 5%
                { "start": 17, "end": 19 }, // top: 85%; height: 10%
                { "start": 7, "end": -4 },  //out of range - not visible
                { "start": 23, "end": 15 }  //out of range - not visible
            ]
        });
    });

    //cleanup
    afterEach(function() {
        testSlider1.slider('destroy');
        testSlider1 = null;

        testSlider2.slider('destroy');
        testSlider2 = null;
    });

    //test the visibility of ranges e.g. : { "start": 23, "end": 15 } - out of range - not visible
    function testHighlightedElements(sliderId, isHorizontal, expections) {

        //check elements exist
        it("Highlighted ranges are rendered - " + sliderId, function() {
            expect($(sliderId).length).toBe(1);
            expect($(sliderId + ' .slider-rangeHighlight').length).toBe(5);
        });

        //check elements exist within proper display value
        it("Highlighted ranges render inside the slider's bounds " + sliderId, function() {
            expect($(sliderId).length).toBe(1);

            var ranges = $(sliderId + ' .slider-rangeHighlight');
            expect(ranges.length).toBe(5);

            for (var i = 0; i < ranges.length; i++) {
                expect($(ranges[i]).is(":visible")).toBe(expections[i].isVisible);
                if (expections[i].isVisible) {
                    if(isHorizontal) {
                        expect(_getLeftPercent($(ranges[i]))).toBe(expections[i].start);
                        expect(_getWidthPercent($(ranges[i]))).toBe(expections[i].size);
                    } else {
                        expect(_getTopPercent($(ranges[i]))).toBe(expections[i].start);
                        expect(_getHeightPercent($(ranges[i]))).toBe(expections[i].size);
                    }
                }
            }
        });
    }

    function _getLeftPercent(element) {
        return Math.round(100 * element.position().left / element.parent().width()) + '%';
    }

    function _getWidthPercent(element) {
        var width = element.width();
        var parentWidth = element.offsetParent().width();
        return Math.round(100 * width / parentWidth) + '%';
    }

    function _getTopPercent(element) {
        return Math.round(100 * element.position().top / element.parent().height()) + '%';
    }

    function _getHeightPercent(element) {
        var height = element.height();
        var parentHeight = element.offsetParent().height();
        return Math.round(100 * height / parentHeight) + '%';
    }

    //test both testSlider
    testHighlightedElements('#slider1', true, [{
        isVisible: true,
        start: '10%',
        size: '15%'
    }, {
        isVisible: true,
        start: '35%',
        size: '5%'
    }, {
        isVisible: true,
        start: '85%',
        size: '10%'
    }, {
        isVisible: false,
        start: '85%',
        size: '10%'
    }, {
        isVisible: false,
        start: '85%',
        size: '10%'
    }]);
    testHighlightedElements('#slider2', false, [{
        isVisible: true,
        start: '10%',
        size: '15%'
    }, {
        isVisible: true,
        start: '35%',
        size: '5%'
    }, {
        isVisible: true,
        start: '85%',
        size: '10%'
    }, {
        isVisible: false,
        start: '85%',
        size: '10%'
    }, {
        isVisible: false,
        start: '85%',
        size: '10%'
    }]);
});