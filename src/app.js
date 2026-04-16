require('dotenv').config();
const express = require('express');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const logsRouter = require('./routes/logs');
const { errorHandler } = require('./middlewares/errorHandler');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apkalpo statiskos failus (`public`), lai formas varētu sūtīt uz to pašu izcelsmi
app.use(express.static(path.join(__dirname, '..', 'public')));

// Veselības pārbaudes maršruts
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Maršruti
app.use(usersRouter);
app.use(postsRouter);
app.use(logsRouter);

// Kļūdu apstrādes starpprogrammatūra
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
