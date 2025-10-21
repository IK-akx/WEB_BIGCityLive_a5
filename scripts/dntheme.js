// Theme Toggle (Day/Night)
const themeToggleBtn = document.getElementById('themeToggleBtn');
const clickSound = new Audio('../sounds/click1.wav'); 

// Check theme in localStorage
let savedTheme = localStorage.getItem('theme');

if (savedTheme === 'night') {
  document.body.classList.add('night-theme');
  document.body.classList.remove('day-theme');
  if (themeToggleBtn) themeToggleBtn.textContent = "☀️ Day Mode";
} else {
  document.body.classList.add('day-theme');
  document.body.classList.remove('night-theme');
  if (themeToggleBtn) themeToggleBtn.textContent = "🌙 Night Mode";
}

// Switching theme
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    // Play sound
    clickSound.currentTime = 0; // reset
    clickSound.play();

    if (document.body.classList.contains('day-theme')) {
      // night
      document.body.classList.add('night-theme');
      document.body.classList.remove('day-theme');
      themeToggleBtn.textContent = "☀️ Day Mode";
      localStorage.setItem('theme', 'night');
    } else {
      // day
      document.body.classList.add('day-theme');
      document.body.classList.remove('night-theme');
      themeToggleBtn.textContent = "🌙 Night Mode";
      localStorage.setItem('theme', 'day');
    }
  });
}
