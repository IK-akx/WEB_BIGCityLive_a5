document.addEventListener("DOMContentLoaded", function() {
    loadUserProfile();
    setupHeader();
});

function loadUserProfile() {
    const currentUserData = localStorage.getItem('currentUser');
    
    if (!currentUserData) {
        // Redirect to login if no user is logged in
        window.location.href = 'login.html';
        return;
    }
    
    const currentUser = JSON.parse(currentUserData);
    
    // Populate user information
    document.getElementById('userFullName').textContent = currentUser.fullName || 'Not specified';
    document.getElementById('userUsername').textContent = currentUser.username || 'Not specified';
    document.getElementById('userEmail').textContent = currentUser.email || 'Not specified';
    document.getElementById('userCity').textContent = 'Astana'; // Default city
    
    // Set member since date
    const memberSince = currentUser.createdAt ? new Date(currentUser.createdAt) : new Date();
    document.getElementById('userMemberSince').textContent = memberSince.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Set password display (masked by default)
    document.getElementById('passwordDisplay').value = '••••••••';
}

function togglePasswordVisibility() {
    const passwordDisplay = document.getElementById('passwordDisplay');
    const toggleButton = document.querySelector('.btn-toggle-password');
    const currentUserData = localStorage.getItem('currentUser');
    
    if (!currentUserData) return;
    
    const currentUser = JSON.parse(currentUserData);
    
    if (passwordDisplay.type === 'password') {
        // Show password
        passwordDisplay.type = 'text';
        passwordDisplay.value = currentUser.password || 'No password set';
        toggleButton.textContent = '🙈 Hide';
        toggleButton.style.background = '#dc3545';
    } else {
        // Hide password
        passwordDisplay.type = 'password';
        passwordDisplay.value = '••••••••';
        toggleButton.textContent = '👁️ Show';
        toggleButton.style.background = '#6c757d';
    }
}

function setupHeader() {
    const currentUserData = localStorage.getItem('currentUser');
    const currentUser = currentUserData ? JSON.parse(currentUserData) : null;

    const desktopNavActions = document.getElementById("desktopNavActions");
    const mobileNavActions = document.getElementById("mobileNavActions");

    function renderUserArea(container) {
        if (!container) return;
        container.innerHTML = `
            <div class="d-flex align-items-center justify-content-center">
                <img src="https://www.manageengine.com/images/speaker-placeholder.png" alt="Profile" width="40" height="40" class="rounded-circle me-2 border border-light">
                <span class="fw-semibold me-2">${currentUser.fullName || currentUser.username}</span>
                <button class="btn btn-outline-light btn-sm logoutBtn">Log out</button>
            </div>
        `;
    }

    if (currentUser) {
        if (desktopNavActions) {
            renderUserArea(desktopNavActions);
        }

        if (mobileNavActions) {
            mobileNavActions.innerHTML = `
                <div>
                    <div class="d-flex align-items-center justify-content-center">
                        <img src="https://www.manageengine.com/images/speaker-placeholder.png" alt="Profile" width="34" height="34" class="rounded-circle me-2 border border-light">
                        <span class="fw-semibold me-2">${currentUser.fullName || currentUser.username}</span>
                        <button class="btn btn-outline-light btn-sm logoutBtn">Log out</button>
                    </div>
                </div>
            `;
        }

        document.querySelectorAll(".logoutBtn").forEach(btn => {
            btn.addEventListener("click", function() {
                localStorage.removeItem("currentUser");
                window.location.href = "../index.html";
            });
        });
    } else {
        // If no user is logged in, show login/signup buttons
        if (desktopNavActions) {
            desktopNavActions.innerHTML = `
                <a class="nav-link btn btn-outline-light me-2" href="login.html">Sign In</a>
                <a class="nav-link btn btn-warning text-dark" href="signup.html">Sign Up</a>
            `;
        }
    }
}

// Function to handle photo change (placeholder for future implementation)
function changeProfilePhoto() {
    alert('Profile photo change functionality will be implemented soon!');
}

// Add event listener for change photo button
document.querySelector('.btn-change-photo')?.addEventListener('click', changeProfilePhoto);