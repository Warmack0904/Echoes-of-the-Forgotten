const miniGame = document.getElementById("miniGame");
const startGameBtn = document.getElementById("startGameBtn");
const knowledgeSection = document.getElementById("knowledgeSection");
const knowledgeText = document.getElementById("knowledgeText");
const nextGameBtn = document.getElementById("nextGameBtn");
const infoText = document.getElementById("infoText");

let gameCount = 0;
const knowledgeBank = [
  "The Library of Alexandria was one of the largest and most significant libraries of the ancient world.",
  "The Antikythera mechanism is considered the first analog computer in history.",
  "The pyramids of Giza are aligned with incredible precision to cardinal points.",
  "Ancient Sumerians used a base-60 numbering system that we still use in timekeeping.",
  "The Rosetta Stone was key to deciphering Egyptian hieroglyphs.",
  "Stonehenge is believed to be an ancient astronomical calendar.",
  "The Nazca Lines in Peru were created by an ancient civilization and are best seen from the sky.",
  "The Code of Hammurabi is one of the earliest written legal codes.",
  "The Olmec civilization created colossal head sculptures carved from basalt.",
  "The Great Zimbabwe ruins were the center of a powerful African kingdom in the Middle Ages.",
  "The Mayan civilization had an advanced calendar system that included the concept of zero.",
  "The Vedas are among the oldest sacred texts in human history, originating in ancient India.",
  "The Epic of Gilgamesh is one of the oldest surviving works of literature.",
  "The Terra Cotta Army was buried with China's first Emperor Qin Shi Huang to protect him in the afterlife.",
  "The Indus Valley Civilization had sophisticated urban planning and drainage systems."
];

// Start MiniGame Dispatcher
function runMiniGame() {
  const gameType = gameCount % 10;
  miniGame.innerHTML = "";
  infoText.innerText = "Complete the mini-game to unlock ancient secrets.";
  switch (gameType) {
    case 0:
      mathMiniGame();
      break;
    case 1:
      memoryMiniGame();
      break;
    case 2:
      patternMiniGame();
      break;
    case 3:
      reactionMiniGame();
      break;
    case 4:
      multipleChoiceMiniGame();
      break;
    case 5:
      unscrambleMiniGame();
      break;
    case 6:
      logicMiniGame();
      break;
    case 7:
      numberGuessMiniGame();
      break;
    case 8:
      trueFalseMiniGame();
      break;
    case 9:
      colorMatchMiniGame();
      break;
  }
}

// Mini-game 0: Math Quiz (basic)
function mathMiniGame() {
  miniGame.innerHTML = `<p>Solve this: What is 3 + 4?</p>
  <input id='answer' type='text'>
  <button onclick='checkAnswer()'>Submit</button>`;
}

function checkAnswer() {
  const answer = document.getElementById("answer").value.trim();
  if (gameCount % 10 === 0 && answer == "7") {
    unlockKnowledge();
  } else if (gameCount % 10 === 1) {
    checkMemoryAnswer(answer);
  } else if (gameCount % 10 === 2) {
    checkPatternAnswer(answer);
  } else if (gameCount % 10 === 4) {
    checkMultipleChoice(answer);
  } else if (gameCount % 10 === 5) {
    checkUnscramble(answer);
  } else if (gameCount % 10 === 6) {
    checkLogic(answer);
  } else if (gameCount % 10 === 7) {
    checkNumberGuess(answer);
  } else if (gameCount % 10 === 8) {
    checkTrueFalse(answer);
  }
  else {
    alert("Please complete the task as instructed.");
  }
}

// Mini-game 1: Memory sequence
let memorySequence = [];
let memoryIndex = 0;
function memoryMiniGame() {
  memorySequence = generateMemorySequence(5);
  memoryIndex = 0;
  miniGame.innerHTML = `<p>Remember this sequence:</p><p id='sequence'>${memorySequence.join(" ")}</p><button onclick='startMemoryRecall()'>Start Recall</button>`;
}

