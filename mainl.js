// Data: 20 knowledge entries with title + content
const knowledgeEntries = [
  {
    title: "The Great Pyramid of Giza",
    content: "Built as a tomb for Pharaoh Khufu, it is the oldest and largest of the Egyptian pyramids.",
    miniGame: "mathQuiz",
  },
  {
    title: "Stonehenge",
    content: "A prehistoric monument in England consisting of a ring of standing stones.",
    miniGame: "memorySequence",
  },
  {
    title: "Rosetta Stone",
    content: "An artifact inscribed with the same text in three scripts, key to deciphering Egyptian hieroglyphs.",
    miniGame: "patternRecognition",
  },
  {
    title: "Antikythera Mechanism",
    content: "An ancient Greek analog computer used to predict astronomical positions.",
    miniGame: "reactionTest",
  },
  {
    title: "Dead Sea Scrolls",
    content: "Ancient Jewish religious manuscripts discovered near the Dead Sea.",
    miniGame: "multipleChoice",
  },
  {
    title: "Machu Picchu",
    content: "A 15th-century Inca citadel located high in the Andes Mountains in Peru.",
    miniGame: "wordUnscramble",
  },
  {
    title: "Terracotta Army",
    content: "Thousands of life-sized clay soldiers buried with China’s first Emperor Qin Shi Huang.",
    miniGame: "logicPuzzle",
  },
  {
    title: "Nazca Lines",
    content: "Large geoglyphs etched into the desert floor in southern Peru.",
    miniGame: "numberGuessing",
  },
  {
    title: "Code of Hammurabi",
    content: "One of the oldest deciphered writings of significant length, a Babylonian code of law.",
    miniGame: "trueFalseQuiz",
  },
  {
    title: "Babylonian Astronomy",
    content: "Ancient Babylonians developed detailed records and theories about stars and planets.",
    miniGame: "colorMatching",
  },
  // New 10 entries
  {
    title: "Voynich Manuscript",
    content: "An illustrated codex hand-written in an unknown writing system, still undeciphered.",
    miniGame: "mathQuiz",
  },
  {
    title: "Easter Island Moai",
    content: "Monolithic human figures carved by the Rapa Nui people on Easter Island.",
    miniGame: "memorySequence",
  },
  {
    title: "Library of Alexandria",
    content: "One of the largest and most significant libraries of the ancient world, lost to fire.",
    miniGame: "patternRecognition",
  },
  {
    title: "Phaistos Disc",
    content: "A disk of fired clay from Crete with undeciphered symbols.",
    miniGame: "reactionTest",
  },
  {
    title: "Hanging Gardens of Babylon",
    content: "One of the Seven Wonders, described as an extraordinary series of tiered gardens.",
    miniGame: "multipleChoice",
  },
  {
    title: "Cave Paintings of Lascaux",
    content: "Paleolithic cave paintings in southwestern France depicting large animals.",
    miniGame: "wordUnscramble",
  },
  {
    title: "Sumerian Cuneiform",
    content: "The earliest known writing system developed by the ancient Sumerians.",
    miniGame: "logicPuzzle",
  },
  {
    title: "Oracle Bones",
    content: "Animal bones used for divination during the Shang dynasty in China.",
    miniGame: "numberGuessing",
  },
  {
    title: "Chichen Itza",
    content: "A large pre-Columbian archaeological site built by the Maya civilization in Mexico.",
    miniGame: "trueFalseQuiz",
  },
  {
    title: "The Silk Road",
    content: "Ancient trade routes connecting East and West, vital for cultural exchange.",
    miniGame: "colorMatching",
  },
];

// Game state
let currentIndex = 0;
const totalEntries = knowledgeEntries.length;

// DOM Elements
const startBtn = document.getElementById("startGameBtn");
const nextBtn = document.getElementById("nextGameBtn");
const miniGameDiv = document.getElementById("miniGame");
const knowledgeSection = document.getElementById("knowledgeSection");
const knowledgeText = document.getElementById("knowledgeText");
const infoText = document.getElementById("infoText");
const resetBtn = document.getElementById("resetProgressBtn");

// Load progress from localStorage
function loadProgress() {
  const saved = localStorage.getItem("ancientArchivesProgress");
  if (saved) {
    currentIndex = parseInt(saved, 10);
    if (isNaN(currentIndex) || currentIndex >= totalEntries) currentIndex = 0;
  }
}
function saveProgress() {
  localStorage.setItem("ancientArchivesProgress", currentIndex);
}

// Reset progress handler
resetBtn.onclick = () => {
  if (confirm("Are you sure you want to reset your progress?")) {
    currentIndex = 0;
    saveProgress();
    knowledgeSection.classList.add("hidden");
    miniGameDiv.innerHTML = "";
    startBtn.disabled = false;
    infoText.textContent = "Progress reset. Click start to begin.";
  }
};

