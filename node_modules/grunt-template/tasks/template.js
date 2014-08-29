module.exports = function(grunt) {

	var description = 'Interpolate template files with any data you provide ' +
		'and save the result to another file.';

	grunt.registerMultiTask('template', description, function() {
		// Merge task-specific and/or target-specific options with these defaults:
		var options = this.options({
			'data': {},
			'delimiters': 'config' // Default delimiters.
		});

		// Iterate over all specified file groups.
		this.files.forEach(function(file) {
			// Concat specified files.
			var src = file.src.filter(function(filePath) {
				// Warn on and remove invalid source files.
				if (!grunt.file.exists(filePath)) {
					grunt.log.warn('Source file `' + filePath + '` not found.');
					return false;
				} else {
					return true;
				}
			});
			if (!src.length) {
				grunt.log.warn(
					'Destination `' + file.dest +
					'` not written because `src` files were empty.'
				);
				return;
			}
			var template = src.map(function(filePath) {
				// Read file source.
				return grunt.file.read(filePath);
			}).join('\n');

			var templateOptions = {
				'data': typeof options.data == 'function' ?
					options.data() :
					options.data
			};

			if (options.delimiters) {
				templateOptions.delimiters = typeof options.delimiters == 'function' ?
					options.delimiters() :
					options.delimiters;
			}

			var result = grunt.template.process(template, templateOptions);

			// Write the destination file
			grunt.file.write(file.dest, result);

			// Print a success message
			grunt.log.writeln('File `' + file.dest + '` created.');
		});
	});

};
