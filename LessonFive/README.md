**Introduction**
_NPM_, which stands for Node Package Manager, is a package manager for JavaScript and Node.js applications.

- It is the default package manager for Node.js and is used to install, manage, and share packages (also known as modules or libraries) of JavaScript code.
- npm simplifies the process of including external libraries and dependencies in your Node.js projects

**Installation**

1. npm install -g nodemon

- Nodemon is a utility for Node.js applications that helps developers automatically restart their Node.js server whenever code changes are detected.
- It is particularly useful during the development phase, as it eliminates the need to manually stop and restart the server every time you make changes to your code.
- -g means install for globally not only for project

# if nodemon didn't work
  i. Open PowerShell as an administrator. To do this, search for "PowerShell" in the Windows search bar, right-click on "Windows PowerShell," and choose "Run as administrator."
  ii. Get-ExecutionPolicy
  iii. Set-ExecutionPolicy RemoteSigned
  iv. nodemon server

2. npm i lodash

- Lodash is a widely used JavaScript utility library that provides a collection of functions and utilities for simplifying and enhancing common programming tasks in JavaScript.
- It is often used to work with arrays, objects, strings, functions, and more, and it is designed to be compatible with both Node.js and browser-based JavaScript environments.
- Lodash is known for its efficiency and versatility.

3. npm install

- to get all node modules which help us to work with node

**the package.json file & installing packages locally**

1. package-lock.json - which keep track of our dependencies which we have installed in our project
2. npm init and fill details

**lodash Methods**
- Lodash is a comprehensive utility library in JavaScript that provides a wide range of methods to simplify common programming tasks. While I mentioned the `_.random()` method in the code snippet you provided, lodash indeed offers many other useful methods. 
- Here _ is the lodash 

# Here are just a few examples of lodash methods:

1. **`_.map()`:** This method is used for iterating over a collection (e.g., an array or an object) and applying a function to each element. It returns a new array with the results.

   ```javascript
   const numbers = [1, 2, 3, 4, 5];
   const squaredNumbers = _.map(numbers, (num) => num * num);
   ```  

2. **`_.filter()`:** It's used to filter elements from a collection based on a given condition and returns a new array with the filtered elements.

   ```javascript
   const numbers = [1, 2, 3, 4, 5];
   const evenNumbers = _.filter(numbers, (num) => num % 2 === 0);
   ```

3. **`_.groupBy()`:** This method is used for grouping elements of a collection by a specified criterion.

   ```javascript
   const users = [
     { name: "Alice", age: 25 },
     { name: "Bob", age: 30 },
     { name: "Charlie", age: 25 },
   ];

   const usersByAge = _.groupBy(users, "age");
   ```

4. **`_.reduce()`:** It's used for reducing a collection to a single value by iteratively applying a function.

   ```javascript
   const numbers = [1, 2, 3, 4, 5];
   const sum = _.reduce(numbers, (acc, num) => acc + num, 0);
   ```

5. **`_.sortBy()`:** This method is used for sorting a collection based on a specified criterion.

   ```javascript
   const users = [
     { name: "Alice", age: 25 },
     { name: "Bob", age: 30 },
     { name: "Charlie", age: 20 },
   ];

   const sortedUsers = _.sortBy(users, "age");
   ```

   6 . **Math round()**
   `javascript
    console.log(lod.round(4.006));
    `

These are just a few examples of lodash methods. Lodash provides many more utility functions for working with arrays, objects, strings, and more, making it a powerful tool for JavaScript developers. You can explore the full list of lodash methods and their documentation on the official lodash website: https://lodash.com/
