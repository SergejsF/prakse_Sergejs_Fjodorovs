const { validateLog } = require('../validators/logs');
const { createLogService, listLogsService } = require('../services/logs');

async function createLogController(req, res, next) {
  const { isValid, errors } = validateLog(req.body);

  if (!isValid) {
    return res.status(400).json({ error: 'VALIDATION_ERROR', details: errors });
  }

  try {
    const logId = await createLogService(req.body);
    return res.status(201).json({ id: logId });
  } catch (err) {
    return next(err);
  }
}

async function listLogsController(req, res, next) {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const level = req.query.level || null;

  try {
    const logs = await listLogsService({ level, page, limit });
    return res.json({ data: logs, page, limit });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createLogController,
  listLogsController,
};
