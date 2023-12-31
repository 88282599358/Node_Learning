const express = require('express');
const blogController = require('../controllers/blogController')

const router = express.Router();

//blog routes
router.get('/blogs/create', blogController.blog_create_get)

router.get('/', blogController.blog_index)

//post request
// router.post('/blog', blogController.blog_create_post)
router.post('/', blogController.blog_create_post)


// get from id
router.get('/:id', blogController.blog_details)

//delete 
router.delete('/:id', blogController.blog_delete);

module.exports = router;
