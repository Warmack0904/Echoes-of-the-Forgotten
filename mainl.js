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
  "Ancient Sumerians used a base-60 numbering system that we still use in timekeeping."
];

function runMiniGame() {
  miniGame.innerHTML = "<p>Solve this: What is 3 + 4?</p><input id='answer' type='text'><button onclick='checkAnswer()'>Submit</button>";
}

function checkAnswer() {
  const answer = document.getElementById("answer").value;
  if (answer == "7") {
    unlockKnowledge();
  } else {
    alert("Try again!");
  }
}

function unlockKnowledge() {
  const knowledge = knowledgeBank[gameCount % knowledgeBank.length];
  knowledgeText.innerText = knowledge;
  document.getElementById("game").classList.add("hidden");
  knowledgeSection.classList.remove("hidden");
  gameCount++;
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
