// FAQ Accordion Script
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      faqItems.forEach(i => i !== item && i.classList.remove("active"));

      item.classList.toggle("active");
    });
  });
});



// ===== READ MORE BUTTONS =====
document.addEventListener("DOMContentLoaded", () => {
  const readMoreLinks = document.querySelectorAll(".read-more");

  readMoreLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const cardText = e.target.closest(".card-text");
      const extraText = cardText.querySelector(".extra-text");

      const isHidden = extraText.style.display === "none";

      extraText.style.display = isHidden ? "block" : "none";
      e.target.textContent = isHidden ? "Less" : "Read More";
    });
  });
});



document.addEventListener("DOMContentLoaded", function() {
    const currentUserData = localStorage.getItem('currentUser');
    const currentUser = currentUserData ? JSON.parse(currentUserData) : null;

    const desktopNavActions = document.getElementById("desktopNavActions");
    const mobileNavActions = document.getElementById("mobileNavActions");
    const mobileMenuSelect = document.getElementById("mobileMenuSelect");

    function updateMobileMenuForLoggedInUser() {
        if (!mobileMenuSelect) return;
        
        // Remove existing auth options
        const options = mobileMenuSelect.options;
        for (let i = options.length - 1; i >= 0; i--) {
            if (options[i].value === "pages/login.html" || options[i].value === "pages/signup.html") {
                mobileMenuSelect.remove(i);
            }
        }
        
        // Add "My Account" option
        const myAccountOption = new Option("My Account", "pages/profile.html");
        mobileMenuSelect.add(myAccountOption);
        
        // Add logout option
        const logoutOption = new Option("Log Out", "#logout");
        mobileMenuSelect.add(logoutOption);
        
        // Update the change handler to handle logout
        mobileMenuSelect.onchange = function() {
            if (this.value === "#logout") {
                localStorage.removeItem("currentUser");
                window.location.reload();
            } else {
                window.location.href = this.value;
            }
        };
    }

    function updateMobileMenuForGuest() {
        if (!mobileMenuSelect) return;
        
        // Ensure Sign In and Sign Up options are present
        let hasSignIn = false;
        let hasSignUp = false;
        
        for (let option of mobileMenuSelect.options) {
            if (option.value === "pages/login.html") hasSignIn = true;
            if (option.value === "pages/signup.html") hasSignUp = true;
        }
        
        if (!hasSignIn) {
            const signInOption = new Option("Sign In", "pages/login.html");
            mobileMenuSelect.add(signInOption);
        }
        
        if (!hasSignUp) {
            const signUpOption = new Option("Sign Up", "pages/signup.html");
            mobileMenuSelect.add(signUpOption);
        }
        
        // Reset to default change handler
        mobileMenuSelect.onchange = function() {
            if (this.value && this.value !== "#logout") {
                window.location.href = this.value;
            }
        };
    }

    function renderUserArea(container) {
        if (!container) return;
        container.innerHTML = `
            <div class="d-flex align-items-center justify-content-center">
                <a href="pages/profile.html" class="d-flex align-items-center text-decoration-none text-light me-3 profile-link">
                    <img src="${currentUser.profileImage || 'https://www.manageengine.com/images/speaker-placeholder.png'}" 
                         alt="Profile" 
                         width="40" 
                         height="40" 
                         class="rounded-circle me-2 border border-light profile-image">
                    <span class="fw-semibold profile-username">${currentUser.fullName || currentUser.username}</span>
                </a>
                <button class="btn btn-outline-light btn-sm logoutBtn">Log out</button>
            </div>
        `;
    }

    function renderDesktopUserArea() {
        if (!desktopNavActions) return;
        desktopNavActions.innerHTML = `
            <div class="d-flex align-items-center">
                <a href="pages/profile.html" class="d-flex align-items-center text-decoration-none text-light me-3 profile-link">
                    <img src="${currentUser.profileImage || 'https://www.manageengine.com/images/speaker-placeholder.png'}" 
                         alt="Profile" 
                         width="36" 
                         height="36" 
                         class="rounded-circle me-2 border border-light profile-image">
                    <span class="fw-semibold profile-username">${currentUser.fullName || currentUser.username}</span>
                </a>
                <button class="btn btn-outline-light btn-sm logoutBtn">Log out</button>
            </div>
        `;
    }

    if (currentUser) {
        // User is logged in
        if (desktopNavActions) {
            renderDesktopUserArea();
        }

        if (mobileNavActions) {
            mobileNavActions.innerHTML = `
                <div class="d-flex align-items-center justify-content-center">
                    <a href="pages/profile.html" class="d-flex align-items-center text-decoration-none text-light me-3 profile-link mb-2">
                        <img src="${currentUser.profileImage || 'https://www.manageengine.com/images/speaker-placeholder.png'}" 
                             alt="Profile" 
                             width="34" 
                             height="34" 
                             class="rounded-circle me-2 border border-light profile-image">
                        <span class="fw-semibold profile-username">${currentUser.fullName || currentUser.username}</span>
                    </a>
                </div>
                <button class="btn btn-outline-light btn-sm w-100 logoutBtn">Log out</button>
            `;
        }

        // Update mobile dropdown menu
        updateMobileMenuForLoggedInUser();

        addProfileLinkStyles();

        // Add logout functionality
        document.querySelectorAll(".logoutBtn").forEach(btn => {
            btn.addEventListener("click", function() {
                localStorage.removeItem("currentUser");
                window.location.reload();
            });
        });

    } else {
        // User is not logged in - ensure mobile menu shows Sign In/Sign Up
        updateMobileMenuForGuest();
    }
});

function addProfileLinkStyles() {
    if (document.querySelector('.profile-link-styles')) return;
    
    const style = document.createElement('style');
    style.className = 'profile-link-styles';
    style.textContent = `
        .profile-link {
            transition: all 0.3s ease;
            border-radius: 20px;
            padding: 5px 10px;
        }
        
        .profile-link:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-1px);
        }
        
        .profile-image {
            transition: transform 0.3s ease;
        }
        
        .profile-link:hover .profile-image {
            transform: scale(1.1);
        }
        
        .profile-username {
            transition: color 0.3s ease;
        }
        
        .profile-link:hover .profile-username {
            color: #ffd700 !important;
        }
        
        /* Mobile-specific styles */
        @media (max-width: 991px) {
            .profile-link {
                padding: 8px 12px;
            }
            
            .profile-username {
                font-size: 0.9rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// Theme Toggle (Day/Night)
const themeToggleBtn = document.getElementById('themeToggleBtn');
const clickSound = new Audio('sounds/click1.wav'); 

// Check theme in localStorage
let savedTheme = localStorage.getItem('theme');

if (savedTheme === 'night') {
  document.body.classList.add('night-theme');
  document.body.classList.remove('day-theme');
  if (themeToggleBtn) themeToggleBtn.textContent = "☀️";
} else {
  document.body.classList.add('day-theme');
  document.body.classList.remove('night-theme');
  if (themeToggleBtn) themeToggleBtn.textContent = "🌙";
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
      themeToggleBtn.textContent = "☀️";
      localStorage.setItem('theme', 'night');
    } else {
      // day
      document.body.classList.add('day-theme');
      document.body.classList.remove('night-theme');
      themeToggleBtn.textContent = "🌙";
      localStorage.setItem('theme', 'day');
    }
  });
}