// Show knowledge and prepare for next game
function revealKnowledge() {
  const entry = knowledgeEntries[currentIndex];
  knowledgeText.innerHTML = `<strong>${entry.title}</strong><br>${entry.content}`;
  knowledgeSection.classList.remove("hidden");
  startBtn.style.display = "none";
  miniGameDiv.innerHTML = "";
  infoText.textContent = `You unlocked knowledge about: ${entry.title}`;
  nextBtn.style.display = currentIndex + 1 < totalEntries ? "inline-block" : "none";
}

// Go to next knowledge and game
nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex >= totalEntries) {
    infoText.textContent = "All knowledge unlocked! Thanks for playing Ancient Archives.";
    nextBtn.style.display = "none";
    knowledgeSection.classList.add("hidden");
    startBtn.style.display = "none";
    miniGameDiv.innerHTML = "";
  } else {
    knowledgeSection.classList.add("hidden");
    startBtn.style.display = "inline-block";
    startBtn.disabled = false;
    infoText.textContent = `Get ready to unlock: ${knowledgeEntries[currentIndex].title}`;
  }
  saveProgress();
};

// Mini-game dispatcher
startBtn.onclick = () => {
  startBtn.disabled = true;
  knowledgeSection.classList.add("hidden");
  const miniGameType = knowledgeEntries[currentIndex].miniGame;
  runMiniGame(miniGameType);
};

function runMiniGame(type) {
  miniGameDiv.innerHTML = "";
  switch (type) {
    case "mathQuiz":
      mathQuiz();
      break;
    case "memorySequence":
      memorySequence();
      break;
    case "patternRecognition":
      patternRecognition();
      break;
    case "reactionTest":
      reactionTest();
      break;
    case "multipleChoice":
      multipleChoice();
      break;
    case "wordUnscramble":
      wordUnscramble();
      break;
    case "logicPuzzle":
      logicPuzzle();
      break;
    case "numberGuessing":
      numberGuessing();
      break;
    case "trueFalseQuiz":
      trueFalseQuiz();
      break;
    case "colorMatching":
      colorMatching();
      break;
    default:
      infoText.textContent = "Unknown mini-game.";
      startBtn.disabled = false;
  }
}

// Mini-Game Implementations:

// 1. mathQuiz: simple arithmetic question
function mathQuiz() {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  const op = ["+", "-", "*"][Math.floor(Math.random() * 3)];
  let correctAns;
  switch (op) {
    case "+": correctAns = a + b; break;
    case "-": correctAns = a - b; break;
    case "*": correctAns = a * b; break;
  }

  miniGameDiv.innerHTML = `
    <p>Solve: ${a} ${op} ${b} = ?</p>
    <input type="text" id="mathInput" autocomplete="off" />
    <button id="submitMath">Submit</button>
    <p id="feedback"></p>
  `;

  document.getElementById("submitMath").onclick = () => {
    const val = Number(document.getElementById("mathInput").value);
    const feedback = document.getElementById("feedback");
    if (val === correctAns) {
      feedback.textContent = "Correct! Knowledge unlocked.";
      endMiniGame();
    } else {
      feedback.textContent = "Incorrect, try again.";
    }
  };
}

// 2. memorySequence: memorize and repeat sequence of numbers
function memorySequence() {
  const seqLength = 4;
  const sequence = Array.from({ length: seqLength }, () => Math.floor(Math.random() * 9) + 1);
  miniGameDiv.innerHTML = `<p>Memorize this sequence:</p><p id="seqDisplay">${sequence.join(" ")}</p><button id="startRecall">Start Recall</button><div id="recallArea" class="hidden"></div><p id="feedback"></p>`;

  const seqDisplay = document.getElementById("seqDisplay");
  const recallArea = document.getElementById("recallArea");
  const feedback = document.getElementById("feedback");
  const startRecall = document.getElementById("startRecall");

  // Hide sequence after 3 seconds
  setTimeout(() => {
    seqDisplay.textContent = "••••";
  }, 3000);

  startRecall.onclick = () => {
    startRecall.disabled = true;
    recallArea.classList.remove("hidden");
    recallArea.innerHTML = `
      <p>Enter the sequence separated by spaces:</p>
      <input type="text" id="recallInput" autocomplete="off" />
      <button id="submitRecall">Submit</button>
    `;
    document.getElementById("submitRecall").onclick = () => {
      const inputSeq = document.getElementById("recallInput").value.trim().split(/\s+/).map(Number);
      if (inputSeq.length !== seqLength) {
        feedback.textContent = "Wrong length. Try again.";
        return;
      }
      if (inputSeq.every((num, idx) => num === sequence[idx])) {
        feedback.textContent = "Correct! Knowledge unlocked.";
        endMiniGame();
      } else {
        feedback.textContent = "Incorrect sequence, try again.";
      }
    };
  };
}

