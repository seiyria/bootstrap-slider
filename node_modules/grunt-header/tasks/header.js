'use strict';
var detectNewline = require('detect-newline');

module.exports = function (grunt) {
	grunt.registerMultiTask('header', 'Add a header', function () {
		var options = this.options({
			text: ''
		});

		this.files.forEach(function (el) {
			var src = el.src[0];
			var out = options.text + detectNewline(src) + grunt.file.read(src);
			grunt.file.write(el.dest, out);
		});
	});
};
