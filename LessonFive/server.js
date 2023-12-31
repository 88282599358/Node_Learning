const http = require('http')
const fs = require('fs')
const lod = require('lodash')


const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // ------ ladash

    const num = lod.random(0, 58);
    // console.log(num);
    
    // groupby() 
    const users = [
        { name: 'Alice', age: 55 },
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 25 },
    ];

    const usersByAge = lod.groupBy(users, 'age');
    console.log(usersByAge);


    //.map()
   /* const number = [1,2,3,4,5]
    const sqnumber = lod.map(number, (num)=> num*num);
    console.log(sqnumber);  */

    //.filter()
  /*  const number = [1,2,3,4,5]
    const evennumber = lod.filter(number, (num)=> num % 2 == 0);
    console.log(evennumber);  */


    //.reduce()
    const number = [1,2,3,4,5]
    const sum = lod.reduce(number, (acc,num)=> acc + num, 0);
    console.log(sum);
    for(let i=0;i<number.length;i++){
        console.log(number[i]);
    }

    //.sortBy()
    const user = [
        {name:'Alice', age:25},
        {name:'Bob', age:55},
        {name:'Charlie', age:40},
    ] 
    const sortedUser = lod.sortBy(user, 'age');
    console.log(sortedUser);

    // Math round()
    console.log(lod.round(4.006));

    //------- Routing 
    res.setHeader('Content-Type', 'text/html');
    let path = './views'
    switch (req.url) {
        case '/':
            path += '/index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += '/about.html';
            res.statusCode = 200;
            break;
        // This use when we update url about-us to about we can do like this
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end;
            break;
        default:
            path += '/404.html';
            res.statusCode = 404;  // For the page that didn't exist like blog - http://localhost:3000/blogs
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        res.write(data);
        res.end();
    })
})

server.listen(3000, 'localhost', () => {
    console.log("Listening request on port 3000");
})


