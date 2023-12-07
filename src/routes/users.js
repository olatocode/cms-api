/** @format */

const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/auth');

const {
  register,
  login,
  allUsers,
  deleteAUser,
  updateAUser,
} = require('../controllers/auth/users');

router.post('/user/register', register);
router.post('/user/login', login);

router.get('/users', allUsers);
router.delete('/users/:id', authenticate, authorize, deleteAUser);
router.patch('/users/:id', authenticate, authorize, updateAUser);
module.exports = router;
