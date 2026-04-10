const express = require('express');
const {
  createPostController,
  listPostsController,
} = require('../controllers/posts');

const router = express.Router();

router.post('/posts', createPostController);
router.get('/posts', listPostsController);

module.exports = router;