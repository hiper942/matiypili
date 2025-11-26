import express from 'express';
const app = express();
app.use(express.json());

const messages = [];

// Endpoint POST para crear un mensaje
app.post('/messages', (req, res) => {
  const { text, author } = req.body;
  const newMessage = {
    id: Date.now(), text, author,
    timestamp: new Date().toISOString()
  };
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.listen(8080, () => {
  console.log('Servidor en http://localhost:8080');
});