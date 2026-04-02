const { createUser, getUsers } = require('../../db/index');

async function createUserModel(email, passwordHash) {
  return createUser(email, passwordHash);
}

async function getUsersModel({ email, page = 1, limit = 10 }) {
  return getUsers({ email, page, limit });
}

module.exports = {
  createUserModel,
  getUsersModel,
};
