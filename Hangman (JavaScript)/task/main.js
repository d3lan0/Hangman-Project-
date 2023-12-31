// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')
const wordList = ["python", "java", "swift", "javascript"];
let guessedLetters = [];
let word = (arr) => {
    return arr[Math.floor(Math.random() * (arr.length))];
}
let generateDashes = (word) => {
    let output = "";
    for (let i = 0; i < word.length; i++) {
        output += "-";
    }
    return output;
}

let isInputTheRightLength = (input) => {
    return input.length === 1;
}

let isInputValidLetterSelection = (input) => {
    return /[a-z]/g.test(input);
}

let isIncludedInGuessedLetters = (input) => {
    return guessedLetters.some(e => {
        return e === input;
    });
}

let isValidateInput = (letter) => {
    if (!isInputTheRightLength(letter)) {
        console.log("Please, input a single letter.");
        guessedLetters.push(letter);
        return false;
    } else if (!isInputValidLetterSelection(letter)) {
        console.log("Please, enter a lowercase letter from the English alphabet.");
        guessedLetters.push(letter);
        return false;
    }
    if (isIncludedInGuessedLetters(letter)) {
        console.log("You've already guessed this letter.");
        guessedLetters.push(letter);
        return false;
    }
    if (isInputTheRightLength(letter) && isInputValidLetterSelection(letter)) {
        guessedLetters.push(letter);
        return true;
    }

}

let getUserInput = (word) => {
    let userInput = "";
    do {
        userInput = input(`\n${word}\nInput a letter: `);
    } while (!isValidateInput(userInput))
    return userInput;
}

let fillInLetter = (word, hint, letter) => {
    let arrayOfHint = hint.split("");
    let currentIndex = 0;

    while (currentIndex !== -1) {
        currentIndex = word.indexOf(letter, currentIndex);
        arrayOfHint[currentIndex] = letter;

        if (currentIndex !== -1) {
            currentIndex++;
        }
    }

    return arrayOfHint.join("");
}

function playRound() {
    let win = false;
    let wordFromList = word(wordList);
    let hint = generateDashes(wordFromList);
    let attempts = 8;
    while (attempts > 0) {
        let userInput = getUserInput(hint);
        let hintIncludes = hint.includes(userInput);
        if (hintIncludes) {
            console.log("No improvements.")
            attempts--;
            continue;
        } else if (!wordFromList.includes(userInput)) {
            console.log("That letter doesn't appear in the word.")
            attempts--;
            continue;
        }

        if (wordFromList.includes(userInput)) {
            hint = fillInLetter(wordFromList, hint, userInput);
            if (!hint.includes("-")) {
                console.log(`\nYou guessed the word ${hint}!\nYou survived!`)
                win = true;
                break;
            }
        }

    }

    if (attempts === 0) {
        console.log("\nYou lost!");
    }
    guessedLetters.length = 0;
    return win;
}

(function startGame() {
    console.log("H A N G M A N");
    let winRecord = 0;
    let lossRecord = 0;
    let option = "";
    do {
        let options = "\"Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit\"";
        option = input(options);
        if (option === "play") {
            playRound() ? winRecord++ : lossRecord++;
        }

        if (option === "results") {
            console.log(`You won: ${winRecord} times.`);
            console.log(`You lost: ${lossRecord} times.`);
        }
        if (option === "exit") {
            break;
        }
    } while (option !== "exit") ;
})();