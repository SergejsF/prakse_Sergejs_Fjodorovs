const express = require('express');
const { validateUser } = require('../validators/users');
const { registerUser, listUsers } = require('../services/users');

const router = express.Router();

// POST /users
router.post('/users', async (req, res, next) => {
  const { isValid, errors } = validateUser(req.body);
  
  if (!isValid) {
    return res.status(400).json({ error: 'VALIDATION_ERROR', details: errors });
  }
  
  try {
    const userId = await registerUser(req.body);
    res.status(201).json({ id: userId });
  } catch (err) {
    next(err);
  }
});

// GET /users
router.get('/users', async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const email = req.query.email || null;
  
  try {
    const users = await listUsers({ email, page, limit });
    res.json({ data: users, page, limit });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
