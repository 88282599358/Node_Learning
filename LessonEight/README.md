**Introduction**
- Middleware refers to a software component or function that sits between the incoming HTTP request and the outgoing HTTP response. It is a crucial part of many web applications and frameworks, such as Express.js, and plays a key role in handling various tasks and processing requests as they move through the application.

- Middleware functions in Node.js are executed in a sequential order when an HTTP request is received by the server. Each middleware function can modify the request object (req), the response object (res), or pass control to the next middleware in the chain. 

**This allows you to add functionality and perform tasks such as:**

1. Logging: Middleware can log information about incoming requests, such as request method, URL, and timestamp, to help with debugging and monitoring.

2. Authentication: Middleware can check if a user is authenticated or has the necessary permissions to access a particular resource. For example, you might use middleware to verify user sessions or JWT tokens.

3. Authorization: Middleware can ensure that a user is authorized to perform a specific action or access a particular resource. This is often used in conjunction with authentication middleware.

4. Parsing Request Data: Middleware can parse the incoming request body to extract data in various formats, such as JSON or form data.

5. Validation: Middleware can validate the data sent in the request to ensure it meets the required criteria.

6. Error Handling: Middleware can catch errors and handle them in a consistent way, providing error messages or responses to clients.

7. CORS Handling: Middleware can handle Cross-Origin Resource Sharing (CORS) to control which domains are allowed to access your server's resources.

8. Compression: Middleware can compress responses to reduce bandwidth usage and improve performance.

9. Routing: In frameworks like Express.js, routing can be considered a type of middleware that routes requests to specific handlers or controllers based on the URL.


**Installation**
1. npm install morgan
- It is 3rd party middleware use to solve complex middleware

**Working with Middleware**
1. in app.js
```javascript

const express = require('express')

//express app
const app = express();

app.listen(3000);

// register view Engine

app.set('view engine', 'ejs');

//middleware function
app.use((req,res) => {
    console.log("New Request Made");
    console.log("host: ", req.hostname);
    console.log("path: ", req.path);
    console.log("method: ", req.method);
   
})

app.use((req,res) => {
    console.log("in the next middleware");
    
})



app.get('/', (req, res) => {

    //in ejs we can pass array or block etc.
    const blogs = [
        { title: 'Node from Moon', snippet: 'lorem ispum dolor sit consectutor' },
        { title: 'Node from Star', snippet: 'lorem ispum dolor sit consectutor' },
        { title: 'Node from Sun', snippet: 'lorem ispum dolor sit consectutor' },
    ];

    //   title here is just a object and we get this object in index page and in blog we can use blogs:blogs (both will same)
    res.render('index', { title: 'Node', blogs })
})
  
app.get('/about', (req, res) => { 
    //to send html page
    res.render('about', { title: 'Let know me' })
})

app.get('/blogs/create', (req, res) => {
    res.render('blog', { title: 'Read Blog' })
})

app.use((req, res) => {
    //to send html page
    res.status(404).render('404', { title: '404' })
})

```

**IMPORTANT NOTE and next() function**
- Now when we use middleware function then the browser get run but after it will hang because it didn't know what to do next.
-  So to handle this stuff we use next() in middleware function
- Now let's make some changes in code

2. app.js
```javascript
const express = require('express')


//express app
const app = express();

app.listen(3000);

// register view Engine

app.set('view engine', 'ejs');

app.use((req,res, next) => {
    console.log("New Request Made");
    console.log("host: ", req.hostname);
    console.log("path: ", req.path);
    console.log("method: ", req.method);
    next();
})

app.use((req,res, next) => {
    console.log("in the next middleware");
    next();
})


app.get('/', (req, res) => {

    //in ejs we can pass array or block etc.
    const blogs = [
        { title: 'Node from Moon', snippet: 'lorem ispum dolor sit consectutor' },
        { title: 'Node from Star', snippet: 'lorem ispum dolor sit consectutor' },
        { title: 'Node from Sun', snippet: 'lorem ispum dolor sit consectutor' },
    ];

    //   title here is just a object and we get this object in index page and in blog we can use blogs:blogs (both will same)
    res.render('index', { title: 'Node', blogs })
})
  
app.get('/about', (req, res) => { 
    //to send html page
    res.render('about', { title: 'Let know me' })
})

app.get('/blogs/create', (req, res) => {
    res.render('blog', { title: 'Read Blog' })
})

app.use((req, res) => {
    //to send html page
    res.status(404).render('404', { title: '404' })
})

```
**morgan**

- But Now we can do middleware function using some 3rd party middleware 
- named **morgan**  
- npm i morgan

3. app.js
```javascript

const express = require('express')
const morgan = require('morgan')


//express app
const app = express();

app.listen(3000);

// register view Engine

app.set('view engine', 'ejs');


// morgan middleware
app.use(morgan('tiny'))
app.use(morgan('dev'))
app.use(morgan('combined'))


app.get('/', (req, res) => {

    //in ejs we can pass array or block etc.
    const blogs = [
        { title: 'Node from Moon', snippet: 'lorem ispum dolor sit consectutor' },
        { title: 'Node from Star', snippet: 'lorem ispum dolor sit consectutor' },
        { title: 'Node from Sun', snippet: 'lorem ispum dolor sit consectutor' },
    ];

    res.render('index', { title: 'Node', blogs })
})
  
app.get('/about', (req, res) => { 
    //to send html page
    res.render('about', { title: 'Let know me' })
})

app.get('/blogs/create', (req, res) => {
    res.render('blog', { title: 'Read Blog' })
})

app.use((req, res) => {
    //to send html page
    res.status(404).render('404', { title: '404' })
})

```

