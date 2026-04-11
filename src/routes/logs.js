const express = require('express');
const {
  createLogController,
  listLogsController,
} = require('../controllers/logs');

const router = express.Router();

router.post('/logs', createLogController);
router.get('/logs', listLogsController);

module.exports = router;
