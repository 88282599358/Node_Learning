console.log("Hello Node");

const fs  = require('fs');
const data = fs.readFileSync('text.txt');
console.log(data.toString());
console.log('End Here');