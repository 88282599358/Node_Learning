// Global Object
console.log(global);

global.setTimeout(() => {
    console.log("Hello I in Timeout Global");
}, 2000);


//Set
setTimeout(() => {
    console.log("Hello I in Timeout");
    clearInterval(int);
}, 2000);


const int = setInterval(() => {
    console.log("Hello I i Interval");
}, 1000);


//dirname & filename
// console.log(__dirname);  // it give directory name of project
// console.log(__filename); // it give file name of project


// console.log(document.querySelector);
/*The document object is a part of the Document Object Model (DOM), which is specific to web browsers and represents the structure of HTML documents in the browser.*/

/**
 * Since Node.js does not have a browser DOM, the document object and related browser-specific APIs (such as querySelector, getElementById, etc.) are not available in Node.js by default
 * Attempting to use document or browser-specific APIs in Node.js will result in a "ReferenceError" because these objects and functions are not defined in the Node.js runtime.
 */
