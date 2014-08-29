# junk [![Build Status](https://travis-ci.org/sindresorhus/junk.png?branch=master)](https://travis-ci.org/sindresorhus/junk)

> Filter out [OS junk files](test.js) like `.DS_Store` and `Thumbs.db`


## Install

```bash
$ npm install --save junk
```


## Example

```js
var fs = require('fs');
var junk = require('junk');

fs.readdir('path', function (err, files) {
	console.log(files);
	//=> ['.DS_Store', 'test.jpg']

	console.log(files.filter(junk.not));
	//=> ['test.jpg']
});
```


## API

### junk.is(filename)

Returns true if `filename` matches any of the `junk.rules`.

### junk.not(filename)

Returns true if `filename` doesn't match any of the `junk.rules`.

### junk.rules

Returns an array of regexes you can match against.


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
