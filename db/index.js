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
const safePage = Math.max(parseInt(page, 10) || 1, 1);
const safeLimit = Math.max(parseInt(limit, 10) || 10, 1);
const offset = (safePage - 1) * safeLimit;
let query = 'SELECT * FROM users';
const params = [];

if (email) {
query += ' WHERE email LIKE ?';
params.push(`%${email}%`);
}

query += ` LIMIT ${safeLimit} OFFSET ${offset}`;

const [rows] = await pool.query(query, params);
return rows;
}
module.exports = { createUser, getUsers, pool };