module.exports = {
  html: {
    files: ["./src/html/**/*"],
    tasks: ['render:dev'],
    options: {
      livereload: true
    }
  },
  css: {
    files: ['./src/sass/**/*'],
    tasks: ['sass'],
    options: {
      livereload: true
    }
  },
  js: {
    files: ['./src/js/**/*'],
    tasks: ['requirejs', 'copy:dev'],
    options: {
      livereload: true
    }
  },
  assets: {
    files: ["./src/assets/**/*"],
    tasks: ["copy:dev"]
  }
}