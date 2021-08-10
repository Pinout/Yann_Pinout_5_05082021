const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//modules and variables
    var http = require("http");
    var url = require("url");
    var fs = require("fs");
 
 
//server
fs.readFile('../front-end/index.html', function (err, html) {
    if (err) {
        throw err;
    }      
    http.createServer(function(request, response) { 
        response.writeHeader(200, {"Content-Type": "text/html"}); 
        response.write(html); 
        response.end(); 
    }).listen(port);
});
 
console.log('Server listenning on port',port);