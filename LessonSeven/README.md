**Introduction**

- We will learn about View Engine Templates
- a "view engine" is a component or template system that helps generate dynamic HTML content for web applications.
- View engines are commonly used in web frameworks like Express.js to render HTML templates with dynamic data.

**Here's how a view engine typically works in Node.js:**

1. Template Creation: You create HTML templates that include placeholders or tags where dynamic data should be inserted. These placeholders are usually enclosed in special syntax specific to the chosen view engine.

2. View Engine Configuration: In your Node.js application, you configure a view engine by specifying which one you want to use. Some popular view engines for Node.js include EJS (Embedded JavaScript), Pug (formerly known as Jade), Handlebars, and Mustache.

3. Rendering: When a request is made to your web application, and you want to send an HTML response, you use the view engine to render a specific template. You pass data (e.g., variables or objects) to the view engine, which replaces the placeholders in the template with the actual data.

4. Sending the Response: The rendered HTML content is sent as a response to the client's browser.

**Installation**

1. npm install EJS
2. npm install express-handlers
3. npm install pug

**ejs**

1. Firstly we will learn EJS by doing Simple ejs file with plain HTML
2. We have views folder and it in we have 404.ejs, about.ejs, blog.ejs, index.ejs
3. We have app.js where we render our all app

-- Let's Learn EJS

```javascript
-app.js;
const express = require("express");

//express app
const app = express();

app.listen(3000);

// register view Engine

app.set("view engine", "ejs");

//if we have different view
// app.set('views', 'myviews');

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  //to send html page
  res.render("about");
});

app.get("/blogs/create", (req, res) => {
  res.render("blog");
});

app.use((req, res) => {
  //to send html page
  res.status(404).render("404");
});
```

1. index.ejs

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <nav>
        <div class="site-title">
            <a href="/"><h1>Home</h1></a>
            <p>King Site</p>
        </div>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/blogs/create">Blogs</a></li>
        </ul>
    </nav>
    <div class="blog content">
        <h2>This is Home Page</h2>
    </div>
</body>
</html>

```

2. about.ejs

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About</title>
</head>
<body>
    <nav>
        <div class="site-title">
            <a href="/"><h1>Blog</h1></a>
            <p>About Site</p>
        </div>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/blogs/create">Blogs</a></li>
        </ul>
    </nav>
    <div class="about content">
        <h2>About us</h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga rerum molestiae, aspernatur ipsa sed iste?</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga rerum molestiae, aspernatur ipsa sed iste?</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga rerum molestiae, aspernatur ipsa sed iste?</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga rerum molestiae, aspernatur ipsa sed iste?</p>
    </div>
</body>
</html>
```

3. blog.ejs

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog</title>
</head>

<body>
    <nav>
        <div class="site-title">
            <a href="/">
                <h1>Blog</h1>
            </a>
            <p>King Site</p>
        </div>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/blogs/create">Blogs</a></li>
        </ul>
    </nav>
    <div class="blog content">
        <h2>All Blogs</h2>
        <form>
            <label for="title">Blog Title:</label>
            <input type="text" id="title" required /> <br /><br />
            <label for="snippet">Blog Snippet:</label>
            <input type="text" id="title" required /> <br /><br />
            <label for="Body">Blog Body:</label>
            <textarea id="body" required></textarea> <br /><br />
            <button>Submit</button>
        </form>
    </div>
</body>

</html>
```

4. 404.ejs

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Page</title>
</head>
<body>
    <nav>
        <div class="site-title">
            <a href="/"><h1>Blog</h1></a>
            <p>Page not found Site</p>
        </div>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/blogs/create">Blogs</a></li>
        </ul>
    </nav>
    <div class="not-found content">
        OOPs Page Not Found :->
    </div>
</body>
</html>
```

-- Now let's pas the data into views

```javascript
-Syntax
<% %>

```

1. app.js

```javascript
const express = require("express");

//express app
const app = express();

app.listen(3000);

// register view Engine

app.set("view engine", "ejs");

//if we have different view
// app.set('views', 'myviews');

app.get("/", (req, res) => {
  //in ejs we can pass array or block etc.
  const blogs = [
    { title: "Node from Moon", snippet: "lorem ispum dolor sit consectutor" },
    { title: "Node from Star", snippet: "lorem ispum dolor sit consectutor" },
    { title: "Node from Sun", snippet: "lorem ispum dolor sit consectutor" },
  ];

  //   title here is just a object and we get this object in index page and in blog we can use blogs:blogs (both will same)
  res.render("index", { title: "Node", blogs });
});

app.get("/about", (req, res) => {
  //to send html page
  res.render("about", { title: "Let know me" });
});

app.get("/blogs/create", (req, res) => {
  res.render("blog", { title: "Read Blog" });
});

app.use((req, res) => {
  //to send html page
  res.status(404).render("404", { title: "404" });
});
```

