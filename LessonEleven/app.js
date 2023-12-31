const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRouter = require('./routes/blogRouter')

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

// blog routes
// app.use('/blog', blogRouter);
app.use( blogRouter);



app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})