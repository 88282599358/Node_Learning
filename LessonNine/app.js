const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./modules/blog')

//express app
const app = express();

//MongoDB
//connect to MongoDB
app.set('view engine', 'ejs');


// middleware and static files
app.use(express.static('public'))

app.use(morgan('combined'))

const dbURI = `mongodb+srv://newnode:newnode123@cluster1.vtggcao.mongodb.net/?retryWrites=true&w=majority`

// mongoose.connect(dbURI)

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        // console.log("Connected to db");
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    })


/*
//Mongoose and mongo sandbox roots
// to add blog in Database
app.get('/add-blogs', (req, res) => {

    const blog = new Blog({
        title: 'new title',
        snippet: 'about new blog1',
        body: 'get my new blog',
    });
    blog.save()   //to save in database we use .then() because it is asynchronous and take some time to work
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
})


// to get all blogs
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

// to get single blogs
app.get('/single-blogs', (req, res) => {
    Blog.findById('65144909897694d4fddeeb00')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
}) */


// register view Engine



app.get('/', (req, res) => {

    //in ejs we can pass array or block etc.
    /* const blogs = [
         { title: 'Node from Moon', snippet: 'lorem ispum dolor sit consectutor' },
         { title: 'Node from Star', snippet: 'lorem ispum dolor sit consectutor' },
         { title: 'Node from Sun', snippet: 'lorem ispum dolor sit consectutor' },
     ]; */


    //   title here is just a object and we get this object in index page and in blog we can use blogs:blogs (both will same)
    // res.render('index', { title: 'Node', blogs })

    //new method
    res.redirect('/blog')
})

app.get('/about', (req, res) => {
    //to send html page
    res.render('about', { title: 'Let know me' })
})

//blog routes

app.get('/blogs/create', (req, res) => {
    res.render('blog', { title: 'Read Blog' })
})

app.get('/blog', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });


app.use((req, res) => {
    //to send html page
    res.status(404).render('404', { title: '404' })
})