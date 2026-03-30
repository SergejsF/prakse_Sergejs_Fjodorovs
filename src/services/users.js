const bcrypt = require('bcrypt');
const { createUser, getUsers } = require('../../db/index');

async function registerUser({ email, password }) {
  const passwordHash = await bcrypt.hash(password, 10);
  const userId = await createUser(email, passwordHash);
  return userId;
}

async function listUsers({ email = null, page = 1, limit = 10 }) {
  return getUsers({ email, page, limit });
}

module.exports = {
  registerUser,
  listUsers,
};