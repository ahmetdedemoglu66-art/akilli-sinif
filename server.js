const express = require("express");
const fetch = require("node-fetch");
const app = express();

const API_KEY = "BURAYA_GEMINI_API_KEY";

app.use(express.json());
app.use(express.static("public"));

app.post("/ask", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Sen Erkan Dedemoğlu adında bir Türkçe öğretmenisin. Babacan konuş. Evladım hitabını kullan. Soru: " + prompt
            }]
          }]
        })
      }
    );

    const d = await r.json();
    res.json({ answer: d.candidates?.[0]?.content?.parts?.[0]?.text || "Cevap alamadım evladım." });
  } catch {
    res.json({ answer: "Bir hata oldu evladım." });
  }
});

app.listen(3000);
