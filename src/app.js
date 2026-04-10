require('dotenv').config();
const express = require('express');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use(usersRouter);
app.use(postsRouter);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
