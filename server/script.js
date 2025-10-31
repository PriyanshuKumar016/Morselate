// script.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware to handle JSON data
app.use(express.json());

// Serve static frontend files from 'public' folder
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../public")));


// Morse code dictionary
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

// API endpoint for translation
app.post("/api/translate", (req, res) => {
  const { text } = req.body;
  const result = text
    .toUpperCase()
    .split("")
    .map(ch => morseCode[ch] || "")
    .join(" ");
  res.json({ morse: result });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
