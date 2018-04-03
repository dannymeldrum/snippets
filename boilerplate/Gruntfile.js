module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        sourceMap: true
      },
      dev: {
        files: {
          './build/css/screen.css': './src/sass/screen.scss'
        }
      }
    },

    watch: {
      html: {
        files: ["./src/html/**/*"],
        tasks: ['render'],
      },
      css: {
        files: ['./src/sass/**/*'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      }
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
            "dest": "build/html",
            "ext": ".html"
          }
        ]
      }
    }

  });

  //Load the plugins
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ejs-render');

  //Define the tasks to run
  grunt.registerTask('default', ['sass', 'render']);

  grunt.registerTask('dev', '[EP] Active development phase', [
    'sass',
    'watch',
  ]);
};