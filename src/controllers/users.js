const { validateUser } = require('../validators/users');
const { registerUser, listUsers, loginUser } = require('../services/users');

async function createUserController(req, res, next) {
  const { isValid, errors } = validateUser(req.body);

  if (!isValid) {
    return res.status(400).json({ error: 'VALIDATION_ERROR', details: errors });
  }

  try {
    const userId = await registerUser(req.body);
    return res.status(201).json({ id: userId });
  } catch (err) {
    return next(err);
  }
}

async function listUsersController(req, res, next) {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const email = req.query.email || null;

  try {
    const users = await listUsers({ email, page, limit });
    return res.json({ data: users, page, limit });
  } catch (err) {
    return next(err);
  }
}

async function loginUserController(req, res, next) {
  const { isValid, errors } = validateUser(req.body);

  if (!isValid) {
    return res.status(400).json({ error: 'VALIDATION_ERROR', details: errors });
  }

  try {
    const user = await loginUser(req.body);

    if (!user) {
      return res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Nepareizs e-pasts vai parole, vai lietotājs neeksistē',
      });
    }

    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createUserController,
  listUsersController,
  loginUserController,
};
