/*
 * Generated on 2015-05-30
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2015Thomas Meitz
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist',
      lesstyles: 'src/styles/less',
      srcassets: 'src/assets'
    },

    less: {
      development: {
        options: {
          sourceMap: true,
          dumpLineNumbers: 'comments',
          relativeUrls: true,
        },
        files: {
          "<%= config.srcassets %>/theme.css": "<%= config.lesstyles %>/main.less",
          "<%= config.srcassets %>/bootstrap.debug.css": "<%= config.lesstyles %>/bootstrap.less"
        }
      },
      production: {
        options: {
          cleancss: true,
          compress: true,
          relativeUrls: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "<%= config.srcassets %>/theme.css": "<%= config.lesstyles %>/main.less",
          "<%= config.srcassets %>/bootstrap.css": "<%= config.lesstyles %>/bootstrap.less"
        }
      }
    },


    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      styles: {
        files: ['<%= config.lesstyles %>/**/*.less'], // which files to watch
        tasks: ['css'],
        options: {
          nospawn: true
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.srcassets %>/*.css',
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      all: {
        options: { livereload: true },
        files: ['<%= config.srcassets %>/*.css'],
        tasks: ['css'],
      }
    },

    connect: {
      options: {
        port: 8080,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs',
          middleware: ['assemble-middleware-sitemap','assemble-middleware-toc','assemble-middleware-anchors','assemble-middleware-permalinks'], // ,'assemble-middleware-toc'
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    copy: {
      bootstrap_fonts: {
        expand: true,
        cwd: 'bower_components/bootstrap/dist/fonts/',
        src: '**',
        dest: '<%= config.dist %>/assets/fonts/'
      },
      bootstrap_js: {
        expand: true,
        cwd: 'bower_components/bootstrap/dist/js/',
        src: '**',
        dest: '<%= config.dist %>/assets/js/'
      },
      theme: {
        expand: true,
        cwd: 'src/assets/',
        src: '**',
        dest: '<%= config.dist %>/assets/css/'
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('server', [
    'css',
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('css',['less','copy:theme']);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
