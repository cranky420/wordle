// =====================================
// WORD QUEST
// script.js
// =====================================

// ==============================
// Constants
// ==============================

const ROWS = 6;
const COLS = 5;

// ==============================
// Game State
// ==============================

let words = [];
let dailyWord = "";

let currentRow = 0;
let currentCol = 0;

let gameOver = false;

let guesses = Array.from(
    { length: ROWS },
    () => Array(COLS).fill("")
);

// ==============================
// Start Game
// ==============================

window.onload = async function () {

    await loadWords();

    createBoard();

    registerKeyboard();

    console.log("Game Ready!");

};

// ==============================
// Load Words
// ==============================

async function loadWords() {

    try {

        const response = await fetch("data/words.txt");

        if (!response.ok)
            throw new Error("Unable to load words.txt");

        const text = await response.text();

        words = text
            .split("\n")
            .map(word => word.trim().toUpperCase())
            .filter(word => word.length === 5);

        console.log(`Loaded ${words.length} words`);

        // Same word for everyone each day

        const dayNumber =
            Math.floor(Date.now() / 86400000);

        dailyWord =
            words[dayNumber % words.length];

        console.log("Today's Word:", dailyWord);

    }

    catch (error) {

        console.error(error);

    }

}

// ==============================
// Board
// ==============================

function createBoard() {

    const board =
        document.getElementById("board");

    board.innerHTML = "";

    let delay = 0;

    for (let row = 0; row < ROWS; row++) {

        for (let col = 0; col < COLS; col++) {

            const tile =
                document.createElement("div");

            tile.className = "tile";

            tile.id = `tile-${row}-${col}`;

            tile.style.opacity = "0";

            tile.style.transform = "scale(.8)";

            board.appendChild(tile);

            setTimeout(() => {

                tile.style.opacity = "1";

                tile.style.transform = "scale(1)";

            }, delay);

            delay += 20;

        }

    }

}

// ==============================
// Keyboard
// ==============================

function registerKeyboard() {

    document.addEventListener(
        "keydown",
        handleKeyPress
    );

}

// ==============================
// Keyboard Handler
// ==============================

function handleKeyPress(event) {

    if (gameOver)
        return;

    const key =
        event.key.toUpperCase();

    // Letter

    if (/^[A-Z]$/.test(key)) {

        addLetter(key);

        return;

    }

    // Delete

    if (event.key === "Backspace") {

        deleteLetter();

        return;

    }

    // Submit

    if (event.key === "Enter") {

        submitGuess();

        return;

    }

}

// ==============================
// Add Letter
// ==============================

function addLetter(letter) {

    if (currentCol >= COLS)
        return;

    guesses[currentRow][currentCol] = letter;

    const tile =
        document.getElementById(
            `tile-${currentRow}-${currentCol}`
        );

    tile.textContent = letter;

    // tile.style.borderColor = "#3b4b62";

    currentCol++;

}

// ==============================
// Delete Letter
// ==============================

function deleteLetter() {

    if (currentCol === 0)
        return;

    currentCol--;

    guesses[currentRow][currentCol] = "";

    const tile =
        document.getElementById(
            `tile-${currentRow}-${currentCol}`
        );

    tile.textContent = "";

    tile.style.borderColor = "#3b4b62";

}

// ==============================
// Submit Guess
// ==============================

function submitGuess() {

    if (currentCol < COLS) {

        shakeRow();

        return;

    }

    const guess =
        guesses[currentRow].join("");

    console.log("Guess:", guess);

    // Part 2 starts here
    // We will:
    // 1. Validate the word
    // 2. Color tiles
    // 3. Detect win
    // 4. Detect lose
    // 5. Move to next row

}

// ==============================
// Shake Animation
// ==============================

function shakeRow() {

    for (let col = 0; col < COLS; col++) {

        const tile =
            document.getElementById(
                `tile-${currentRow}-${col}`
            );

        tile.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-6px)" },
                { transform: "translateX(6px)" },
                { transform: "translateX(0)" }
            ],
            {
                duration: 200
            }
        );

    }

}