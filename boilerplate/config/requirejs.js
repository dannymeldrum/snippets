module.exports = {
  compile: {
    options: {
      name: 'main',
      baseUrl: "./src/js/",
      //paths: { 'jquery': 'empty:' },
      include: ['vendor/require', 'main'],
      mainConfigFile: "./src/js/main.js",
      out: "./build/assets/js/scripts.js"
    }
  }
}