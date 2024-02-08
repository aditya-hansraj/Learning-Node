const express = require('express');
// const Blog = require('../models/blog') // can be removed after using the controller
const blogController = require('../controllers/blogController');
const router = express.Router();

router.get('', blogController.blog_index);

router.get('/create', blogController.blogCreateGet);

router.post('/create', blogController.blogCreatePost);

router.get('/:id', blogController.blog_details);

router.delete('/:id', blogController.blog_delete);

module.exports = router;