// Get the square element
var square = document.getElementById('square');

// Set initial position
var posX = 0;
var posY = 0;

// Define the keyboard event listener
document.addEventListener('keydown', function(event) {
  var key = event.key.toLowerCase();

  // Move the square based on the pressed key
  switch (key) {
    case 'w':
      posY -= 10;
      break;
    case 'a':
      posX -= 10;
      break;
    case 's':
      posY += 10;
      break;
    case 'd':
      posX += 10;
      break;
  }

  // Update the square's position
  square.style.top = posY + 'px';
  square.style.left = posX + 'px';
});