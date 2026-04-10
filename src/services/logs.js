const { createLogModel, getLogsModel } = require('../models/logs');

async function createLogService({ level, message }) {
  return createLogModel(level, message);
}

async function listLogsService({ level = null, page = 1, limit = 10 }) {
  return getLogsModel({ level, page, limit });
}

module.exports = {
  createLogService,
  listLogsService,
};