import axios from 'axios';

const client = axios.create({
  baseURL: process.env.OLLAMA_HOST, 
  timeout: 600000,
});

export const askOllama = async (prompt) => {
  const { data } = await client.post('/api/generate', {
    model: 'llama2:7b-chat-q2_K',
    prompt,
    stream: false,
  });
  return data?.response ?? '';
};