// 3. patternRecognition: find the next number in a sequence
function patternRecognition() {
  // Simple pattern: arithmetic progression
  const start = Math.floor(Math.random() * 10) + 1;
  const diff = Math.floor(Math.random() * 5) + 1;
  const seq = [start, start + diff, start + diff * 2];
  const correct = start + diff * 3;

  miniGameDiv.innerHTML = `
    <p>What is the next number in this sequence?</p>
    <p>${seq.join(", ")}, ?</p>
    <input type="text" id="patternInput" autocomplete="off" />
    <button id="submitPattern">Submit</button>
    <p id="feedback"></p>
  `;

  document.getElementById("submitPattern").onclick = () => {
    const val = Number(document.getElementById("patternInput").value);
    const feedback = document.getElementById("feedback");
    if (val === correct) {
      feedback.textContent = "Correct! Knowledge unlocked.";
      endMiniGame();
    } else {
      feedback.textContent = "Incorrect, try again.";
    }
  };
}

// 4. reactionTest: click button after it appears
function reactionTest() {
  miniGameDiv.innerHTML = `
    <p>Wait for the button to appear, then click it as fast as you can!</p>
    <div id="reactionArea"></div>
    <p id="feedback"></p>
  `;
  const reactionArea = document.getElementById("reactionArea");
  const feedback = document.getElementById("feedback");

  let startTime;

  function showButton() {
    reactionArea.innerHTML = `<button id="reactBtn">Click me!</button>`;
    const btn = document.getElementById("reactBtn");
    startTime = Date.now();

    btn.onclick = () => {
      const reactionTime = Date.now() - startTime;
      feedback.textContent = `Your reaction time: ${reactionTime} ms.`;
      if (reactionTime < 1000) {
        feedback.textContent += " Great! Knowledge unlocked.";
        endMiniGame();
      } else {
        feedback.textContent += " Too slow, try again.";
        reactionArea.innerHTML = "";
        setTimeout(showButton, 1500);
      }
    };
  }

  reactionArea.innerHTML = "<p>Get ready...</p>";
  setTimeout(showButton, 2000);
}

// 5. multipleChoice: choose the correct answer
function multipleChoice() {
  const question = "Which ancient civilization built the Machu Picchu?";
  const options = ["Aztec", "Maya", "Inca", "Olmec"];
  const correct = "Inca";

  miniGameDiv.innerHTML = `
    <p>${question}</p>
    ${options
      .map(
        (opt, i) =>
          `<div><input type="radio" id="opt${i}" name="mc" value="${opt}" />
           <label for="opt${i}">${opt}</label></div>`
      )
      .join("")}
    <button id="submitMC">Submit</button>
    <p id="feedback"></p>
  `;

  document.getElementById("submitMC").onclick = () => {
    const selected = [...document.getElementsByName("mc")].find((el) => el.checked);
    const feedback = document.getElementById("feedback");
    if (!selected) {
      feedback.textContent = "Please select an option.";
      return;
    }
    if (selected.value === correct) {
      feedback.textContent = "Correct! Knowledge unlocked.";
      endMiniGame();
    } else {
      feedback.textContent = "Incorrect, try again.";
    }
  };
}

// 6. wordUnscramble: unscramble a word
function wordUnscramble() {
  const word = "terracotta";
  const scrambled = shuffleString(word);

  miniGameDiv.innerHTML = `
    <p>Unscramble the word: <strong>${scrambled}</strong></p>
    <input type="text" id="unscrambleInput" autocomplete="off" />
    <button id="submitUnscramble">Submit</button>
    <p id="feedback"></p>
  `;

  document.getElementById("submitUnscramble").onclick = () => {
    const val = document.getElementById("unscrambleInput").value.toLowerCase().trim();
    const feedback = document.getElementById("feedback");
    if (val === word) {
      feedback.textContent = "Correct! Knowledge unlocked.";
      endMiniGame();
    } else {
      feedback.textContent = "Incorrect, try again.";
    }
  };
}

