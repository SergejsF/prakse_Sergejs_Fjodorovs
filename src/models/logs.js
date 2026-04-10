const { createLog, getLogs } = require('../../db/index');

async function createLogModel(level, message) {
  return createLog(level, message);
}

async function getLogsModel({ level, page = 1, limit = 10 }) {
  return getLogs({ level, page, limit });
}

module.exports = {
  createLogModel,
  getLogsModel,
};