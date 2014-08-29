/**
 * Bridget tests
 */

( function( window, $ ) {

'use strict';

// -------------------------- tests -------------------------- //

$( function() {

  $.bridget( 'niceGreeter', window.NiceGreeter );

  test( 'niceGreeter on dummy element', function() {
    ok( $.fn.niceGreeter, 'plugin added to jQuery namespace, $.fn.niceGreeter' );
    var $div = $('<div />');
    ok( $div.niceGreeter, '.niceGreeter method is there' );
    $div.niceGreeter();
    equal( typeof $div.data('niceGreeter'), 'object', 'instance accessible in .data()' );
  });

  test( 'niceGreeter', function() {
    var $ex1 = $('#ex1');
    $ex1.niceGreeter();
    var greeter = $ex1.data('niceGreeter');
    equal( typeof $ex1.data('niceGreeter'), 'object', 'instance accessible in .data()' );
    equal( $ex1.text(), 'hello world', 'default settings' );
    // method with argument
    $ex1.niceGreeter( 'sayHi', 'pretty boy' );
    equal( $ex1.text(), 'hello pretty boy', 'sayHi method with argument' );
    // option setter
    var ret = $ex1.niceGreeter( 'option', { greeting: 'bonjour' });
    equal( ret, $ex1, 'return value of method is jQuery object' );
    ret.niceGreeter();
    equal( greeter.options.greeting, 'bonjour', 'greeter.options.greeting = bonjour' );
    equal( $ex1.text(), 'bonjour world', 'option setter' );
    // method
    $ex1.niceGreeter({ loudGreeting: 'well hi there' });
    $ex1.niceGreeter('shout');
    equal( $ex1.text(), 'WELL HI THERE WORLD', 'shout method with argument' );
    // private method _whisper
    $ex1.niceGreeter( '_whisper', 'sweet nothings' );
    notEqual( $ex1.text(), 'sweet nothings', 'private method _whisper is private' );

    // set second instance
    var $ex2 = $('#ex2').niceGreeter({
      greeting: 'aloha',
      recipient: 'uncle'
    });
    var greeter2 = $ex2.data('niceGreeter');
    var $examples = $('.example');
    // method on multiple instances
    $examples.niceGreeter( 'option', {
      loudGreeting: 'yaaarg'
    });
    equal( greeter.options.loudGreeting, 'yaaarg', 'first greeter method worked' );
    equal( greeter2.options.loudGreeting, 'yaaarg', 'second greeter method worked' );
    // getter method
    var message = $examples.niceGreeter('getMessage');
    equal( message, 'bonjour world', 'getter method returns first value' );
  });

});

})( window, window.jQuery );
