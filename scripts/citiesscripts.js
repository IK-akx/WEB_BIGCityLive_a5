$(document).ready(function() {
  console.log("jQuery is ready!");
});


// Bg color button
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


//----------------------------------------------------------- 


// Learn More / Show Less 
const learnMoreBtn = document.getElementById('learnMoreBtn');
const aboutText = document.getElementById('aboutText');

if (learnMoreBtn && aboutText) {
  let expanded = false;
  const shortText = `Kazakhstan is the largest landlocked country in the world and a bridge between Europe and Asia.
  Its cities are a reflection of rich history, rapid modernization, and vibrant culture. 
  From the futuristic skyline of Astana to the mountain views of Almaty, each city tells its own story.`;

  const longText = `Kazakhstan is the largest landlocked country in the world and a bridge between Europe and Asia.
  Its cities are a reflection of rich history, rapid modernization, and vibrant culture. 
  From the futuristic skyline of Astana to the mountain views of Almaty, each city tells its own story.
  The country is also known for its traditions, warm hospitality, and vast natural beauty — from endless steppes to snow-capped mountains and serene lakes. 
  Kazakhstan plays a key role in connecting East and West, preserving its heritage while embracing innovation.`;

  learnMoreBtn.addEventListener('click', () => {
    if (!expanded) {
      aboutText.textContent = longText;
      learnMoreBtn.textContent = 'Show Less';
    } else {
      aboutText.textContent = shortText;
      learnMoreBtn.textContent = 'Learn More';
    }
    expanded = !expanded;
  });
}


