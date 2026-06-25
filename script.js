let words = [];

async function loadWords() {

    const response = await fetch("words.txt");

    const text = await response.text();

    words = text
        .split("\n")
        .map(word => word.trim().toUpperCase())
        .filter(word => word.length === 5);

    console.log(words);

    document.getElementById("status").innerText =
        `Loaded ${words.length} words`;
}

loadWords();