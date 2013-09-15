/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    uglify: {
      dist: {
        src: 'js/bootstrap-slider.js',
        dest: 'dist/bootstrap-slider.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: false,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          $ : true,
          Modernizr : true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      js: {
        src: '<%= uglify.dist.src %>'
      }
    },
    watch: {
      js : {
        files: '<%= uglify.dist.src %>',
        tasks: ['jshint:js']
      },
      gruntfile : {
        files: '<%= jshint.gruntfile %>',
        tasks: ['jshint:gruntfile']
      }
    },
    connect: {
      server: {
        options: {
          port: 9001
        }
      }
    },
    open : {
      development : {
        path: 'http://localhost:<%= connect.server.options.port %>'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  // Default task.
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('development', ['jshint', 'connect', 'open:development', 'watch']);
  grunt.registerTask('production', ['jshint', 'uglify']);

};