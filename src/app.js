require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

// Veselības pārbaudes maršruts
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveris darbojas uz porta ${PORT}`);
});

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};
