module.exports = {
  html: {
    files: ["./src/html/**/*"],
    tasks: ['render'],
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
    tasks: ['requirejs'],
    options: {
      livereload: true
    }
  },
  assets: {
    files: [
      "./src/assets/**/*"
    ],
    tasks: [
      "copy:dev"
    ]
  }
}