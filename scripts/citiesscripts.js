// Find button by ID
const colorButton = document.getElementById('changeColorBtn');

// Function that generate random color 
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Click command
colorButton.addEventListener('click', function() {
  const newColor = getRandomColor();
  document.body.style.backgroundColor = newColor;
});


