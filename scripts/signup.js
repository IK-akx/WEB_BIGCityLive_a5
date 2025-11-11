const form = document.getElementById('signupForm');
const errorBox = document.getElementById('error-message');
const resetBtn = document.getElementById('resetBtn');

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function userExists(username, email) {
    const users = getUsers();
    return users.find(user => user.username === username || user.email === email);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    return password.length >= 6;
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const feedback = field.nextElementSibling;
    
    field.classList.remove('is-invalid');
    
    if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.style.display = 'none';
    }
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const feedback = field.nextElementSibling;
    
    field.classList.add('is-invalid');
    
    if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.textContent = message;
        feedback.style.display = 'block';
    }
}

function setupRealTimeValidation() {
    const fields = ['fullName', 'email', 'username', 'password', 'confirmPassword'];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        
        field.addEventListener('input', function() {
            validateField(fieldId);
        });
        
        field.addEventListener('blur', function() {
            validateField(fieldId);
        });
    });
}

function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    
    clearFieldError(fieldId);
    
    let isValid = true;
    let errorMessage = '';
    
    switch(fieldId) {
        case 'fullName':
            if (!value) {
                errorMessage = 'Please enter your full name.';
                isValid = false;
            }
            break;
            
        case 'email':
            if (!value) {
                errorMessage = 'Please enter your email.';
                isValid = false;
            } else if (!isValidEmail(value)) {
                errorMessage = 'Please enter a valid email address.';
                isValid = false;
            }
            break;
            
        case 'username':
            if (!value) {
                errorMessage = 'Please choose a username.';
                isValid = false;
            }
            break;
            
        case 'password':
            if (!value) {
                errorMessage = 'Please enter a password.';
                isValid = false;
            } else if (!isValidPassword(value)) {
                errorMessage = 'Password must be at least 6 characters long.';
                isValid = false;
            }
            break;
            
        case 'confirmPassword':
            const password = document.getElementById('password').value;
            if (!value) {
                errorMessage = 'Please confirm your password.';
                isValid = false;
            } else if (password !== value) {
                errorMessage = 'Passwords do not match.';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(fieldId, errorMessage);
    }
    
    return isValid;
}

function validateForm() {
    const fields = [
        'fullName',
        'email', 
        'username',
        'password',
        'confirmPassword'
    ];
    
    let isValid = true;
    
    fields.forEach(fieldId => {
        if (!validateField(fieldId)) {
            isValid = false;
        }
    });
    
    return isValid;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    showMessage('', '');

    if (!validateForm()) {
        showMessage('Please fix the errors above.', 'danger');
        return;
    }

    if (userExists(username, email)) {
        showMessage('Username or email already exists.', 'danger');
        return;
    }

    function generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    // Creat new user
    const newUser = {
        id: generateUserId(),
        fullName,
        email,
        username,
        password,
        createdAt: new Date().toISOString()
    };

    const users = getUsers();
    users.push(newUser);
    saveUsers(users);

    showMessage('Account created successfully! Redirecting to login...', 'success');

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
});

resetBtn.addEventListener('click', () => {
    form.reset();
    
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        const fieldId = input.id;
        clearFieldError(fieldId);
    });
    
    showMessage('Form has been cleared!', 'success');
});

function showMessage(text, type) {
    errorBox.textContent = text;
    errorBox.className = `mt-3 ${type === 'danger' ? 'text-danger' : 'text-success'}`;
    errorBox.style.display = text ? 'block' : 'none';
}

// Special real-time validation for confirmPassword
document.getElementById('password').addEventListener('input', function() {
    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword.value) {
        validateField('confirmPassword');
    }
});

document.getElementById('confirmPassword').addEventListener('input', function() {
    if (this.value) {
        validateField('confirmPassword');
    }
});

setupRealTimeValidation();

// Spinner for submit button
let isSubmitting = false;

form.addEventListener('submit', function(e) {
    if (isSubmitting) return;
    
    const submitBtn = this.querySelector('button[type="submit"]');
    
    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Creating Account...
    `;

    setTimeout(() => {
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Sign Up";
    }, 2000);
});