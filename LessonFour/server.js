const http = require('http')
const fs = require('fs')

// THIS ALL CAN BE DONE USING EXPRESS.JS
//open localhost:3000

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //1. set Header: it tell what is coming as Response
    // res.setHeader('Content-Type', 'text/plain');
    // res.write('Hello, Node')
    // res.end(); 

    /*
    //2.------------- 
    res.setHeader('Content-Type', 'text/html');
    res.write('<head link rel="stylesheet href="/" ></head>')
    res.write('<h1>Hello, Node </h1> \n')
    res.write('Hello, Node, Again')
    res.end(); 
    
     */


    /*
    // ----------------- send html file
    //Now we will read file or send data from the file
     res.setHeader('Content-Type', 'text/html');
    fs.readFile('./views/index.html', (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        res.write(data);  // if there is only one data we can send into res.end(data)
        res.end();
    }) 
    */


    //------- Routing 
    res.setHeader('Content-Type', 'text/html');
    let path = './views'
    switch (req.url) {
        case '/':
            path += '/index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += '/about.html';
            res.statusCode = 200;
            break;
            
        // This use when we update url about-us to about we can do like this
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end;
            break;
        default:
            path += '/404.html';
            res.statusCode = 404;  // For the page that didn't exist like blog - http://localhost:3000/blogs
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        res.write(data);  // if there is only one data we can send into res.end(data)
        // res.statusCode = 200; // don't use status code here because it will set to all pages 
        res.end();
    })
})

server.listen(3000, 'localhost', () => {
    console.log("Listening request on port 3000");
})


