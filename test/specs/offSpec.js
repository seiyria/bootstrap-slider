//-------------------------------------------------
//-------------------------------------------------
//----- Removes attached function from event  -----
//-------------------------------------------------
//-------------------------------------------------



describe("'off()' test", function() {
    var testSlider, eventHandlerTriggered, mouse;

    var onStart = function(){
        eventHandlerTriggered = true;
    };


    beforeEach(function() {
        eventHandlerTriggered = false;
        mouse = document.createEvent('MouseEvents');
    });


    it("'slideStart' event is triggered properly and can be binded to", function() {
        testSlider = $("#testSlider1").slider();

        testSlider.on('slideStart', onStart);
        testSlider.off('slideStart', onStart);

        testSlider.data('slider')._mousedown(mouse);

        expect(eventHandlerTriggered).not.toBeTruthy();
    });
});