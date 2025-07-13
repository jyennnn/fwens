

// const PORT = 8000

const port = process.env.PORT || 8000
const express = require('express')
const cors = require('cors')
require('dotenv').config();

const OpenAI = require("openai");
const { ElevenLabsClient } = require("@elevenlabs/elevenlabs-js");

// setup server
const app = express()

// Middleware to parse JSON data from request body
app.use(express.json())
app.use(cors())


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const clientEl = new ElevenLabsClient({
  apiKey: process.env.EL_API_KEY
});

app.post('/completions', async (req, res) => {
  const userMessage = req.body.message;
  console.log("💬 Received GPT message:", userMessage);

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: userMessage }
      ],
      max_tokens: 100,
      temperature: 0.7
    });

    const gptReply = completion.choices?.[0]?.message?.content;
    console.log("🤖 GPT Response:", gptReply);

    res.json({
        choices: [
            {
            message: {
                role: completion.choices[0].message.role,
                content: completion.choices[0].message.content
            }
            }
        ]
        });

  } catch (error) {
    console.error("❌ API error:", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});


app.post('/eleven-completions', async (req, res) => {
  const { text, botVoice } = req.body;
  console.log("📤 Text for TTS:", text);
  console.log("🗣️ Voice ID:", botVoice);

  try {
    const stream = await clientEl.textToSpeech.convert(botVoice, {
      text,
      modelId: "eleven_multilingual_v2",
      outputFormat: "mp3_44100_128",
      voiceSettings: {
        stability: 0.2,
        similarityBoost: 0.3
      }
    });

    // ✅ Read the Node.js stream manually
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const audioBuffer = Buffer.concat(chunks);
    const base64Data = audioBuffer.toString("base64");

     console.log("✅ Audio generated. Length:", base64Data.length);

    res.json({ base64Data });

  } catch (error) {
    console.error("🔥 ElevenLabs SDK error:", error);
    res.status(500).json({ error: error.message || "TTS failed" });
  }
});



// // run server
// app.listen(PORT, () => console.log('Your server is running on PORT' + PORT))
app.listen(port, () => console.log('Your server is running on PORT' + port))