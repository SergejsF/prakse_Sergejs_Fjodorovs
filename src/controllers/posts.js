const { validatePost } = require('../validators/posts');
const { createPostService, listPostsService } = require('../services/posts');

async function createPostController(req, res, next) {
  const { isValid, errors } = validatePost(req.body);

  if (!isValid) {
    return res.status(400).json({ error: 'VALIDATION_ERROR', details: errors });
  }

  try {
    const postId = await createPostService(req.body);
    return res.status(201).json({ id: postId });
  } catch (err) {
    return next(err);
  }
}

async function listPostsController(req, res, next) {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const userId = req.query.userId ? parseInt(req.query.userId, 10) : null;

  try {
    const posts = await listPostsService({ userId, page, limit });
    return res.json({ data: posts, page, limit });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createPostController,
  listPostsController,
};