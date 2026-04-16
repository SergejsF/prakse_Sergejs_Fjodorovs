const express = require('express');
const {
  createUserController,
  listUsersController,
  loginUserController,
} = require('../controllers/users');

const router = express.Router();

// POST /users — izveidot jaunu lietotāju
router.post('/users', createUserController);

// GET /users — iegūt lietotāju sarakstu
router.get('/users', listUsersController);

// POST /login — pieslēgt lietotāju
router.post('/login', loginUserController);

module.exports = router;
