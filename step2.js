// Load a couple built-in node libraries
var HTTPS = require('https');
var FS = require('fs');
// Load a couple third-party node modules
var Stack = require('stack');
var Creationix = require('creationix');

// Serve files relative to the current working directory
var root = process.cwd();
// Listen on the alt-https port
var port = process.env.PORT || 8433;

// Load our self-signed cert for HTTPS support
var options = {
  key: FS.readFileSync(__dirname + '/keys/nodebits-key.pem'),
  cert: FS.readFileSync(__dirname + '/keys/nodebits-cert.pem')
};

// Stack up a server and start listening
HTTPS.createServer(options, Stack(
  Creationix.log(),
  Creationix.indexer("/", root),
  Creationix.static("/", root)
)).listen(port);

// Give the user a nice message on the standard output
console.log("Serving %s at https://localhost:%s/", root, port);
