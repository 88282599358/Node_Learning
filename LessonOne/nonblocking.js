const fs  = require('fs');

fs.readFile('text.txt', function(err, data) {
    if(err){
        console.log("There is Error");
    }
    setTimeout(() => {
        console.log("This is Our data");
    }, 2000);
    console.log(data);
})
console.log("Start here");