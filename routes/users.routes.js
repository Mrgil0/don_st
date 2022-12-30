const express = require('express');
const router = express.Router();

// const PostsController = require('../controllers/posts.controller');
// const postsController = new PostsController();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

// const PostsController = require('../controllers/posts.controller');
// const postsController = new PostsController();


// router.get('/', postsController.getPosts);
// router.post('/', postsController.createPost);
// router.get('/:postId', postsController.getPostbyId);
// router.put('/:postId', postsController.modifyPost);

module.exports = router;