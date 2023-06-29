const words = [
  "guys,",
  "please,",
  "meet",
  "your",
  "amazing",
  "iOS",
  "mentor",
  "Leila",
  "who",
  "is",
  "gonna",
  "support"
];
// Array of words for the game

const wordDisplay = document.getElementById('word-display');
const userInput = document.getElementById('user-input');
const errorMessage = document.getElementById('error-message');
const healthProgress = document.getElementById('health-progress');
const lostMessage = document.getElementById('lost-message');
const tryAgainButton = document.getElementById('try-again-button');

let currentWordIndex = 0;
let currentWord = words[currentWordIndex];
let health = 100;
let isGameOver = false;

// Concatenate the words to form the complete text
const completeText = words.join(' ');

// Display the complete text
wordDisplay.textContent = completeText;
updateHealthBar();

// Event listener for user input
userInput.addEventListener('input', function() {
  if (isGameOver) return;

  const arrayWord = wordDisplay.querySelectorAll('span');
  const arrayInput = userInput.value.split('');

  let correct = true;
  arrayWord.forEach((characterSpan, index) => {
    const character = arrayInput[index];
    if (character == null) {
      characterSpan.classList.remove('correct');
      characterSpan.classList.remove('incorrect');
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');
    } else {
      characterSpan.classList.remove('correct');
      characterSpan.classList.add('incorrect');
      correct = false;
    }
  });

  if (correct && userInput.value.length === currentWord.length) {
    // Clear the user input
    userInput.value = '';

    // Increment the current word index
    currentWordIndex++;

    // Check if there are more words
    if (currentWordIndex < words.length) {
      currentWord = words[currentWordIndex];
      renderWords();
      errorMessage.textContent = '';
      x += 100;
      y -= 95;
    } else {
      // Display game completion message
      wordDisplay.textContent = 'Game Completed!';
      errorMessage.textContent = '';
      isGameOver = true;
      showTryAgainButton();
    }
  } else if (userInput.value.length === currentWord.length) {
    // Display error message
    errorMessage.textContent = 'Incorrect! Try again.';
    decreaseHealth(10);
  }
});

renderWords(); // Render words at the beginning

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 1200;
const CANVAS_HEIGHT = canvas.height = 1200;

let x = 1;
let y = 1000;

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillRect(x, y, 100, 100);

  if (isGameOver) return;

  requestAnimationFrame(animate);
}

// Set the animation interval for faster animation
const animationInterval = 250; // Adjust the interval value for desired speed
animate();

function decreaseHealth(amount) {
  health -= amount;
  if (health <= 0) {
    health = 0;
    isGameOver = true;
    showTryAgainButton();
    userInput.disabled = true;
  }
  updateHealthBar();
}

function updateHealthBar() {
  healthProgress.style.width = `${health}%`;
}

function showTryAgainButton() {
  tryAgainButton.hidden = false;
}

function hideTryAgainButton() {
  tryAgainButton.hidden = true;
}

function resetGame() {
  currentWordIndex = 0;
  currentWord = words[currentWordIndex];
  health = 100;
  isGameOver = false;
  renderWords()
  updateHealthBar();
  userInput.value = '';
  userInput.disabled = false;
  errorMessage.textContent = '';
  x = 0;
  y = 1000;
  animate();
  hideTryAgainButton();
}

tryAgainButton.addEventListener('click', function () {
  resetGame();
});

function renderWords() {
  wordDisplay.innerHTML = ''; // Clear the current display

  // Create a span for each character in the array of words
  currentWord.split('').forEach(character => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    wordDisplay.appendChild(characterSpan);
  });

  userInput.value = '';
}