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
