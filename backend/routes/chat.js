import express from 'express';
import { askOllama } from '../services/ollamaService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const message = req.body?.message ?? req.body?.prompt;
  if (!message) return res.status(400).json({ error: 'message or prompt required' });

  try {
    const reply = await askOllama(message);
    res.json({ reply });
  } catch (error) {
    console.error('Error:', error?.response?.data || error.message);
    res.status(502).json({ error: 'Ollama request failed', details: error?.response?.data || String(error) });
  }
});

export default router;