const form = document.querySelector('.needs-validation');
const errorBox = document.getElementById('error-message');


form.addEventListener('submit', function(event) {

    // Prevent form from reloading the page before validation
    event.preventDefault(); 


    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    let errors = [];

    if (username === '') {
        errors.push('Enter your username.');
    }

    if (password === '') {
        errors.push('Enter your password.');
    } 
    else if (password.length < 6) {
        errors.push('The password must be at least 6 characters long.');
    }



    if (errors.length > 0) {
        errorBox.textContent = errors.join(' ');
        errorBox.classList.add('text-danger');
        errorBox.classList.remove('text-success');
        return;
    }

    localStorage.setItem('username', username);

    errorBox.textContent = 'Login successful!';
    errorBox.classList.remove('text-danger');
    errorBox.classList.add('text-success');

    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1000);

    
});
