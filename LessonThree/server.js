const http = require('http')
/**
 * When we type on url for request it goes to the callback function take the request to the server and get response
 */

//To create server:- http.createserver() and there is callback functions
// it take request and response :- request have the details about url and types of request (get or post)
//response:- it brings the all details which is on that url and send to the clients  

const server = http.createServer((req, res) => {
    console.log("Request Made");  //This Log is for server Log not show on Browser
    //After adding this we can do 
    // /HTTP response status code to 200 (OK) 
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!\n');
})

//Now we have to listen url via server

server.listen(3000, 'localhost', () => {
    console.log("Listening request on port 3000");
})

// * The localhost:3000 will only load because we didn't do anything rather then log
