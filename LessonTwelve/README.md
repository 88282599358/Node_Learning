**Introduction**

# Express Router

- Express Router is a component of the Express.js web application framework for Node.js that allows you to modularize and organize your routes and middleware in a more structured manner.
- It helps keep your codebase clean and maintainable, especially in larger applications.
- With Express Router, you can create separate route modules, each handling a specific set of routes and associated logic.
- This is particularly useful when building RESTful APIs or complex web applications with multiple endpoints.

# Now we will understand how to use

- Create routes folder and make blogRouter.js file
- Paste all blog code into blogRouter.js
- and in app.js we will import in app.js and work with us

- app.js

```javascript

const blogRouter = require('./routes/blogRouter')
// blog routes
app.use(blogRouter);

```

- in blogRouter.js

```javascript
const express = require("express");
const Blog = require("../modules/blog");

const router = express.Router();
//blog routes

router.get("/blogs/create", (req, res) => {
  res.render("blog", { title: "Read Blog" });
});

//post request
router.post("/blog", (req, res) => {
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

// get from id
router.get("/blog/:id", (req, res) => {
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

//delete
router.delete("/blog/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blog" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/blog", (req, res) => {
  // Find all blogs and sort them in descending order by createdAt.
  Blog.find()
    .sort({ createdAt: -1 }) // from sort() we get new blog at top and old at bottom
    .then((result) => {
      res.render("index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
```

# MVC BASICS

- stand for Model, view, Controller
- MVC is a way of structuring our code & files
- keeps our code more modular, reusable & easier to use
- Model --> Controller --> Views
- Here we take model and process through controller and send to views

# Controller
 - create new folder controllers and in it blogController.js
 - we will create our all controller in blogController.js and access from there
 
 - blogController.js
 
 ```javascript
 const Blog = require('../modules/blog')

// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 }) 
        .then((result) => {
            res.render('index', { blogs: result, title: 'All blogs' })
        })
        .catch((err) => {
            console.log(err);
        })
}

const blog_details = (req, res) => {
    const id = req.params.id
    console.log(id)
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch((err) => {
            console.log(err);
        })
}

const blog_create_get = (req, res) => {
    res.render('blog', { title: 'Read Blog' })
}

const blog_create_post = (req, res) => {
    // console.log(req.body)
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/blog')
        })
        .catch((err) => {
            console.log(err)
        })
}

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blog' });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
} 

 ```

- blogRouter.js

 ```javascript

const express = require('express');
const blogController = require('../controllers/blogController')

const router = express.Router();

//blog routes
router.get('/', blogController.blog_index)

//post request
router.post('/blog', blogController.blog_create_post)

router.get('/blogs/create', blogController.blog_create_get)

// get from id
router.get('/:id', blogController.blog_details)

//delete 
router.delete('/blog/:id', blogController.blog_delete);

module.exports = router;

 ```