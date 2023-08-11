const PORT = 8000
const express = require('express')
const cors = require('cors')
require('dotenv').config();

// setup server
const app = express()

// Middleware to parse JSON data from request body
app.use(express.json())
app.use(cors({ origin: 'https://fwens.vercel.app' }));
// app.use(cors())
// app.use((req, res, next)=> {
//     res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// })

const GPT_API_KEY = process.env.REACT_APP_GPT_API_KEY
const EL_API_KEY = process.env.REACT_APP_EL_API_KEY

// GPT POST request handler
app.post('/completions', async(req, res) => {

    // Options - to create completions
    const options = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GPT_API_KEY}`
        },
        body: JSON.stringify({
            model : "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message}],
            max_tokens: 50,
            temperature: 0.7
        })
    }

    // fetching API 
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    }   catch (error) {
        console.error(error)
    }
})

app.post('/eleven-completions', async (req, res) => {
    // Options for the other API request
    const options = {
        method: 'POST',
        headers: {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": EL_API_KEY
        },
        body: JSON.stringify({
                  text: req.body.text,
                  model_id: "eleven_monolingual_v1",
                  voice_settings: {
                    stability: 0.2,
                    similarity_boost: 0.3
                  }
        })
    };

     // fetching API 
     try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${req.body.botVoice}`, options)
        const blob = await response.blob()
        const buffer = await blob.arrayBuffer();
        const base64Data = Buffer.from(buffer).toString('base64');
        res.json({ base64Data });

    }   
    
    catch (error) {
        console.error(error)
    }

});

// run server
app.listen(PORT, () => console.log('Your server is running on PORT' + PORT))