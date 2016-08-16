/**
 * `copy`
 *
 * ---------------------------------------------------------------
 *
 * Copy files and/or folders from your `assets/` directory into
 * the web root (`.tmp/public`) so they can be served via HTTP,
 * and also for further pre-processing by other Grunt tasks.
 *
 * #### Normal usage (`sails lift`)
 * Copies all directories and files (except CoffeeScript and LESS)
 * from the `assets/` folder into the web root -- conventionally a
 * hidden directory located `.tmp/public`.
 *
 * #### Via the `build` tasklist (`sails www`)
 * Copies all directories and files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-copy
 *
 */
module.exports = function(grunt) {

  grunt.config.set('copy', {
    dev: {
      files: [{
        expand: true,
        cwd: './assets',
        src: ['**/*.!(coffee|less|styl)'],
        dest: '.tmp/public'
      },
      {
        // copy ANGULARJS JS files to 'assets/js/dependencies/' so they can be
        // automatically copied to '.tmp/public/js/dependencies/' by 'tasks/pipeline.js'
        expand: true,
        cwd: './bower_components/angular',
        src: ['angular.js'],
        dest: './assets/js/dependencies/'
      },
      {
        // copy angular-route files to 'assets/js/dependencies/' so they can be
        // automatically copied to '.tmp/public/js/dependencies/' by 'tasks/pipeline.js'
        expand: true,
        cwd: './bower_components/angular-route',
        src: ['angular-route.js'],
        dest: './assets/js/dependencies/'
      },
      {
        // copy images for pieces in the gallery...oh Glob, excuseme for this
        expand: true,
        cwd: './Source/assets/images',
        src: [
          '*.*'
        ],
        dest: '.tmp/uploads'
      }]
    },
    build: {
      files: [{
        expand: true,
        cwd: '.tmp/public',
        src: ['**/*'],
        dest: 'www'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
