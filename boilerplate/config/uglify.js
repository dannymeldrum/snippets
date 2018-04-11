module.exports = function (grunt, options) {
  return {
    task: {
      src: './build/assets/js/script.js',
      dest: './build/assets/js/script.min.js'
    }
  };
}