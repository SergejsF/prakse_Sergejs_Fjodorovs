function errorHandler(err, req, res, next) {
  if (err && err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ error: 'EMAIL_EXISTS' });
  }

  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
}

module.exports = { errorHandler };