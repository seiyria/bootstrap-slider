# is-root [![Build Status](https://travis-ci.org/sindresorhus/is-root.png?branch=master)](http://travis-ci.org/sindresorhus/is-root)

> Check if the process is running as root user. Eg. started with `sudo`.


## Install

Install with [npm](https://npmjs.org/package/is-root)

```
npm install --save is-root
```


## Example

```
$ sudo node index.js
```

```js
// index.js
var isRoot = require('is-root');

isRoot();
//=> true
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
