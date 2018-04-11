module.exports = function(grunt){
  return {
    task: {
      options: {
        partialPaths: ["src/html/partials/"],
        helpers: {
          target: function () {
            return grunt.task.current.target;
          },
          render: function (filename, supplied_variables) {
            const variables = Object.assign(
              {},
              { model: {} },
              supplied_variables
            );
            return this.helpers.renderPartial(filename, variables);
          }
        }
      },
      files: [
        {
          expand: true,
          cwd: "src/html/pages/",
          src: "**/*.ejs",
          dest: "build/",
          ext: ".html"
        }
      ]
    }
  }
}