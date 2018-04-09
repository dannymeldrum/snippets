module.exports = function(grunt) {

  function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
      key = option.replace(/\.js$/,'');
      object[key] = require(path + option);
    });

    return object;
  }

  // Initial config
  var config = {
    pkg: grunt.file.readJSON('package.json')
  }

  // Load tasks from the tasks folder
  grunt.loadTasks('tasks');

  // Load all the tasks options in tasks/options base on the name:
  // watch.js => watch{}
  grunt.util._.extend(config, loadConfig('./tasks/'));

  grunt.initConfig(config);

  require('load-grunt-tasks')(grunt);

  //Define the tasks to run
  grunt.registerTask('default', ['clean', 'postcss', 'render', 'copy', 'concat', 'uglify']);

  grunt.registerTask('dev', '[EP] Active development phase', [
    'sass:dev',
    'postcss',
    'render',
    'copy',
    'express',
    'watch',
  ]);
};