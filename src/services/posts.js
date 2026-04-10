const { createPostModel, getPostsModel } = require('../models/posts');

async function createPostService({ userId, title, content }) {
  return createPostModel(userId, title, content);
}

async function listPostsService({ userId = null, page = 1, limit = 10 }) {
  return getPostsModel({ userId, page, limit });
}

module.exports = {
  createPostService,
  listPostsService,
};