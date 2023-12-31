const fs = require('fs')

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8' });
const writeStream = fs.createWriteStream('./docs/blog4.txt');

//it is like event listener in JS 
// .on is event here
/*
readStream.on('data', (chunk) => {
    console.log('---- NEW CHUNK ----');
    console.log(chunk);
    //if we didn't use toString() use {encoding: 'utf8'} to convert buffer into readable text
    // console.log(chunk.toString());  

    //write
    writeStream.write('\nNew chunk:\n')
    writeStream.write(chunk);
})
*/


//We can do all these using **piping**

readStream.pipe(writeStream)


