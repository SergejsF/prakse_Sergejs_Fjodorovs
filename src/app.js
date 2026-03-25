require('dotenv').config();
const express = require('express');
const { createUser, getUsers } = require('../db/index');

const app = express();
app.use(express.json());

// Veselības pārbaudes maršruts
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/users', async (req, res) => {
  try {
    const { email, password_hash } = req.body;

    if (!email || !password_hash) {
      return res.status(400).json({ error: 'Email un password_hash ir obligāti' });
    }

    const id = await createUser(email, password_hash);
    return res.status(201).json({ id, email });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Šis email jau eksistē' });
    }
    return res.status(500).json({ error: 'Kļūda izveidojot lietotāju' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const { email, page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const users = await getUsers({
      email,
      page: pageNum,
      limit: limitNum
    });
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Kļūda iegūstot lietotājus' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveris darbojas uz porta ${PORT}`);
});
