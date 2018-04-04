describe("'bsVersion' Option tests", function() {
    var testSlider;

    afterEach(function() {
        if (testSlider) {
            testSlider.destroy();
            testSlider = null;
        }
    });

    it('bs3 should be the default', function() {
        testSlider = new Slider('#testSlider1', {});
        expect(testSlider.options.bsVersion).toBe('bs3');
    });

    it('bs4 should be injectable through the constructor', function() {
        testSlider = new Slider('#testSlider1', {
            bsVersion: 'bs4'
        });
        expect(testSlider.options.bsVersion).toBe('bs4');
    });

    function testPosition(position, orientation) {
        testSlider = new Slider('#testSlider1', {
            bsVersion: 'bs4',
            tooltip_position: position,
            orientation: orientation
        });
        var tooltip = testSlider.tooltip;
        var classList = tooltip.classList;
        expect(classList).toContain('tooltip');
        expect(classList).toContain('bs-tooltip-' + position);
        expect(tooltip.classList.contains(position)).toBeFalsy();
        testSlider.destroy();
        testSlider = null;
    }

    it('when bs4 is selected - the tooltip css changes', function() {
        testPosition('top');
        testPosition('bottom');
        testPosition('left', 'vertical');
        testPosition('right', 'vertical');
    });

    it('"show" instead of "in" triggers the visibility', function() {
        testSlider = new Slider('#testSlider1', {
            bsVersion: 'bs4',
            tooltip: "always"
        });
        var tooltip = testSlider.tooltip;
        var classList = tooltip.classList;
        expect(classList).toContain('show');
        expect(tooltip.classList.contains('in')).toBeFalsy();
    });
});
