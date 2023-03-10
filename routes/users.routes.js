const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.post('/register', usersController.registerUser);
router.get('/idCheck/:userId', usersController.checkId);
router.post('/login', usersController.loginUser);
// router.post('/', postsController.createPost);
// router.get('/:postId', postsController.getPostbyId);
// router.put('/:postId', postsController.modifyPost);

module.exports = router;