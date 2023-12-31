const express = require('express')
const routes = require('./routes')
const http = require('http')
const path = require('path')
const urlencoded = require('url')
const bodyParser = require('body-parser')
const json = require('json')
const logger = require('logger')
const methodOverride = require('method-override')

//to run
const nano = require('nano')('http://localhost:5948')

//which db we get used
const db = nano.use('address')
const app = express;


//at this port out application will hosted
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))

//to view engine
app.set('view engine', 'jade')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(methodOverride())
app.use(express.static(path.join(__dirname,'public')))

app.get('/', routes.index)

app.post('/createdb', function(req, res){
        nano.db.create(req.body.dbname, function(err){
            if(err){
                res.send("Error creating database", req.body.dbname);
                return;
            }
            res.send("Database", req.body.dbname + "created Successfully");
        })
})


