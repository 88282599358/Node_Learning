const fs = require('fs');

//reading

/* Asynchronous  */

// fs.readFile('./docs/blog.txt', function(err, data) {
//     if (err) {
//         console.log("I am Error");
//     }
//     // console.log(data);
//     console.log(data.toString());
// });

// console.log("Hello I am above the readFile")

/* Synchronous  */
// const read = fs.readFileSync('./docs/blog.txt')
//     console.log(read.toString());

// console.log("Hello I am under the readFile")


//writing files
/* Asynchronous  */
// fs.writeFile('./docs/blog.txt', 'Hello I write file' , () =>{
//     console.log("Writing in File");
// })

// fs.writeFile('./docs/blog1.txt', 'Hello I write file1' , () =>{
//     console.log("Writing in File");
// })


/* Synchronous  */
// fs.writeFileSync('./docs/blog.txt', 'Hello I write file Synchronous');



//directories
/* Asynchronous  */

/* if (!fs.existsSync('./assets')) {  //check file exist or not
    fs.mkdir('./assets', err => {
        if (err) {
            console.log(err);
        }
        console.log("Folder Created");
    })
} else {
    fs.rmdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Folder Deleted');
    });
}
*/

/* Synchronous  */

/*
const directoryPath = './assets';

if (!fs.existsSync(directoryPath)) {
  try {
    fs.mkdirSync(directoryPath);
    console.log("Folder Created");
  } catch (err) {
    console.error(err);
  }
} else {
  try {
    fs.rmdirSync(directoryPath);
    console.log('Folder Deleted');
  } catch (err) {
    console.error(err);
  }
}
*/


//deleting files
/* Asynchronous  */

 /* if(fs.existsSync('./docs/blogdelete.txt')) {
    fs.unlink('./docs/blogdelete.txt', (err) => {
        if(err){
            console.log(err);
        }
        console.log("File Deleted");
    })
} 
*/


/* Synchronous  */

/* const filePath = './docs/blogdelete.txt';

if (fs.existsSync(filePath)) {
  try {
    fs.unlinkSync(filePath);
    console.log("File Deleted");
  } catch (err) {
    console.error(err);
  }
}
*/
