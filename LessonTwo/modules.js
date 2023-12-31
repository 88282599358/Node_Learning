const mod = require('./peoples');  // from structuring

// to get object
// console.log(mod);  

console.log(mod.people, mod.age);

//from destructuring
//properties we want to import write in {------}
const {people, age} = require('./peoples');  // from structuring

console.log(people,age);


// const os = require('os')
// console.log(os);

// it give windows name, directories name of windows
// console.log(os.platform(), os.homedir());
