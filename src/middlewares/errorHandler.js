function errorHandler(err, req, res, next) {
  if (err && err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ error: 'EMAIL_EXISTS' });
  }

  console.error(err);
  // Atgriež cilvēkam lasāmu kļūdas ziņu latviski
  return res.status(500).json({ error: 'Iekšēja servera kļūda' });
}

module.exports = { errorHandler };