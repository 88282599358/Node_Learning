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