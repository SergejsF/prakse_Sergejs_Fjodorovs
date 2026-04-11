const bcrypt = require('bcrypt');
const { createUserModel, getUsersModel, getUserByEmailModel } = require('../models/users');

async function registerUser({ email, password }) {
  const passwordHash = await bcrypt.hash(password, 10);
  const userId = await createUserModel(email, passwordHash);
  return userId;
}

async function listUsers({ email = null, page = 1, limit = 10 }) {
  return getUsersModel({ email, page, limit });
}

async function loginUser({ email, password }) {
  const user = await getUserByEmailModel(email);

  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    return null;
  }

  return { id: user.id, email: user.email };
}

module.exports = {
  registerUser,
  listUsers,
  loginUser,
};