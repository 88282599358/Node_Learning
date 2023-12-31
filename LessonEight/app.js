const express = require('express')
const morgan = require('morgan')


//express app
const app = express();

app.listen(3000);

// register view Engine

app.set('view engine', 'ejs');

//Here this function get executed every time 
//if we see browser then it reload and never settle because node didn't know what to do next
// that's why it reloaded  So to encounter them use next();
// app.use((req,res, next) => {
//     console.log("New Request Made");
//     console.log("host: ", req.hostname);
//     console.log("path: ", req.path);
//     console.log("method: ", req.method);
//     next();
// })

// app.use((req,res, next) => {
//     console.log("in the next middleware");
//     next();
// })


// middleware and static files
app.use(express.static('public'))

// app.use(morgan('tiny'))
// app.use(morgan('dev'))
app.use(morgan('combined'))


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