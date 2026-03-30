const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bible AI is running 🙏");
});

app.post("/chat", (req, res) => {
  const userMessage = req.body.message;

  res.json({
    reply: "AI coming soon 🔥"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});