/** @format */

const express = require('express');
const router = express.Router();

const {
  createPost,
  allPosts,
  updatePost,
  deletePost,
} = require('../controllers/post/posts');
const { authenticate, authorize } = require('../middlewares/auth');

router.post('/posts', authenticate, authorize, createPost);
router.get('/posts', authenticate, authorize, allPosts);
router.patch('/posts/:id', authenticate, authorize, updatePost);
router.delete('/posts/:id', authenticate, authorize, deletePost);

module.exports = router;
