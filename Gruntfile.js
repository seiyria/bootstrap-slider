/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    uglify: {
      dist: {
        src: '<%= pkg.main %>',
        dest: '<%= pkg.gruntConfig.dist.js %>'
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
        src: '<%= pkg.main %>'
      },
      spec : {
        src: '<%= pkg.gruntConfig.spec %>',
        options : {
          globals : {
            console: false,
            $: false,
            _: false,
            _V_: false,
            afterEach: false,
            beforeEach: false,
            confirm: false,
            context: false,
            describe: false,
            expect: false,
            it: false,
            jasmine: false,
            JSHINT: false,
            mostRecentAjaxRequest: false,
            qq: false,
            runs: false,
            spyOn: false,
            spyOnEvent: false,
            waitsFor: false,
            xdescribe: false
          }
        }
      }
    },
    jasmine : {
      src : '<%= pkg.main %>',
      options : {
        specs : '<%= pkg.gruntConfig.spec %>',
        vendor : ['<%= pkg.gruntConfig.js.jquery %>'],
        styles : ['<%= pkg.gruntConfig.css.boostrap %>', '<%= pkg.gruntConfig.css.slider %>'],
        template : '<%= pkg.gruntConfig.tpl.SpecRunner %>'
      }
    },
    template : {
      'generate-index-page' : {
        options : {
          data : {
            js : {
              modernizr : '<%= pkg.gruntConfig.js.modernizr %>',
              jquery : '<%= pkg.gruntConfig.js.jquery %>',
              slider : '<%= pkg.main %>'
            },
            css : {
              bootstrap : '<%= pkg.gruntConfig.css.bootstrap %>',
              slider : '<%= pkg.gruntConfig.css.slider %>'
            }
          }
        },
        files : {
          'index.html' : ['<%= pkg.gruntConfig.tpl.index %>']
        }
      }
    },
    watch: {
      js : {
        files: '<%= pkg.main %>',
        tasks: ['jshint:js', 'jasmine']
      },
      gruntfile : {
        files: '<%= jshint.gruntfile %>',
        tasks: ['jshint:gruntfile']
      },
      spec : {
        files: '<%= jshint.spec %>',
        tasks: ['jshint:spec']
      }
    },
    connect: {
      server: {
        options: {
          port: "<%= pkg.gruntConfig.devPort %>"
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
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-template');

  // Default task.
  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('development', ['test', 'template', 'connect', 'open:development', 'watch']);
  grunt.registerTask('production', ['test', 'uglify']);

};