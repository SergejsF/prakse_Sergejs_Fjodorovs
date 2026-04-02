const bcrypt = require('bcrypt');
const { createUserModel, getUsersModel } = require('../models/users');

async function registerUser({ email, password }) {
  const passwordHash = await bcrypt.hash(password, 10);
  const userId = await createUserModel(email, passwordHash);
  return userId;
}

async function listUsers({ email = null, page = 1, limit = 10 }) {
  return getUsersModel({ email, page, limit });
}

module.exports = {
  registerUser,
  listUsers,
};