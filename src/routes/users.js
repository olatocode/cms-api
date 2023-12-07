/** @format */

const express = require('express');
const router = express.Router();

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
router.delete('/users/:id', deleteAUser);
router.patch('/users/:id', updateAUser);
module.exports = router;
