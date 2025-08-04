import axios from 'axios';

export const askOllama = async (prompt) => {
  const response = await axios.post(`${process.env.OLLAMA_HOST}/api/generate`, {
    model: 'llama2:7b-chat-q2_K',
    prompt,
    stream: false,
  });

  return response.data.response;
};