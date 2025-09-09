

// Morse code dictionary
const morseCode = {
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "V": "...-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--..",
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    " ": "/"  // space between words
};


function engToMorse(input){
    let ans="";
    for(let ch of input){
        ans = ans + morseCode[ch.toUpperCase()] + " ";
    }
    return ans;
}

// Pseudo-code / concept
let inputBox = document.getElementById("input-box");
let outputBox = document.getElementById("output-box");
let button = document.getElementById("translate-button")

button.addEventListener("click", function(){
    let returnAns = inputBox.value;
    let result = engToMorse(returnAns);
    outputBox.value = result;
})