// Helper: shuffle string
function shuffleString(str) {
  const arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

// 7. logicPuzzle: simple riddle
function logicPuzzle() {
  const riddle = "I speak without a mouth and hear without ears. I have nobody, but I come alive with wind. What am I?";
  const answer = "echo";

  miniGameDiv.innerHTML = `
    <p>${riddle}</p>
    <input type="text" id="riddleInput" autocomplete="off" />
    <button id="submitRiddle">Submit</button>
    <p id="feedback"></p>
  `;

  document.getElementById("submitRiddle").onclick = () => {
    const val = document.getElementById("riddleInput").value.toLowerCase().trim();
    const feedback = document.getElementById("feedback");
    if (val === answer) {
      feedback.textContent = "Correct! Knowledge unlocked.";
      endMiniGame();
    } else {
      feedback.textContent = "Incorrect, try again.";
    }
  };
}

// 8. numberGuessing: guess a number 1-15
function numberGuessing() {
  const target = Math.floor(Math.random() * 15) + 1;

  miniGameDiv.innerHTML = `
    <p>Guess a number between 1 and 15.</p>
    <input type="number" id="guessInput" min="1" max="15" autocomplete="off" />
    <button id="submitGuess">Submit</button>
    <p id="feedback"></p>
  `;

  document.getElementById("submitGuess").onclick = () => {
    const val = Number(document.getElementById("guessInput").value);
    const feedback = document.getElementById("feedback");
    if (!val || val < 1 || val > 15) {
      feedback.textContent = "Please enter a valid number.";
      return;
    }
    if (val === target) {
      feedback.textContent = "Correct! Knowledge unlocked.";
      endMiniGame();
    } else if (val < target) {
      feedback.textContent = "Too low. Try again.";
    } else {
      feedback.textContent = "Too high. Try again.";
    }
  };
}

// 9. trueFalseQuiz: true/false question
function trueFalseQuiz() {
  const statement = "The Hanging Gardens of Babylon still exist today.";
  const correct = false;

  miniGameDiv.innerHTML = `
    <p>True or False: ${statement}</p>
    <div>
      <input type="radio" id="true" name="tf" value="true" />
      <label for="true">True</label>
    </div>
    <div>
      <input type="radio" id="false" name="tf" value="false" />
      <label for="false">False</label>
    </div>
    <button id="submitTF">Submit</button>
    <p id="feedback"></p>
  `;

  document.getElementById("submitTF").onclick = () => {
    const selected = [...document.getElementsByName("tf")].find((el) => el.checked);
    const feedback = document.getElementById("feedback");
    if (!selected) {
      feedback.textContent = "Please select True or False.";
      return;
    }
    const userVal = selected.value === "true";
    if (userVal === correct) {
      feedback.textContent = "Correct! Knowledge unlocked.";
      endMiniGame();
    } else {
      feedback.textContent = "Incorrect, try again.";
    }
  };
}

// 10. colorMatching: simple color memory test
function colorMatching() {
  // Show a color, then ask which color was shown
  const colors = ["Red", "Blue", "Green", "Yellow", "Orange"];
  const chosenColor = colors[Math.floor(Math.random() * colors.length)];

  miniGameDiv.innerHTML = `<p>Memorize this color:</p><div style="width:80px;height:80px;margin: 0 auto; background:${chosenColor.toLowerCase()}; border-radius: 10px;"></div><button id="startRecall">Recall Color</button><div id="recallArea" class="hidden"></div><p id="feedback"></p>`;

  const startRecall = document.getElementById("startRecall");
  const recallArea = document.getElementById("recallArea");
  const feedback = document.getElementById("feedback");

  setTimeout(() => {
    // Hide color block after 2.5 seconds
    const div = miniGameDiv.querySelector("div");
    if (div) div.style.backgroundColor = "#111";
  }, 2500);

  startRecall.onclick = () => {
    startRecall.disabled = true;
    recallArea.classList.remove("hidden");
    recallArea.innerHTML = colors
      .map(
        (color, i) =>
          `<div><input type="radio" id="color${i}" name="color" value="${color}" />
           <label for="color${i}">${color}</label></div>`
      )
      .join("") + '<button id="submitColor">Submit</button>';

    document.getElementById("submitColor").onclick = () => {
      const selected = [...document.getElementsByName("color")].find((el) => el.checked);
      if (!selected) {
        feedback.textContent = "Please select a color.";
        return;
      }
      if (selected.value === chosenColor) {
        feedback.textContent = "Correct! Knowledge unlocked.";
        endMiniGame();
      } else {
        feedback.textContent = "Incorrect, try again.";
      }
    };
  };
}

// End mini-game - show knowledge and enable next
function endMiniGame() {
  startBtn.disabled = false;
  revealKnowledge();
}

// Initialize on load
loadProgress();
infoText.textContent = `Get ready to unlock: ${knowledgeEntries[currentIndex].title}`;
if (currentIndex > 0) {
  knowledgeSection.classList.remove("hidden");
  revealKnowledge();
}
