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

// Mock data for our users database
var users = {
  creationix: "sup3rS3cr3t",
  guest: "noderocks"
};

// Simple access rules
var access = {
  GET: {creationix: true, guest: true},
  PUT: {creationix: true},
  DELETE: {creationix: true}
};

// Authentation and Authorization in one go
function checker(req, username, password) {
  var allowed = access[req.method];
  if (allowed[username] && users[username] === password) {
    return username;
  }
}

// Stack up a server and start listening
HTTPS.createServer(options, Stack(
  Creationix.auth(checker, "My Sample Domain"),
  Creationix.log(),
  Creationix.indexer("/", root),
  Creationix.static("/", root)
)).listen(port);

// Give the user a nice message on the standard output
console.log("Serving %s at https://localhost:%s/", root, port);
