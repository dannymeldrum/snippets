module.exports = function (grunt, options) {
  return {
    dev: {
      options: {
        sourceMap: true
      },
      files: [{
        expand: true,
        cwd: './src/sass/',
        src: ['*.scss'],
        dest: './build/assets/css/',
        ext: '.css'
      }]
    },
    dist: {
      options: {
        sourceMap: false,
        outputStyle: "compressed"
      },
      files: [{
        expand: true,
        cwd: './src/sass/',
        src: ['*.scss'],
        dest: './build/assets/css/',
        ext: '.css'
      }]
    }
  };
}