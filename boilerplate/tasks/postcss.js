const autoprefixer = require('autoprefixer');
const csswring = require('csswring');

module.exports = function (grunt, options) {
  return {
    dev: {
      options: {
        processors: [
          autoprefixer({
            browsers: ['ie 8', 'ie 9', 'last 2 versions']
          })
        ]
      },
      expand: true,
      cwd: "./build/assets/css/",
      src: "**/*.css",
      dest: "./build/assets/css/"
    }
  }
}