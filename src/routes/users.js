const express = require('express');
const {
  createUserController,
  listUsersController,
  loginUserController,
} = require('../controllers/users');

const router = express.Router();

// POST /users
router.post('/users', createUserController);

// GET /users
router.get('/users', listUsersController);

// POST /login
router.post('/login', loginUserController);

module.exports = router;
