const autoprefixer = require('autoprefixer');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        sourceMap: true,
        outputStyle: "nested"
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'src/sass/',
          src: ['*.scss'],
          dest: 'build/css/',
          ext: '.css'
        }]
      }
    },

    watch: {
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
      assets: {
        files: [
          "./src/assets/**/*"
        ],
        tasks: [
          "copy:dev"
        ]
      },
    },

    render: {
      options: {
        partialPaths: ["src/html/partials/"],
        helpers: {
          target: function () {
            return grunt.task.current.target;
          },
          "render": function (filename, supplied_variables) {
            const variables = Object.assign(
              {},
              { model: {} },
              supplied_variables
            );
            return this.helpers.renderPartial(filename, variables);
          }
        }
      },
      dev: {
        files: [
          {
            "expand": true,
            "cwd": "src/html/pages/",
            "src": "**/*.ejs",
            "dest": "build/",
            "ext": ".html"
          }
        ]
      }
    },

    express: {
      dev: {
        options: {
          script: "./server.js"
        }
      }
    },

    postcss: {
      "dev": {
        "options": {
          "processors": [
            autoprefixer({
                "browsers": ['ie 11', 'last 2 versions']
            })
          ]
        },
        "expand": true,
        "cwd": "./build/css",
        "src": "**/*.css",
        "dest": "./build/css/"
      },
    },

    copy: {
      "dev": {
        "files": [
          {
            "expand": true,
            "cwd": "./src/assets/",
            "src": "**/*",
            "dest": "./build/assets/"
          }
        ]
      }
    }

  });

  //Load the plugins
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ejs-render');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-copy');

  //Define the tasks to run
  grunt.registerTask('default', ['sass', 'copy']);

  grunt.registerTask('dev', '[EP] Active development phase', [
    'copy',
    'sass',
    'render',
    'express',
    'watch',
  ]);
};