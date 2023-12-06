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

router.get('/user', allUsers);
router.delete('/user/:id', deleteAUser);
router.patch('/user/:id', updateAUser);
module.exports = router;
