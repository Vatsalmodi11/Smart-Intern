const express = require('express');
const router = express.Router();
const postController = require('../AuthController/PostController');

router.get('/', postController.getPosts);
router.post('/', postController.uploadFiles, postController.createPost);

module.exports = router;