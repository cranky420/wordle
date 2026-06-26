let words = [];

let dailyWord = "";

async function loadWords() {

    const response = await fetch("words.txt");

    const text = await response.text();

    words = text
        .split("\n")
        .map(word => word.trim().toUpperCase())
        .filter(word => word.length === 5);

    // Temporary: random word while we're developing
    dailyWord = words[Math.floor(Math.random() * words.length)];

    console.log("Today's word:", dailyWord);

    createBoard();
}

function createBoard() {

    const board = document.getElementById("board");

    for(let row=0; row<6; row++){

        for(let col=0; col<5; col++){

            const tile=document.createElement("div");

            tile.className="tile";

            tile.id=`${row}-${col}`;

            board.appendChild(tile);

        }

    }

}

loadWords();