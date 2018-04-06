const autoprefixer = require('autoprefixer');
const csswring = require('csswring');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        src: './build/assets/js/script.js',
        dest: './build/assets/js/script.min.js'
      }
    },

    concat: {
      dist: {
        src: [
          './src/js/libs/*.js',
          './src/js/script.js'
        ],
        dest: './build/assets/js/script.js'
      }
    },

    sass: {
      dev: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: 'src/sass/',
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
          cwd: 'src/sass/',
          src: ['*.scss'],
          dest: './build/assets/css/',
          ext: '.css'
        }]
      }
    },

    postcss: {
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
      js: {
        files: ['./src/js/**/*'],
        tasks: ['uglify'],
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
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-ejs-render');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  //Define the tasks to run
  grunt.registerTask('default', ['sass:dist', 'postcss', 'render', 'copy', 'concat', 'uglify']);

  grunt.registerTask('dev', '[EP] Active development phase', [
    'sass:dev',
    'postcss',
    'render',
    'copy',
    'express',
    'watch',
  ]);
};