**Introduction**
- We will learn about express js routing

**Installation**
1. npm install express

const express = require('express')


//express app
const app = express();

app.listen(3000);

// The get take two arguments (the url we have to send) and (callback functions) 
app.get('/', (req, res) => {

    // it is same as res.write() and res.end();
    //and also we don't have to set content type and status code 
    // it will automatically fetch

    //res.send('<p>Home page</p>');

    //to send html page   
    //we use  {root : __dirname} - because by default system take path from absolute not from relative so make it relative we use
    // root will check in the directory that app.js is there or not and work accordingly
    res.sendFile('./views/index.html', { root: __dirname })
})


app.get('/about', (req, res) => {
    //to send html page
    res.sendFile('./views/about.html', { root: __dirname })
})

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});


app.get('/contact', (req, res) => {
    //to send html page
    res.sendFile('./views/contact.html', { root: __dirname })
})


//this run for every single request but main point is that url didn't match above url then it will run
//it state that use this function for the url didn't match because it didn't scoped to any url
//this must have to use at bottom because if it on above it below url didn't work
app.use((req, res) => {
    //to send html page
    res.statusCode(404).sendFile('./views/404.html', { root: __dirname })
})