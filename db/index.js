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
  const offset = (page - 1) * limit;
  const query =
    'SELECT * FROM users WHERE (? IS NULL OR email LIKE ?) LIMIT ? OFFSET ?';
  const [rows] = await pool.execute(query, [
    email,
    `%${email || ''}%`,
    parseInt(limit),
    parseInt(offset),
  ]);
  return rows;
}

module.exports = { createUser, getUsers, pool };