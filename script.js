var winsCountElem = document.getElementById('wins-count')
var lossesCountElem = document.getElementById('losses-count')
var hiddenWordElem = document.getElementById('hidden-word')
var guessesCountElem = document.getElementById('guesses-count')
var guessesElem = document.getElementById('guesses')
var imageDivElem = document.getElementById('image-div')

var answers = ['diricawl', 'fwooper', 'hippogriff', 'jobberknoll', 'kneazle', 'mooncalf', 'niffler', 'puffskein', 'unicorn']
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var winsCount = 0;
var lossesCount = 0;
var guessesCount = 10;
var guesses = [];
var previousWordIndex = -1;
var currentWord = "";
var hiddenWord = "";

function getNewWordIndex() {
    var newWordIndex = Math.floor(Math.random() * answers.length);

    while (previousWordIndex === newWordIndex) {
        newWordIndex = Math.floor(Math.random() * answers.length)
    }

    return newWordIndex;
}

function createHiddenWord() {
    var newHiddenWord = "";

    for (var i = 0; i <currentWord.length; i++) {
        newHiddenWord += "_";
    }

    return newHiddenWord;
}

function updateHiddenWord(userGuess) {
    var hiddenWordLetters = hiddenWord.split("");

    for (var i = 0; i <currentWord.length; i++) {
       if(currentWord[i] === userGuess) {
           hiddenWordLetters[i] = userGuess;
        }
    }

    hiddenWord = hiddenWordLetters.join("");
}

function formatHiddenWord() {
    return hiddenWord.split("").join(" ");
}

function updateWins() {
    winsCount++;
    winsCountElem.textContent = winsCount;
}

function updateLosses() {
    lossesCount++;
    lossesCountElem.textContent = lossesCount;
}

function playAgain(msg) {
    var playAgain = confirm(msg);

    if (playAgain) {
        startGame();
    } else {
      document.removeEventListener("keyup" , playGame);  
    }    
}

function resetGame() {
    guessesCount = 10;
    guesses = [];
    hiddenWord = "";
    previousWordIndex = getNewWordIndex();
}

function startGame() {
    resetGame();

    // Set the words
    currentWord = answers[previousWordIndex];
    console.log({currentWord});
    hiddenWord = createHiddenWord();
    currentImage = "./images/" + currentWord + ".png";
    console.log({currentImage});

    // Update the DOM
    hiddenWordElem.textContent = formatHiddenWord();
    guessesCountElem.textContent = guessesCount;
    guessesElem.textContent = guesses.join(", ");
    imageDivElem.innerHTML = "<img src=' " + currentImage + "'width='150' height='150'/>";

    // Listen for user guesses
    document.addEventListener("keyup" , playGame);
}

function playGame(event) {
    var userGuess = event.key.toLowerCase();
    var isValidGuess = alphabet.includes(userGuess);

    if (isValidGuess) {
        var isInCurrentWord = currentWord.includes(userGuess);

        if(isInCurrentWord) {
            updateHiddenWord(userGuess);
            hiddenWordElem.textContent = formatHiddenWord();

            var userWon = !hiddenWord.includes("_")

            if(userWon) {
                updateWins();
                playAgain("WINNER! You are awesome! Play again?");
            }

            } else {
                var hasPreviouslyGuessed = guesses.includes(userGuess);

                if(!hasPreviouslyGuessed) {
                guessesCount--;
                guessesCountElem.textContent = guessesCount;

            if (guessesCount === 0) {
                updateLosses();
                playAgain("GAME OVER! Don't suck next time, lol! Play again?");
            } else {
                guesses.push(userGuess);
                guessesElem.textContent = guesses.join(", ");
                }   
            }
        }
    }
}

startGame();