function generateMemorySequence(length) {
  const chars = "123456789";
  let seq = [];
  for (let i = 0; i < length; i++) {
    seq.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  return seq;
}

function startMemoryRecall() {
  miniGame.innerHTML = `<p>Enter the sequence, numbers separated by spaces:</p><input id='answer' type='text'><button onclick='checkAnswer()'>Submit</button>`;
}

function checkMemoryAnswer(answer) {
  if (!answer) {
    alert("Please enter the sequence.");
    return;
  }
  const inputSeq = answer.trim().split(/\s+/);
  if (inputSeq.length !== memorySequence.length) {
    alert("Incorrect length, try again.");
    return;
  }
  for (let i = 0; i < memorySequence.length; i++) {
    if (inputSeq[i] !== memorySequence[i]) {
      alert("Incorrect sequence, try again.");
      return;
    }
  }
  unlockKnowledge();
}

// Mini-game 2: Pattern recognition (simple arithmetic)
function patternMiniGame() {
  miniGame.innerHTML = `<p>Find the next number: 2, 4, 6, 8, ?</p><input id='answer' type='text'><button onclick='checkAnswer()'>Submit</button>`;
}
function checkPatternAnswer(answer) {
  if (answer === "10") {
    unlockKnowledge();
  } else {
    alert("Try again!");
  }
}

// Mini-game 3: Reaction test
let reactionTimeout;
function reactionMiniGame() {
  miniGame.innerHTML = `<p>Click the button as soon as it appears.</p><div id='reactionArea'></div>`;
  infoText.innerText = "Wait for the button...";
  const reactionArea = document.getElementById("reactionArea");
  setTimeout(() => {
    reactionArea.innerHTML = `<button id='reactBtn'>Click Me!</button>`;
    const reactBtn = document.getElementById("reactBtn");
    reactBtn.onclick = () => {
      clearTimeout(reactionTimeout);
      unlockKnowledge();
    };
    infoText.innerText = "Click now!";
    reactionTimeout = setTimeout(() => {
      alert("Too slow, try again.");
      runMiniGame();
    }, 3000);
  }, Math.random() * 2000 + 1000);
}

// Mini-game 4: Multiple Choice
function multipleChoiceMiniGame() {
  miniGame.innerHTML = `<p>Which ancient artifact helped decode Egyptian hieroglyphs?</p>
  <input id='answer' type='text' placeholder='Type your answer here'>
  <button onclick='checkAnswer()'>Submit</button>`;
}
function checkMultipleChoice(answer) {
  if (answer.toLowerCase().includes("rosetta stone")) {
    unlockKnowledge();
  } else {
    alert("Incorrect, try again.");
  }
}

// Mini-game 5: Word Unscramble
const scrambleWord = "HENGEOSTN";
function unscrambleMiniGame() {
  miniGame.innerHTML = `<p>Unscramble the letters to find a famous ancient monument: ${scrambleWord}</p>
  <input id='answer' type='text'>
  <button onclick='checkAnswer()'>Submit</button>`;
}
function checkUnscramble(answer) {
  if (answer.toLowerCase() === "stonehenge") {
    unlockKnowledge();
  } else {
    alert("Try again!");
  }
}

// Mini-game 6: Logic Puzzle
function logicMiniGame() {
  miniGame.innerHTML = `<p>If all pyramids are monuments and all monuments are ancient, are all pyramids ancient? (yes/no)</p>
  <input id='answer' type='text'>
  <button onclick='checkAnswer()'>Submit</button>`;
}
function checkLogic(answer) {
  if (answer.toLowerCase() === "yes") {
    unlockKnowledge();
  } else {
    alert("Try again!");
  }
}

// Mini-game 7: Number Guessing
let guessNumber = Math.floor(Math.random() * 10) + 1;
function numberGuessMiniGame() {
  miniGame.innerHTML = `<p>Guess the number between 1 and 10.</p><input id='answer' type='text'><button onclick='checkAnswer()'>Submit</button>`;
}
function checkNumberGuess(answer) {
  const guess = parseInt(answer);
  if (guess === guessNumber) {
    unlockKnowledge();
  } else if (guess > guessNumber) {
    alert("Too high!");
  } else if (guess < guessNumber) {
    alert("Too low!");
  } else {
    alert("Invalid input.");
  }
}

// Mini-game 8: True/False
function trueFalseMiniGame() {
  miniGame.innerHTML = `<p>True or False: The Epic of Gilgamesh is one of the oldest surviving works of literature.</p>
  <input id='answer' type='text'>
  <button onclick='checkAnswer()'>Submit</button>`;
}
function checkTrueFalse(answer) {
  if (answer.toLowerCase() === "true") {
    unlockKnowledge();
  } else {
    alert("Try again!");
  }
}

// Mini-game 9: Color Matching (basic)
const colors = ["red", "blue", "green", "yellow"];
const correctColor = colors[Math.floor(Math.random() * colors.length)];
function colorMatchMiniGame() {
  let buttons = colors.map(c => `<button onclick='checkColor("${c}")' style='background:${c};color:#fff;margin:5px;padding:10px 15px;border:none;border-radius:5px;'>${c}</button>`).join("");
  miniGame.innerHTML = `<p>Click the <strong>${correctColor}</strong> button.</p>` + buttons;
}
function checkColor(selected) {
  if (selected === correctColor) {
    unlockKnowledge();
  } else {
    alert("Wrong color, try again.");
  }
}

// Unlock knowledge and prepare next
function unlockKnowledge() {
  const knowledge = knowledgeBank[gameCount % knowledgeBank.length];
  knowledgeText.innerText = knowledge;
  document.getElementById("game").classList.add("hidden");
  knowledgeSection.classList.remove("hidden");
  gameCount++;
  if(gameCount % 10 === 7) { // reset guess number for next round
    guessNumber = Math.floor(Math.random() * 10) + 1;
  }
}

startGameBtn.addEventListener("click", () => {
  runMiniGame();
});

nextGameBtn.addEventListener("click", () => {
  knowledgeSection.classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  infoText.innerText = "Complete the next mini-game to reveal more.";
  runMiniGame();
});

