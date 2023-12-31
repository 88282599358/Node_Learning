**Introduction**

Source:- https://github.com/iamshaunjp/node-crash-course

1. Login with MongoBD Atlas link -https://www.mongodb.com/cloud/atlas/register
2. Create Account and Login with gmail
3. Go to make clusters
4. Create Database
5. Connect to your IP Address
6. Connect DB with Cluster
7. Copy string and paste in the main file (app.js)

**MongoDB**

**Mongoose**
Mongoose is an ODM library - Object Document Mapping Library
    Mongoose
    - User Model  [User.get(), User.findById()]
    - Blog Model  [Blog.deleteOne()]

**Schema & Models**
Schema defines the structure of a type of data / document 
- Properties & Property types
Eg 1. User Schema
    - name (String), required
    - age (number), 
    - bio (String), required

Eg 2. Blog Schema
    - title (string), required
    - snipped (string), required
    - body (string), required

Models allow us to communicate with database collections
- Blog Model  ----> (get, save, delete etc) -----> Database Blog Collection


**Mongoose**
- Practical work with Database 

1. install mongoose in dir
   npm i mongoose
2. paste url take from mongoDB url
3. Connect with mongoose
   ```javascript
   mongoose.connect(dbURI);
   ```
4. replace username with database name and password
5. Make sure don't use special characters in password it may give you error

6. Now we make some warning to encounter them use

   ```javascript
   mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
   ```

7. After that we can see our app.js file

```javascript

const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

//express app
const app = express();

//MongoDB
//connect to MongoDB

const dbURI = `mongodb+srv://newnode:newnode123@cluster1.vtggcao.mongodb.net/?retryWrites=true&w=majority`

// mongoose.connect(dbURI)

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((result) => {
        console.log("Connected to db");
    })
    .catch((err) =>{
        console.log(err);
    })  

app.listen(3000);

// register view Engine

app.set('view engine', 'ejs');


// middleware and static files
app.use(express.static('public'))

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

```
8. Now till when we can't connect to database we have to not listen the port

```javascript

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((result) => {
        // console.log("Connected to db");
        app.listen(3000);
    })
    .catch((err) =>{
        console.log(err);
    })  

```

9. Now we will create Schema and Model 
- create folder name modules
- in it create blog.js
-- Algo
    - We will import mongoose and in mongoose import Schema
    - create object BlogSchema 
    - in it we will create our Schema 
    - now we create out model
    - export at last

```javascript
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true  
    },
    body: {
        type: String,
        required: true
    },
},{timestamps: true})  //to get time on every run

//Here when we call Blog then 'Blog' will get from Database and second arg is which schema we have to make model
const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog
```

10. Now we will know how to add data into Database
    - Follow below code
    - Go to localhost http://localhost:3000/add-blog
    - Now to MongoBD Atlas -> Database -> Collection and in it see all database collections

```javascript
//Mongoose and mongo sandbox roots
// to add blog in Database
app.get('/add-blog', (req, res) => {

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
```

11. Now we will know to get data from database
    - Follow below code
    - Make sure we have to take instance from add-blogs because from there we adds blog
    - go to localhost http://localhost:3000/all-blogs
    - see collection and match we localhost we can see that we get all blogs from database 
    - at localhost we get array object as answer

```javascript
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
```

12. Now we will get to know how to get single data from database using Id key
Id is in the form of object string created by mongoBD it-self
    - Follow below code
    - Make sure we have to take instance from add-blogs because from there we adds blog
    - go to localhost http://localhost:3000/single-blogs

```javascript
// to get single blogs
app.get('/single-blogs', (req, res) => {
    Blog.findById('65144909897694d4fddeeb00')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

```

13. **Output document into views**
- In this we will not use previous method to add or get blogs 
- we have our home page, blog etc.
- now we will redirect the homepage directly to blog page
- where we have some data so we don't have to add new data into blogs
- we can create blog and home page directly

```javascript

```

```javascript

```


```javascript

```
