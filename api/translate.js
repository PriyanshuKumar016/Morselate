const express = require("express");
const app = express();

// Use Express's built-in JSON body parser
app.use(express.json());

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

// Vercel Serverless Function entry point
app.post("/", (req, res) => {
    try {
        const { text } = req.body || {};

        if (!text) {
            // Log an error in Vercel's console
            console.error("400 Error: Request body is missing 'text' property.");
            return res.status(400).json({ error: "No text provided" });
        }

        // Translation Logic
        const result = text
            .toUpperCase()
            .split("")
            .map(ch => morseCode[ch] || "") 
            .join(" ");

        // Success response
        res.json({ morse: result });

    } catch (error) {
        // Log a fatal error
        console.error("!!! 500 SERVER CRASH in Serverless Function !!!");
        console.error("Error Details:", error.message);
        res.status(500).json({ error: "Internal Server Error during translation." });
    }
});


module.exports = app;
