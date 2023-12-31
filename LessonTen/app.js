const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./modules/blog')

//express app
const app = express();

//MongoDB
//connect to MongoDB

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


// register view Engine

app.set('view engine', 'ejs');


// middleware and static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // this is to get data from when someone click on submit (to accept form data)
app.use(morgan('combined'))


app.get('/', (req, res) => {

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

//post request
app.post('/blog', (req, res) => {
    // console.log(req.body)
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/blog')
        })
        .catch((err) => {
            console.log(err)
        })
})

// get from id
app.get('/blog/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch((err) => {
            console.log(err);
        })
})

//delete 
app.delete('/blog/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blog' });
        })
        .catch(err => {
            console.log(err);
        });
});


app.get('/blog', (req, res) => {
    // Find all blogs and sort them in descending order by createdAt.
    Blog.find().sort({ createdAt: -1 })  // from sort() we get new blog at top and old at bottom
        .then((result) => {
            res.render('index', { blogs: result, title: 'All blogs' })
        })
        .catch((err) => {
            console.log(err);
        })
})


app.use((req, res) => {
    //to send html page
    res.status(404).render('404', { title: '404' })
})