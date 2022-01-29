//https://github.com/pirple/The-NodeJS-Master-Class

/**a primary file for the api*/
//Dependencies
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./lib/config');
var fs = require('fs');
var handlers = require('./lib/handlers');
var helpers = require('./lib/helpers');

//Instantiate the HTTP server
var httpServer = http.createServer(function(req, res){
    unifiedServer(req, res)
});

//Start the HTTP server;
httpServer.listen(config.httpPort, function (){
     console.log(`server is listening port ${config.httpPort} in ${config.envName} mode ...` )
    });

//Instantiate the HTTPS server
var httpsServerOptions = {
'key': fs.readFileSync('./https/key.pem'), 
'cert' : fs.readFileSync('./https/cert.pem')
};
var httpsServer = https.createServer(httpsServerOptions, function(req, res){ unifiedServer(req, res)
});

// Start the HTTPS server
httpsServer.listen(config.httpsPort, console.log(`server is listening port ${config.httpsPort} in ${config.envName} mode ...` ))


// All the server logic for both http and https server
function unifiedServer(req, res) {
    //get the url and parse interface
    var parsedUrl = url.parse(req.url, true);
    //get the path from url
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    //get the query string as an object
    var queryStringObject = parsedUrl.query;
    //Get the http method
    const method = req.method.toLowerCase();
    // Get the headers as an object
    const headers = req.headers;
    // Get the payload, if any 
    const decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function (data) {
    buffer += decoder.write(data);
    });
    req.on('end', function () {
        buffer += decoder.end();
        //Choose the handler this request should go to. If one is not found, use the notFound handler
        var chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
        //Construct the data object to send to the handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer),
        };

        //Route the req to the handler specified in the router
        chosenHandler(data, (statusCode, payload) => {
            // Use the status code called back by the handler, or default to 200
            /*var*/ statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            // Use the payload called back by the handler, or default to empty object
            payload = typeof (payload) == 'object' ? payload : {};

            // return the response
            // Convert the payload to a string
            var payloadString = JSON.stringify(payload);
            res.setHeader('Content-type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log(/*'Return this response: ', statusCode, payloadString*/trimmedPath, statusCode);
        });

    });
};
//Defining a request router ????????????????
var router = {
    'ping' : handlers.ping,
    'users' : handlers.users,
    };