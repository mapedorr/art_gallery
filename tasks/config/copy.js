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
        src: ['**/*.!(coffee|less)'],
        dest: '.tmp/public'
      },
      {
        // copy BOOTSTRAP CSS files to 'assets/styles' so they can be
        // automatically copied to '.tmp/public/styles/' by 'tasks/pipeline.js'
        expand: true,
        cwd: './bower_components/bootstrap/dist/css',
        src: [
          'bootstrap.css',
          'bootstrap-theme.css'
        ],
        dest: './assets/styles/'
      },
      {
        // copy ANGULARJS JS files to 'assets/js/dependencies/' so they can be
        // automatically copied to '.tmp/public/js/dependencies/' by 'tasks/pipeline.js'
        expand: true,
        cwd: './bower_components/angular',
        src: ['angular.js'],
        dest: './assets/js/dependencies/'
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
