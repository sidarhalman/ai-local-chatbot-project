import express from 'express';
import { askOllama } from '../services/ollamaService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const reply = await askOllama(message);
    res.json({ reply });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Ollama request failed' });
  }
});

export default router;