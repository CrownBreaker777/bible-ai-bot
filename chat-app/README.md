# ✨ Lumina Chat — AI Chat App

A sleek, mobile-friendly chat app powered by **gpt-oss-120b** (or any OpenAI-compatible model).

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```

Open `.env` and fill in your values:
```
OPENAI_API_KEY=your_actual_api_key_here
MODEL_NAME=gpt-oss-120b
API_BASE_URL=https://api.openai.com/v1
```

### 3. Run locally
```bash
npm start
```

Then open: **http://localhost:3000**

---

## ☁️ Deploy to Replit

1. Create a new **Node.js** Repl
2. Upload all project files (or connect your GitHub repo)
3. In Replit's **Secrets** panel (🔒), add:
   - `OPENAI_API_KEY` → your key
   - `MODEL_NAME` → `gpt-oss-120b`
   - `API_BASE_URL` → your endpoint URL
4. Click **Run** — Replit auto-detects `npm start`
5. Your app is live at your Repl's public URL 🎉

---

## 📁 Project Structure

```
chat-app/
├── server.js          ← Express backend + /chat endpoint
├── package.json
├── .env.example       ← Copy to .env and fill in your keys
├── .gitignore
└── public/
    └── index.html     ← Full chat UI (mobile-friendly)
```

---

## 🔌 API Endpoints

| Method | Path      | Description                  |
|--------|-----------|------------------------------|
| GET    | /health   | Health check + model name    |
| POST   | /chat     | Send messages, get AI reply  |

### POST /chat — Request body
```json
{
  "messages": [
    { "role": "user", "content": "Hello!" }
  ]
}
```

### POST /chat — Response
```json
{
  "reply": "Hi! How can I help you today?",
  "model": "gpt-oss-120b",
  "usage": { "prompt_tokens": 42, "completion_tokens": 18 }
}
```

---

## 🔐 Security

- API keys are stored in `.env` — **never committed to GitHub**
- `.gitignore` already excludes `.env`
- On Replit, use **Secrets** (not hardcoded values)

---

## 🎨 Customization

- **Change AI personality**: Edit `SYSTEM_PROMPT` in `.env`
- **Switch models**: Change `MODEL_NAME` in `.env`
- **Custom API**: Set `API_BASE_URL` for Azure/proxy endpoints
- **App name/colors**: Edit `public/index.html` CSS variables at the top
