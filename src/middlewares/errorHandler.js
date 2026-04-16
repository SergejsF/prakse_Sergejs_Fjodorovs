const logger = require('../logger');

function errorHandler(err, req, res, next) {
  if (err && err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ error: 'EMAIL_EXISTS' });
  }

  const requestInfo = req ? `${req.method} ${req.originalUrl || req.url || ''}`.trim() : 'nezināms pieprasījums';

  // Ja nepareizs JSON pieprasījums
  const isInvalidJson = !!(
    err && (
      err.type === 'entity.parse.failed' ||
      err.status === 400 ||
      err.statusCode === 400
    )
  );

  if (isInvalidJson) {
    const meta = { code: 'INVALID_JSON', request: { method: req && req.method, url: req && (req.originalUrl || req.url) }, body: req && req.body };
    logger.error('Invalid JSON received', { code: 'INVALID_JSON', meta, stack: err.stack });
    console.error(`[ERROR] ${requestInfo}`, err);
    return res.status(400).json({ error: 'NEPAREIZA_JSON' });
  }

  // Vispārējas kļūdas — reģistrējam žurnālā un atgriežam generisku ziņu lietotājam
  logger.error('Server error', { code: err && err.code, message: err && err.message, stack: err && err.stack, request: { method: req && req.method, url: req && (req.originalUrl || req.url) } });
  console.error(`[ERROR] ${requestInfo}`, err);
  return res.status(500).json({ error: 'Iekšēja servera kļūda' });
}

module.exports = { errorHandler };