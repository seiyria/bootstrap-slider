# grunt-header [![Build Status](https://travis-ci.org/sindresorhus/grunt-header.svg?branch=master)](https://travis-ci.org/sindresorhus/grunt-header)

> Add a header to files


## Install

```sh
$ npm install --save-dev grunt-header
```


## Usage

```js
grunt.initConfig({
	info: 'header text',
	header: {
		dist: {
			options: {
				text: '<%= info %>'
			},
			files: {
				'dist/main.js': 'src/main.js'
			}
		}
	}
});

grunt.loadNpmTasks('grunt-header');
grunt.registerTask('default', ['header']);
```


## Options

### text

Type: `string`

Text to be prepended to files.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
