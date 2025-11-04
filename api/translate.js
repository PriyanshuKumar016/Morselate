const express = require("express");
const app = express();

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

app.post("/", (req, res) => {

    try {
        // --- DEBUG LOGS START ---
        console.log("--- API Request Received (Simplified) ---");
        console.log("Request Body:", req.body); 
        // --- DEBUG LOGS END ---


        const { text } = req.body || {};

        if (!text) {
            console.error("400 Error: Request body is missing 'text' property.");
            return res.status(400).json({ error: "No text provided" });
        }

        // ===========Translation Logic
        const result = text
            .toUpperCase()
            .split("")
            .map(ch => morseCode[ch] || "")
            .join(" ");

        // ===========Success response
        console.log("Translation Successful. Sending 200 OK.");
        res.json({ morse: result });

    } catch (error) {
        console.error("!!! 500 SERVER CRASH !!!");
        console.error("Error Details:", error.message);
        res.status(500).json({ error: "Internal Server Error during translation." });
    }
});

module.exports = app;