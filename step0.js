// Load a couple built-in node libraries
var HTTP = require('http');
var FS = require('fs');
// Load a couple third-party node modules
var Stack = require('stack');
var Creationix = require('creationix');

// Serve files relative to the current working directory
var root = process.cwd();
// Listen on the alt-http port
var port = process.env.PORT || 3000;

// Stack up a server and start listening
HTTP.createServer(Stack(
  Creationix.log()
)).listen(port);

// Give the user a nice message on the standard output
console.log("Serving %s at http://localhost:%s/", root, port);
