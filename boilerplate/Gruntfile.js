const matchdep = require('matchdep');
const load_grunt_configs = require('load-grunt-configs');

const setup_config = grunt => {
    matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    const configs = load_grunt_configs(grunt);
    configs.pkg = grunt.file.readJSON('package.json');
    grunt.initConfig(configs);
};

const define_tasks = grunt => {
  grunt.registerTask('default', [
    'clean',
    'sass:dist',
    'postcss',
    'render:dist',
    'copy:dist',
    'requirejs'
  ]);

  grunt.registerTask('dev', [
    'sass:dev',
    'postcss',
    'render:dev',
    'copy:dev',
    'requirejs',
    'express',
    'watch'
  ]);
};

module.exports = grunt => {
  setup_config(grunt);
  define_tasks(grunt);
};