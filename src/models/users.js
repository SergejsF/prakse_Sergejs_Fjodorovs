const { createUser, getUsers, getUserByEmail } = require('../../db/index');

async function createUserModel(email, passwordHash) {
  return createUser(email, passwordHash);
}

async function getUsersModel({ email, page = 1, limit = 10 }) {
  return getUsers({ email, page, limit });
}

async function getUserByEmailModel(email) {
  return getUserByEmail(email);
}

module.exports = {
  createUserModel,
  getUsersModel,
  getUserByEmailModel,
};
