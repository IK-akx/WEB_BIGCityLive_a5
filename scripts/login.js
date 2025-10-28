const form = document.querySelector('.needs-validation');
const errorBox = document.getElementById('error-message');
const resetBtn = document.getElementById('resetBtn');
const inputs = document.querySelectorAll('input');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  let message = '';
  let isError = false;

  if (!username) {
    message = 'Enter your username.';
    isError = true;
  } else if (!password) {
    message = 'Enter your password.';
    isError = true;
  } else if (password.length < 6) {
    message = 'The password must be at least 6 characters long.';
    isError = true;
  }

  if (isError) {
    showMessage(message, 'danger');
    return;
  }

  localStorage.setItem('username', username);
  showMessage('Login successful!', 'success');

  setTimeout(() => window.location.href = '../index.html', 1000);
});

resetBtn.addEventListener('click', () => {
  inputs.forEach(i => i.value = '');
  showMessage('The form has been successfully cleared!', 'success');
});

function showMessage(text, type) {
  errorBox.textContent = text;
  errorBox.className = type === 'danger' ? 'text-danger' : 'text-success';
}





// Greeting button logic
const greetBtn = document.getElementById('greetBtn');

greetBtn.addEventListener('click', () => {
  const hour = new Date().getHours();
  let timeOfDay = '';

  if (hour < 12) timeOfDay = 'morning';
  else if (hour < 18) timeOfDay = 'afternoon';
  else timeOfDay = 'evening';

  let message = '';

  switch (timeOfDay) {
    case 'morning':
      message = 'Good morning!';
      break;
    case 'afternoon':
      message = 'Good afternoon!';
      break;
    case 'evening':
      message = 'Good evening!';
      break;
    default:
      message = 'Hello!';
  }

  alert(message);
});







document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // spiner
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Please wait…
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Login";
    }, 2000);
  });
});