2. index.js

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home | <%= title %>
  </title>
</head>

<body>
  <% const name='Mario' %>
  <nav>
    <div class="site-title">
      <p>
        <%= name %>
      </p>
      <a href="/">
        <h1>Home</h1>
      </a>
      <p>King Site</p>
    </div>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/blogs/create">Blogs</a></li>
    </ul>
  </nav>
  <div class="blog content">
    <h2>This is Home Page</h2>

    <% if(blogs.length> 0) { %>
    <% blogs.forEach(blog => { %>
    <h3 class="title">
      <%= blog.title %>
    </h3>
    <p class="snippet">
      <%= blog.snippet %>
    </p>
    <% }) %>

    <% } else {%>
    <p> There are no blogs to display...</p>
    <% } %>
  </div>
</body>

</html>
```

3. about.js

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About | <%= title %> </title>
</head>
<body>
    <nav>
        <div class="site-title">
            <a href="/"><h1>Blog</h1></a>
            <p>About Site</p>
        </div>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/blogs/create">Blogs</a></li>
        </ul>
    </nav>
    <div class="about content">
        <h2>About us</h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga rerum molestiae, aspernatur ipsa sed iste?</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga rerum molestiae, aspernatur ipsa sed iste?</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga rerum molestiae, aspernatur ipsa sed iste?</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga rerum molestiae, aspernatur ipsa sed iste?</p>
    </div>
</body>
</html>
```

4. blog.js

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog | <%= title %> </title>
</head>

<body>
    <nav>
        <div class="site-title">
            <a href="/">
                <h1>Blog</h1>
            </a>
            <p>King Site</p>
        </div>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/blogs/create">Blogs</a></li>
        </ul>
    </nav>
    <div class="blog content">
        <h2>All Blogs</h2>
        <form>
            <label for="title">Blog Title:</label>
            <input type="text" id="title" required /> <br /><br />
            <label for="snippet">Blog Snippet:</label>
            <input type="text" id="title" required /> <br /><br />
            <label for="Body">Blog Body:</label>
            <textarea id="body" required></textarea> <br /><br />
            <button>Submit</button>
        </form>
    </div>
</body>

</html>
```

5. 404.js

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Page | <%= title %> </title>
</head>
<body>
    <nav>
        <div class="site-title">
            <a href="/"><h1>Blog</h1></a>
            <p>Page not found Site</p>
        </div>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/blogs/create">Blogs</a></li>
        </ul>
    </nav>
    <div class="not-found content">
        OOPs Page Not Found :->
    </div>
</body>
</html>
```


**Partials**
- Now we will learn about how we can replace the header part ejs file 
- i.e.
```javascript
<nav>
    <div class="site-title">
      <p>
        <%= name %>
      </p>
      <a href="/">
        <h1>Home</h1>
      </a>
      <p>King Site</p>
    </div>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/blogs/create">Blogs</a></li>
    </ul>
  </nav>
```
- We have to change above snippet to reduce complexity because this snippet is common in all ejs files
- this is called partial or partial templates

- (- vs =) 
:- when we use = the it escape the special character and we end with string value instead of html
:- when we use - means just output the value

- Now create partial folder in views  
-  create some file 
1. nav.ejs: for navbar
2. head.ejs: for head of html
3. footer.ejs: for footer 

1. app.js
```javascript
const express = require('express')


//express app
const app = express();

app.listen(3000);

// register view Engine

app.set('view engine', 'ejs');

//if we have different view
// app.set('views', 'myviews');

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
2. index.ejs
```javascript
<!DOCTYPE html>
<html lang="en">
<%- include("./partials/head.ejs") %>

    <body>
        <%- include("./partials/nav.ejs") %>
            <div class="blog content">
                <h2>This is Home Page</h2>

                <% if(blogs.length> 0) { %>
                    <% blogs.forEach(blog=> { %>
                        <h3 class="title">
                            <%= blog.title %>
                        </h3>
                        <p class="snippet">
                            <%= blog.snippet %>
                        </p>
                        <% }) %>

                            <% } else {%>
                                <p> There are no blogs to display...</p>
                                <% } %>
            </div>
            <%- include("./partials/footer.ejs") %>
    </body>

