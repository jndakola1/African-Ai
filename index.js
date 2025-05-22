const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: "tinyllama",
      prompt: message,
      stream: false
    });

    res.json({ reply: response.data.response.trim() });
  } catch (err) {
    res.status(500).json({ error: "Ollama not responding" });
  }
});

app.listen(3001, () => {
  console.log('Afri-GAi backend running on http://localhost:3001');
});