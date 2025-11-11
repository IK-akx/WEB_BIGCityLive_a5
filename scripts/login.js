const form = document.querySelector('.needs-validation');
const errorBox = document.getElementById('error-message');
const resetBtn = document.getElementById('resetBtn');
const inputs = document.querySelectorAll('input');

// Функция для получения всех пользователей из localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Функция для аутентификации пользователя
function authenticateUser(username, password) {
    const users = getUsers();
    return users.find(user => user.username === username && user.password === password);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    let message = '';
    let isError = false;

    // Сброс стилей ошибок
    inputs.forEach(input => input.classList.remove('is-invalid'));

    if (!username) {
        document.getElementById('username').classList.add('is-invalid');
        message = 'Please enter your username.';
        isError = true;
    } else if (!password) {
        document.getElementById('password').classList.add('is-invalid');
        message = 'Please enter your password.';
        isError = true;
    } else if (password.length < 6) {
        document.getElementById('password').classList.add('is-invalid');
        message = 'Password must be at least 6 characters long.';
        isError = true;
    }

    if (isError) {
        showMessage(message, 'danger');
        return;
    }

    // Попытка аутентификации
    const user = authenticateUser(username, password);
    
    if (user) {
        // Сохраняем информацию о текущем пользователе
        localStorage.setItem('currentUser', JSON.stringify({
            id: user.id, 
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            password: user.password,  
            createdAt: user.createdAt 
        }));
        
        showMessage('Login successful! Redirecting...', 'success');
        setTimeout(() => window.location.href = '../index.html', 1000);
    } else {
        showMessage('Invalid username or password.', 'danger');
        document.getElementById('password').classList.add('is-invalid');
    }
});

// Остальной код (resetBtn, showMessage, greetBtn) остается таким же
resetBtn.addEventListener('click', () => {
    inputs.forEach(i => i.value = '');
    inputs.forEach(input => input.classList.remove('is-invalid'));
    showMessage('The form has been successfully cleared!', 'success');
});

function showMessage(text, type) {
    errorBox.textContent = text;
    errorBox.className = type === 'danger' ? 'text-danger' : 'text-success';
}

// Greeting button logic (остается без изменений)
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

// Spinner logic (остается без изменений)
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", (e) => {
        e.preventDefault();

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