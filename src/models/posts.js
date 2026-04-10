const { createPost, getPosts } = require('../../db/index');

async function createPostModel(userId, title, content) {
  return createPost(userId, title, content);
}

async function getPostsModel({ userId, page = 1, limit = 10 }) {
  return getPosts({ userId, page, limit });
}

module.exports = {
  createPostModel,
  getPostsModel,
};