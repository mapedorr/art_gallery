/**
 * `stylus`
 *
 * ---------------------------------------------------------------
 * Compile STYLUS files into a CSS stylesheet.
 * ---------------------------------------------------------------
 *
 */
module.exports = function(grunt) {

  grunt.config.set('stylus', {
    dev: {
      options: {
        compress: false,
      },
      files: {
        '.tmp/public/styles/app/app.css':'assets/styles/app/app.styl'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
};
