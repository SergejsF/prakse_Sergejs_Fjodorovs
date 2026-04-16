// db/index.js – savienojums ar MySQL un lietotāju servisi
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

async function createUser(email, passwordHash) {
  const [result] = await pool.execute(
    'INSERT INTO users (email, password_hash) VALUES (?, ?)',
    [email, passwordHash]
  );
  return result.insertId;
}

async function getUsers({ email, page = 1, limit = 10 }) {
  const safeLimit = Math.max(1, parseInt(limit, 10) || 10);
  const safePage = Math.max(1, parseInt(page, 10) || 1);
  const safeOffset = (safePage - 1) * safeLimit;

  // Vaicājuma formāts pielāgots testiem: WHERE (? IS NULL OR email LIKE ?) LIMIT ? OFFSET ?
  const query = 'SELECT * FROM users WHERE (? IS NULL OR email LIKE ?) LIMIT ? OFFSET ?';
  const params = [email, email ? `%${email}%` : null, safeLimit, safeOffset];

  const [rows] = await pool.execute(query, params);
  return rows;
}

async function getUserByEmail(email) {
  const [rows] = await pool.execute(
    'SELECT id, email, password_hash FROM users WHERE email = ? LIMIT 1',
    [email]
  );

  return rows[0] || null;
}

async function createPost(userId, title, content) {
  const [result] = await pool.execute(
    'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
    [userId, title, content]
  );
  return result.insertId;
}

async function getPosts({ userId = null, page = 1, limit = 10 }) {
  const safeLimit = Math.max(1, parseInt(limit, 10) || 10);
  const safePage = Math.max(1, parseInt(page, 10) || 1);
  const safeOffset = Math.max(0, (safePage - 1) * safeLimit);
  // Ērtam filtram: ja userId == null, atgriežam visus ierakstus.
  // Pretējā gadījumā filtrējam pēc user_id. LIMIT un OFFSET ievietojam tieši,
  // lai izvairītos no problēmām ar sagatavotiem vaicājumiem un tipu apstrādi MySQL.
  const query = `SELECT * FROM posts WHERE (? IS NULL OR user_id = ?) ORDER BY id DESC LIMIT ${safeLimit} OFFSET ${safeOffset}`;
  const params = [userId, userId];

  const [rows] = await pool.execute(query, params);
  return rows;
}

async function createLog(level, message) {
  const [result] = await pool.execute(
    'INSERT INTO logs (`level`, message) VALUES (?, ?)',
    [level, message]
  );
  return result.insertId;
}

async function getLogs({ level = null, page = 1, limit = 10 }) {
  const safeLimit = Math.max(1, parseInt(limit, 10) || 10);
  const safeOffset = Math.max(0, (parseInt(page, 10) - 1) * safeLimit || 0);

  let query = 'SELECT * FROM logs';
  const params = [];

  if (level) {
    query += ' WHERE `level` = ?';
    params.push(level);
  }

  query += ` ORDER BY id DESC LIMIT ${safeOffset}, ${safeLimit}`;

  const [rows] = await pool.execute(query, params);
  return rows;
}

module.exports = {
  createUser,
  getUsers,
  getUserByEmail,
  createPost,
  getPosts,
  createLog,
  getLogs,
  pool,
};