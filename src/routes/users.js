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
  changePassword,
  resetPassword,
} = require('../controllers/auth/users');

router.post('/user/register', register);
router.post('/user/login', login);
router.patch('/user/change-password', authenticate, authorize, changePassword);
router.patch('/user/reset-password', authenticate, authorize, resetPassword);

router.get('/users', allUsers);
router.delete('/users/:id', authenticate, authorize, deleteAUser);
router.patch('/users/:id', authenticate, authorize, updateAUser);
module.exports = router;