1. `app.use(morgan('tiny'))`:
   - This line of code is telling your Express.js application to use the Morgan middleware with the 'tiny' format for logging HTTP requests.
   - Morgan is a popular logging middleware for Node.js applications, and it helps in generating logs of HTTP requests made to your server.
   - The 'tiny' format is one of the predefined log formats provided by Morgan. It's a concise format that logs only basic information about each request, such as the HTTP method, status code, and response time.

2. `app.use(morgan('dev'))`:
   - This line of code is adding another instance of the Morgan middleware, but this time with the 'dev' format.
   - The 'dev' format is another predefined format provided by Morgan. It's more detailed than the 'tiny' format and is often used during development for debugging purposes.
   - The 'dev' format logs additional information such as the HTTP method, status code, response time, and more, including request headers and query parameters.

3. `app.use(morgan('combined'))`:
    - The `'combined'` format in the Morgan logging library is one of the predefined log formats that provide comprehensive information about incoming HTTP requests and the corresponding responses. This format is typically used for detailed logging in production environments to monitor web server activity and analyze traffic patterns. Let's break down what each part of the `'combined'` format represents:

     Here's an example of a log entry in the `'combined'` format:

    ```
      ::1 - - [23/Sep/2023:18:51:15 +0000] "GET / HTTP/1.1" 304 - "http://localhost:3000/about" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
    ```

    1. `::1`: This is the remote IP address. In this example, `::1` represents the IPv6 equivalent of localhost, often used for local testing. In a production environment, you would see the actual IP address of the client making the request.

    2. `- -`: These two hyphens are placeholders for user identification. In the `'combined'` format, it doesn't include information about the user making the request or any authentication details. In other formats, such as `'common'`, you might see the user's identity.

    3. `[24/Sep/2023:12:34:56 +0000]`: This is the timestamp of the request in the format `[day/month/year:hour:minute:second +timezone]`.

    4. `"GET / HTTP/1.1"`: This part indicates the HTTP request method (`GET`), the requested URL (`/` in this case), and the HTTP protocol version (`HTTP/1.1`).

    5. `304`: This is the HTTP response status code. In this example, it's `304`, which typically signifies a successful request.

    6. `"-"`: This is a placeholder for the referrer URL. It would typically show the URL of the page that linked to the current request, but in this example, it's not provided.

    7. `"Mozilla/5.0 ..."`: This part represents the user agent string of the client making the request. It includes information about the client's browser, operating system, and other details.

    The `'combined'` format is comprehensive and can be useful for monitoring and analyzing web server traffic, especially in production environments. It provides detailed information about each request and response, making it easier to diagnose issues, track user activity, and detect potential security threats. However, keep in mind that the detailed information provided by this format can generate large log files, so it's important to manage and rotate logs appropriately to avoid overwhelming your server's storage.


**Usage:**

- By adding these lines of code to your Express.js application, you enable request logging for incoming HTTP requests.
- When a client makes an HTTP request to your server, Morgan will automatically log information about that request according to the specified format ('tiny' or 'dev') to the console or another designated log file.
- This logging can be very helpful for debugging and monitoring your application. It allows you to see incoming requests, their HTTP methods, response statuses, and how long each request took to process.

Here's a brief example of what a log entry might look like using the 'tiny' format:
```
GET /example-route 200 - 15.582 ms
```

And here's an example using the 'dev' format:
```
GET /example-route 200 22.156 ms - 104
```

In both cases, you can see the HTTP method ('GET'), the requested route ('/example-route'), the response status code ('200'), the response time ('15.582 ms' or '22.156 ms'), and additional information depending on the format used. This information can be invaluable when diagnosing issues or monitoring the performance of your application during development or in production.


- For more visit:- https://www.npmjs.com/package/morgan


**static files**

- if we create any file in dir we can't access then directly
- it will show you that which files can we make public
- means browser can access

1. create on styles.css in LessonEight and write this code for testing

- styles.css
```
body{
    background-color: aqua;
}
```
- go to url and try to use this link:  http://localhost:3000/styles.css
- it will give 404 error because we can't access files directly to browser
- Go to head.ejs in views/partial folder and link file in head tag
```
    <link rel="stylesheet" href="/styles.css">
```
- go to browser inspect -> network we see error in styles.css file
- this is because browser didn't want to show every files to user it keep safe
- So to make file public follow 2. 

2. 
- create one public folder in LessonEight
- in it create one styles.css
- in app.js
```javascript

// middleware and static files
app.use(express.static('public'))

```
- now what files will be in the public folder will get access through browser
- go to browser inspect -> network we see error in styles.css file
- now we get 200 status code 
- http://localhost:3000/styles.css 

- now copy css from head.ejs and paste in styles.css 
- http://localhost:3000/styles.css


