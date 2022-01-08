/*
*a primary file for the api
*
*/

//Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
//The server should respond to all requests with a string representation
const server = http.createServer(function(req, res){

// get the url and parse interface
const parsedUrl = url.parse(req.url, true)
//get the path from url
const path = parsedUrl.pathname;
const trimedPath = path.replace(/^\/+|\/+$/g, '')

//   get the query string as an object
const queryStringObject = parsedUrl.query;

//Get the http method
const method = req.method.toLowerCase();

// Get the headers as an object
const headers = req.headers;

// Get the payload, if any 
const decoder = new StringDecoder('utf-8');
var buffer = '';
req.on('data', function(data) {
    buffer += decoder.write(data);
});
req.on('end', function(){
    buffer += decoder.end();
    res.end('Hello World\n');
    console.log('req received with these payload', buffer);
});
/*
//send response
res.end('Hello World\n')


//Log the request path
console.log('request received on path ' + trimedPath + 'with method ' + method + ' with this querystring paramentres', queryStringObject)
console.log('req received with these headers', headers)
*/
});
//Start the server and start it listening on port 3000


server.listen(3000, function(){
    console.log('server is listening port 3000')
});
