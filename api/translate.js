// We are removing the need for 'express' entirely in this handler for simplicity.
// Vercel's runtime provides the req and res objects directly.

const morseCode = {
  "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".",
  "F": "..-.", "G": "--.", "H": "....", "I": "..", "J": ".---",
  "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---",
  "P": ".--.", "Q": "--.-", "R": ".-.", "S": "...", "T": "-",
  "U": "..-", "V": "...-", "W": ".--", "X": "-..-", "Y": "-.--",
  "Z": "--..", "0": "-----", "1": ".----", "2": "..---",
  "3": "...--", "4": "....-", "5": ".....", "6": "-....",
  "7": "--...", "8": "---..", "9": "----.", " ": "/"
};

// IMPORTANT: This is the standard Vercel Node.js handler function signature.
// It replaces the Express app.post('/') structure.
module.exports = (req, res) => {
    // Vercel often provides the parsed JSON body directly on req.body
    const { text } = req.body || {}; 

    // Set CORS headers for security and logging
    res.setHeader('Content-Type', 'application/json');

    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: "Method Not Allowed. Use POST." });
        }
        
        if (!text) {
            console.error("400 Error: Request body is missing 'text' property.");
            // Send 400 response
            return res.status(400).json({ error: "No text provided" });
        }

        // Translation Logic
        const result = text
            .toUpperCase()
            .split("")
            .map(ch => morseCode[ch] || "") 
            .join(" ");

        // Success response
        return res.status(200).json({ morse: result });

    } catch (error) {
        console.error("!!! 500 SERVER CRASH in Serverless Function !!!");
        console.error("Error Details:", error.message);
        // Send 500 response
        return res.status(500).json({ error: "Internal Server Error during translation." });
    }
};
