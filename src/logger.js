const fs = require('fs');
const path = require('path');
const { Writable } = require('stream');
let winston;
try {
  winston = require('winston');
} catch (e) {
  winston = null;
}
const { createLog } = require('../db/index');

function persistLog(level, payload) {
  try {
    return Promise.resolve(createLog(level, payload)).catch(() => {});
  } catch (e) {
    return Promise.resolve();
  }
}

// Nodrošinām, ka logs mape eksistē
const logsDir = path.join(__dirname, '..', 'logs');
try {
  fs.mkdirSync(logsDir, { recursive: true });
} catch (e) {
  // Ja mapes izveide neizdodas, turpinām bez faila mapes kļūdas pārtraukšanas
}

const dbStream = new Writable({
  write(message, encoding, callback) {
    // Winston format.json() nodrošina, ka message ir JSON teksta rinda
    try {
      const raw = Buffer.isBuffer(message) ? message.toString('utf8') : String(message);
      const parsed = JSON.parse(raw);
      const level = parsed.level || 'info';
      const payload = {
        timestamp: parsed.timestamp || new Date().toISOString(),
        message: parsed.message || '',
        meta: parsed.meta || null,
        stack: parsed.stack || null,
        code: parsed.code || null,
      };

      // Saglabājam DB kā JSON tekstu otrajā parametru
      persistLog(level, JSON.stringify(payload));
    } catch (err) {
      // Ja nevar parsēt — saglabājam izejas tekstu
      persistLog('error', String(message));
    }
    callback();
  },
});

let logger;
if (winston) {
  logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.File({ filename: path.join(logsDir, 'app.log'), level: 'info' }),
      new winston.transports.Stream({ stream: dbStream }),
      new winston.transports.Console({ format: winston.format.simple() }),
    ],
  });
} else {
  // Fallback logger, ja winston nav instalēts (piem., testu vidē)
  logger = {
    info: (msg, meta) => {
      persistLog('info', JSON.stringify({ timestamp: new Date().toISOString(), message: msg, meta }));
      console.log('[INFO]', msg, meta || '');
    },
    warn: (msg, meta) => {
      persistLog('warn', JSON.stringify({ timestamp: new Date().toISOString(), message: msg, meta }));
      console.warn('[WARN]', msg, meta || '');
    },
    error: (msg, meta) => {
      persistLog('error', JSON.stringify({ timestamp: new Date().toISOString(), message: msg, meta }));
      console.error('[ERROR]', msg, meta || '');
    },
  };
}

module.exports = logger;
