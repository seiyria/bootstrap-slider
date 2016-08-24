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
                { "start": 2, "end": 5 },
                { "start": 7, "end": 8 },
                { "start": 17, "end": 19 },
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
            rangeHighlights: [
                { "start": 2, "end": 5 },
                { "start": 7, "end": 8 },
                { "start": 17, "end": 19 },
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
    function testHighlightedElements(sliderId) {

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

            expect($(ranges[0]).is(":visible")).toBe(true);
            expect($(ranges[1]).is(":visible")).toBe(true);
            expect($(ranges[2]).is(":visible")).toBe(true);
            expect($(ranges[3]).is(":visible")).toBe(false);
            expect($(ranges[4]).is(":visible")).toBe(false);
        });
    }

    //test both testSlider
    testHighlightedElements('#slider1');
    testHighlightedElements('#slider2');
});