**Introduction**

# To come out of current dir
    use cd ..
# To go to dir
    use cd filename


# Important Installation

```javascript
const http = require("http");
const fs = require("fs");
```


# Finding the type of file and writing in it
```javascript 

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //1. set Header: it tell what is coming as Response
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello, Node')

    //2.------------- 
     res.setHeader('Content-Type', 'text/html');
     res.write('<head link rel="stylesheet href="/" "></head>')
     res.write('<h1>Hello, Node </h1> \n')
     res.write('Hello, Node, Again')
     res.end(); 
})

server.listen(3000, 'localhost', () => {
    console.log("Listening request on port 3000");
})

```

# create 3 html file to working with  file system

1. index.html (main file)
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>

<body>
    <h1>Home</h1>
    <h2>Your path to becoming a Node.js</h2>
    <h3>This is also our head page</h3>
</body>

</html>

```

2. about.html
```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About</title>
</head>

<body>
    <h1>About</h1>
    <h2>Your path to becoming a Node.js!</h2>
</body>

</html>
```
3. 404.html (we page didn't exist)

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Error</title>
</head>

<body>
    <h1>404 - OOPS</h1>
    <h2>This Page is not Exist</h2>
</body>

</html>

```

# send HTML file

```javascript
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
```

# Routing in Node 

```javascript

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

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

```
