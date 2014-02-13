bootstrap-slider [![Build Status](https://travis-ci.org/seiyria/bootstrap-slider.png?branch=master)](https://travis-ci.org/seiyria/bootstrap-slider)
================
A "fork" of bootstrap-slider found on http://www.eyecon.ro/ originally by Stefan Petre.

Want to use this with Rails? [Check it out!](https://github.com/stationkeeping/bootstrap-slider-rails)

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
| orientation |	string | 'horizontal' |	set the orientation. Accepts 'vertical' or 'horizontal' |
| value |	float,array |	5	| initial value. Use array to have a range slider. |
| selection |	string |	'before' |	selection placement. Accepts: 'before', 'after' or 'none'. In case of a range slider, the selection will be placed between the handles |
| tooltip |	string |	'show' |	whether to show the tooltip on drag, hide the tooltip, or always show the tooltip. Accepts: 'show', 'hide', or 'always' |
| handle |	string |	'round' |	handle shape. Accepts: 'round', 'square' or 'triangle' |
| reversed | bool | false | whether or not the slider should be reversed |
| enabled | bool | true | whether or not the slider is initially enabled |
| formater |	function |	returns the plain value |	formatter callback. Return the value wanted to be displayed in the tooltip |

Functions
=========
| Function | Description |
| -------- | ----------- |
| .slider(options) | Initializes the slider |
| .slider('getValue') | Get the current value from the slider |
| .slider('setValue', newValue) | Set a new value for the slider |
| .slider('destroy') | Properly clean up and remove the slider instance |
| .slider('disable') | Disables the slider and prevents the user from changing the value |
| .slider('enable') | Enables the slider |
| .slider('toggle') | Toggles the slider between enabled and disabled |
| .slider('isEnabled') | Returns true if enabled, false if disabled |

Events
======
| Event | Description |
| ----- | ----------- |
| slideStart | This event fires when dragging starts |
| slide | This event fires when the slider is dragged |
| slideStop | This event fires when the dragging stops |
| slideChange | This event fires when the slider value changes via slider.setValue() |
| slideEnabled | This event fires when the slider is enabled |
| slideDisabled | This event fires when the slider is disabled |
