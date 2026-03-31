import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', model: process.env.MODEL_NAME || 'gpt-oss-120b' });
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.MODEL_NAME || 'gpt-oss-120b';
    const baseURL = process.env.API_BASE_URL || 'https://api.openai.com/v1';

    const response = await fetch(`${baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: process.env.SYSTEM_PROMPT || 'You are a warm, helpful, and intelligent assistant. Be friendly, clear, and concise.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1024,
        stream: false,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('AI API error:', err);
      return res.status(response.status).json({ error: err.error?.message || 'AI model error' });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '';

    res.json({
      reply,
      model: data.model,
      usage: data.usage,
    });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✨ Server running on http://localhost:${PORT}`);
});
