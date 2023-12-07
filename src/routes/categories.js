/** @format */

const express = require('express');
const router = express.Router();

const {
  createPostCategory,
  allPostsCategory,
  updatePostCategory,
  deletePostCategory,
} = require('../controllers/post/categories');
const { authenticate, authorize } = require('../middlewares/auth');

router.post('/posts/categories', authenticate, authorize, createPostCategory);
router.get('/posts/categories', authenticate, authorize, allPostsCategory);
router.patch('/posts/categories/:id', authenticate, authorize, updatePostCategory);
router.delete('/posts/categories/:id', authenticate, authorize, deletePostCategory);

module.exports = router;
