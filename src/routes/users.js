const express = require('express');
const {
  createUserController,
  listUsersController,
} = require('../controllers/users');

const router = express.Router();

// POST /users
router.post('/users', createUserController);

// GET /users
router.get('/users', listUsersController);

module.exports = router;
