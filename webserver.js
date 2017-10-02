// Import the interface to Tessel hardware
let tessel = require('tessel');
// Load the http module to create an http server.
let http = require('http');

// Configure our HTTP server to respond with "Hello from Tessel!" to all requests.
let server = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello from Tessel!\n");
});

// Listen on port 8080, IP defaults to 192.168.1.101. Also accessible through [tessel-name].local
server.listen(8080);

// Put a friendly message in the terminal
console.log('Server running at http://192.168.1.101:8080/');
