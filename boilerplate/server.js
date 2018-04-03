const express = require('express');

const http = require('http');

const app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.json());
app.use(app.router);
app.use(require('connect-livereload')({ port: 35729 }));
// app.use(express.directory('./build/'));
app.use(express.static('./build/'));
app.use(express.errorHandler());

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

// open in browser
const open = require("open");
open("http://localhost:" + app.get('port'));