</html>
```
3. about.ejs
```javascript
<!DOCTYPE html>
<html lang="en">
<%- include("./partials/head.ejs") %>

    <body>
        <%- include("./partials/nav.ejs") %>

            <div class="about content">
                <h2>About us</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga rerum molestiae, aspernatur ipsa sed
                    iste?</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga rerum molestiae, aspernatur ipsa sed
                    iste?</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga rerum molestiae, aspernatur ipsa sed
                    iste?</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga rerum molestiae, aspernatur ipsa sed
                    iste?</p>
            </div>
            <%- include("./partials/footer.ejs") %>
    </body>

</html>
```
4. blog.ejs
```javascript
<!DOCTYPE html>
<html lang="en">

<%- include("./partials/head.ejs") %>

    <body>
        <%- include("./partials/nav.ejs") %>

            <div class="blog content">
                <h2>All Blogs</h2>
                <form>
                    <label for="title">Blog Title:</label>
                    <input type="text" id="title" required /> <br /><br />
                    <label for="snippet">Blog Snippet:</label>
                    <input type="text" id="title" required /> <br /><br />
                    <label for="Body">Blog Body:</label>
                    <textarea id="body" required></textarea> <br /><br />
                    <button>Submit</button>
                </form>
            </div>
            <%- include("./partials/footer.ejs") %>
    </body>

</html>
```
5. 404.ejs
```javascript
<!DOCTYPE html>
<html lang="en">
<%- include("./partials/head.ejs") %>

    <body>
        <%- include("./partials/nav.ejs") %>

            <div class="not-found content">
                OOPs Page Not Found :->
            </div>
        
            <%- include("./partials/footer.ejs") %>
    </body>

</html>
```

1. nav.ejs
```javascript
<nav>
    <div class="site-title">
        <a href="/">
            <h1>Sachin's Blog</h1>
        </a>
        <p>King Site</p>
    </div>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/blogs/create">Blogs</a></li>
    </ul>
</nav>
```
2. head.ejs: 
```javascript
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home | <%= title %>
    </title>
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&display=swap');

        body {
            max-width: 1200px;
            margin: 20px auto;
            padding: 0 20px;
            font-family: 'Noto Serif', serif;
            max-width: 1200px;
            background-color: #b3b2b2;
            /* background-image: linear-gradient(#7a6c6c, #b3b2b2, #222); */
        }

        p,
        h1,
        h2,
        h3,
        a,
        ul {
            margin: 0;
            padding: 0;
            text-decoration: none;
            color: #222;
        }

        /* nav & footer styles */
        nav {
            display: flex;
            justify-content: space-between;
            margin-bottom: 60px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
            text-transform: uppercase;
        }

        nav ul {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }

        nav li {
            list-style-type: none;
            margin-left: 20px;
        }

        nav h1 {
            font-size: 3em;
        }

        nav p,
        nav a {
            color: #777;
            font-weight: 300;
        }

        nav a:hover {
            color: #867fbe;
            font-weight: 300;
        }
        footer {
            color: #777;
            text-align: center;
            margin: 80px auto 20px;
        }

        h2 {
            margin-bottom: 40px;
        }

        h3 {
            text-transform: capitalize;
            margin-bottom: 8px;
        }

        .content {
            margin-left: 20px;
        }

        /* index styles */

        /* details styles */

        /* create styles */
        .blog form {
            max-width: 400px;
            margin: 0 auto;
        }

        .blog input,
        .blog textarea {
            display: block;
            width: 100%;
            margin: 10px 0;
            padding: 8px;
        }

        .blog label {
            display: block;
            margin-top: 10px;
        }

        textarea {
            height: 120px;
        }

        .blog button {
            margin-top: 20px;
            background: rgb(20, 67, 220);
            color: white;
            padding: 6px;
            border: 0;
            font-size: 1.2em;
            cursor: pointer;
            border-radius: 5px;
        }
    </style>
</head>
```
3. footer.ejs: 
```javascript
<footer>
    Copyright &copy; Sachin's Blog | 2023
</footer>
```
