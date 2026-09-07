const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let messages = [];

app.get('/api/messages', (req, res) => {
  res.json(messages.slice().reverse());
});

app.post('/api/messages', (req, res) => {
  const { name, text } = req.body;
  if (!name || !text || !name.trim() || !text.trim()) {
    return res.status(400).json({ error: 'Name and message required' });
  }
  const newMsg = {
    name: name.trim(),
    text: text.trim(),
    time: new Date().toLocaleString()
  };
  messages.push(newMsg);
  res.json(newMsg);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
