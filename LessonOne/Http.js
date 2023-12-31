const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
http.createServer(function (request, response) {
    let pathname = url.parse(request.url).pathname;


    console.log(`Request for ${pathname} is received`);

    // Handle the case when the root path is requested
    if (pathname === '/') {
        pathname = '/index.html';
    }

    const filepath = path.join(__dirname, pathname.substr(1));
    fs.readFile(filepath, function (err, data) {
        if (err) {
            console.log(err);
            response.writeHead(404, { 'Content-type': 'text/html' })
            response.end('404 Not Found');
        }
        else {
            response.writeHead(200, { 'Content-type': 'text/html' })
            response.write(data.toString())
            response.end();
        }
    })
}).listen(3000)

console.log("Server is Running at localhost:3000");