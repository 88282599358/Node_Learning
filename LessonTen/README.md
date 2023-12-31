**Introduction**

- Types of Get Request
  - GET: request to get resource
  - POST: request to create new data (e.g. new blog)
  - DELETE: request to delete new data (e.g. delete a blog)
  - PUT: request to update data (e.g. update a blog)
- Examples

  - GET: localhost:3000/blogs
  - GET: localhost:3000/blogs/create
  - POST: localhost:3000/blogs
  - GET: localhost:3000/blogs/:id
  - DELETE: localhost:3000/blogs/:id
  - PUT: localhost:3000/blogs/:id

- Blog.ejs :- We will change form action and method and name attributes 

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("./partials/head.ejs") %>

  <body>
    <%- include("./partials/nav.ejs") %>

    <div class="blog content">
      <h2>All Blogs</h2>
      <form action="/blog" method="post">
        <label for="title">Blog Title:</label>
        <input type="text" id="title" name="title" required />
        <label for="snippet">Blog Snippet:</label>
        <input type="text" id="title" name="snippet" required />
        <label for="Body">Blog Body:</label>
        <textarea id="body" name="body" required></textarea>
        <button>Submit</button>
      </form>
    </div>
    <%- include("./partials/footer.ejs") %>
  </body>
</html>
```

**Post Request**

# set up middleware

```javascript
// middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // this is to get data from when someone click on submit (to accept form data)
app.use(morgan("combined"));
```

# Now we will create post request

```javascript
app.post("/blog", (req, res) => {
  // console.log(req.body)
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blog");
    })
    .catch((err) => {
      console.log(err);
    });
});
```

- When we create post just go to http://localhost:3000/blogs/create
  - create form there
  - go to home page to see
  - go to database where we can see that data is store in DB (MongoDB Atlas)

# Route Parameter

# Now create get request my id

- The variables parts of the route that may changes value
  - localhost:3000/blog/:id
    Example:
  - localhost:3000/blog/1234
  - localhost:3000/blog/50
  - localhost:3000/blog/hello

1. app.js

```javascript
// get from id
app.get("/blog/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});
```

4. styles.css

```css
/* index styles */

.blog a {
  display: block;
  margin: 40px 0;
  padding-left: 30px;
  border-left: 6px solid rgb(99, 106, 138);
}

.blog a:hover h3 {
  color: rgb(99, 106, 138);
}
```

2. index.ejs

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("./partials/head.ejs") %>

  <body>
    <%- include("./partials/nav.ejs") %>
    <div class="blog content">
      <h2>This is Home Page</h2>

      <% if(blogs.length > 0) { %> <% blogs.forEach(blog=> { %>
      <!-- Changes are here -->
      <a class="single" href="/blog/<%= blog.id %>">
        <h3 class="title"><%= blog.title %></h3>
        <p class="snippet"><%= blog.snippet %></p>
      </a>
      <!-- End changes -->
      <% }) %> <% } else {%>
      <p>There are no blogs to display...</p>
      <% } %>
    </div>
    <%- include("./partials/footer.ejs") %>
  </body>
</html>
```

3. Now create Details file in views

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("./partials/head.ejs") %>

  <body>
    <%- include("./partials/nav.ejs") %>
    <div class="details-content">
      <h2><%= blog.title %></h2>
      <div class="content">
        <p><%= blog.body %></p>
      </div>
    </div>
    <%- include("./partials/footer.ejs") %>
  </body>
</html>
```

5. Go to localhost and check your result

# Delete request

- In details.ejs we have return ajax in app.js delete request
- means send some json to frontend we didn't redirect the content of details.ejs to app.js ?
- when we send ajax into node we cannot use redirect as a response
- we have to send json or some text back to browser
- json didn't have redirect property
- Now when we receive data back to details.ejs the redirect property is URL where we want to send data back
- this can be done on frontend can't done to server

# working of delete

    - when we click on delete button
    - then in app.js it send request to database
    - and also send json data to details.ejs
    - it get json data and get promise as response.json() {delete blog}
    - and it also is a promise then we will get another .then() to retrieve to blog page again
    - Now go to DB and see data will be deleted and also check localhost home page

# in details.ejs

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("./partials/head.ejs") %>

  <body>
    <%- include("./partials/nav.ejs") %>
    <div class="details-content">
      <h2><%= blog.title %></h2>
      <div class="content">
        <p><%= blog.body %></p>
      </div>
      <a class="delete" data-doc="<%= blog._id %>">delete</a>
    </div>
    <%- include("./partials/footer.ejs") %>

    <script>
      const trashcan = document.querySelector("a.delete");
      trashcan.addEventListener("click", (e) => {
        // Now we will create where we have to send request
        // trashcan: reference to the element
        //dataset: data attributes
        //doc: where we send request
        const endpoint = `/blog/${trashcan.dataset.doc}`;

        // it is ajax request
        fetch(endpoint, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => (window.location.href = data.redirect))
          .catch((err) => console.log(err));
      });
    </script>
  </body>
</html>
```

# in styles.css

```css
/* details styles */
.details {
  position: relative;
}

.delete {
  position: absolute;
  /* top: 0; */
  right: 25%;
  border-radius: 10%;
  padding: 8px;
}

.delete:hover {
  cursor: pointer;
  box-shadow: 1px 2px 3px rgba(207, 15, 15, 0.2);
  background-color: rgba(207, 15, 15, 0.8);
}
```

# in app.js

```javascript
//delete
app.delete("/blog/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blog" });
    })
    .catch((err) => {
      console.log(err);
    });
});
```

# in index.ejs

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("./partials/head.ejs") %>

  <body>
    <%- include("./partials/nav.ejs") %>
    <div class="blog content">
      <h2>This is Home Page</h2>

      <% if(blogs.length> 0) { %> <% blogs.forEach(blog=> { %>
      <a class="single" href="/blog/<%= blog.id %>">
        <h3 class="title"><%= blog.title %></h3>
        <p class="snippet"><%= blog.snippet %></p>
      </a>
      <% }) %> <% } else {%>
      <p>There are no blogs to display...</p>
      <% } %>
    </div>
    <%- include("./partials/footer.ejs") %>
  </body>
</html>
```

```javascript

```

```javascript

```
