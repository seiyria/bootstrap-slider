bootstrap-slider [![Build Status](https://travis-ci.org/seiyria/bootstrap-slider.png?branch=master)](https://travis-ci.org/seiyria/bootstrap-slider)
================
A "fork" of bootstrap-slider found on http://www.eyecon.ro/ originally by Stefan Petre.

Installation
============
Clone the repository, then run `npm install`

Want to use bower? `bower install seiyria-bootstrap-slider`

Examples
========
You can see all of our API examples [here](http://seiyria.github.io/bootstrap-slider/).

Using bootstrap-slider
======================

Create an input element and call .slider() on it:

```js
$("input.slider").slider();
```
Options
=======
Options can be passed either as a data (data-slider-foo) attribute, or as part of an object in the slider call. The only exception here is the formater argument - that can not be passed as a data- attribute.


| Name | Type |	Default |	Description |
| ---- |:----:|:-------:|:----------- |
| id | string | '' | set the id of the slider element when it's created |
| min |	float	| 0 |	minimum possible value |
| max |	float |	10 |	maximum possible value |
| step | float |	1 |	increment step |
| precision | float |	0 |	The number of digits shown after the decimal. Defaults to the number of digits after the decimal of _step_ value. |
| orientation |	string | 'horizontal' |	set the orientation. Accepts 'vertical' or 'horizontal' |
| value |	float,array |	5	| initial value. Use array to have a range slider. |
| range |	bool |	false	| make range slider. Optional if initial value is an array. If initial value is scalar, max will be used for second value. |
| selection |	string |	'before' |	selection placement. Accepts: 'before', 'after' or 'none'. In case of a range slider, the selection will be placed between the handles |
| tooltip |	string |	'show' |	whether to show the tooltip on drag, hide the tooltip, or always show the tooltip. Accepts: 'show', 'hide', 'drag' or 'always'. The 'drag' option does not show the tooltip when mousing over the slider. |
| tooltip_separator |	string |	':' |	tooltip separator |
| tooltip_split |	bool |	false |	if false show one tootip if true show two tooltips one for each handler |
| handle |	string |	'round' |	handle shape. Accepts: 'round', 'square' or 'triangle' |
| reversed | bool | false | whether or not the slider should be reversed |
| enabled | bool | true | whether or not the slider is initially enabled |
| formater |	function |	returns the plain value |	formatter callback. Return the value wanted to be displayed in the tooltip |
| natural_arrow_keys | bool | false | The natural order is used for the arrow keys. Arrow up select the upper slider value for vertical sliders, arrow right the righter slider value for a horizontal slider - no matter if the slider was reversed or not. By default the arrow keys are oriented by arrow up/right to the higher slider value, arrow down/left to the lower slider value. |

Functions
=========
| Function | Description |
| -------- | ----------- |
| .slider(options) | Initializes the slider |
| .slider('getValue') | Get the current value from the slider |
| .slider('setValue', newValue, [triggerSlideEvent]) | Set a new value for the slider. If optional triggerSlideEvent parameter is _true_, the 'slide' event will be triggered. |
| .slider('destroy') | Properly clean up and remove the slider instance |
| .slider('disable') | Disables the slider and prevents the user from changing the value |
| .slider('enable') | Enables the slider |
| .slider('toggle') | Toggles the slider between enabled and disabled |
| .slider('isEnabled') | Returns true if enabled, false if disabled |
| .slider('setAttribute', [attribute], [value]) | Updates the slider's [attributes](#options) |
| .slider('getAttribute', [attribute]) | Get the slider's [attributes](#options) |
| .slider('refresh') | Refreshes the current slider |

Events
======
| Event | Description |
| ----- | ----------- |
| slideStart | This event fires when dragging starts |
| slide | This event fires when the slider is dragged |
| slideStop | This event fires when the dragging stops |
| slideEnabled | This event fires when the slider is enabled |
| slideDisabled | This event fires when the slider is disabled |

Other Platforms & Libraries
===========================
- [Ruby on Rails](https://github.com/stationkeeping/bootstrap-slider-rails)
- [knockout.js](https://github.com/cosminstefanxp/bootstrap-slider-knockout-binding) ([@cosminstefanxp](https://github.com/cosminstefanxp), [#81](https://github.com/seiyria/bootstrap-slider/issues/81))
- [AngularJS](https://github.com/seiyria/angular-bootstrap-slider)

Maintainers
============
- Kyle Kemp
	* Twitter: [@seiyria](https://twitter.com/seiyria)
	* Github: [seiyria](https://github.com/seiyria)
- Rohit Kalkur
	* Twitter: [@Rovolutionary](https://twitter.com/Rovolutionary)
	* Github: [rovolution](https://github.com/rovolution)
