document.addEventListener("DOMContentLoaded", function() {
    const currentUserData = localStorage.getItem('currentUser');
    const currentUser = currentUserData ? JSON.parse(currentUserData) : null;

    const desktopNavActions = document.querySelector(".navbar-nav.ms-auto.d-lg-flex, .navbar-nav.ms-auto.d-none.d-lg-flex");
    const mobileNavActions = document.getElementById("mobileNavActions");

    function renderUserArea(container) {
        if (!container) return;
        container.innerHTML = `
            <div class="d-flex align-items-center justify-content-center">
                <a href="../pages/profile.html" class="d-flex align-items-center text-decoration-none text-light me-3 profile-link">
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

    if (currentUser) {
        if (desktopNavActions) {
            renderUserArea(desktopNavActions);
        }

        if (mobileNavActions) {
            mobileNavActions.innerHTML = `
                <div>
                    <div class="d-flex align-items-center justify-content-center">
                        <a href="../pages/profile.html" class="d-flex align-items-center text-decoration-none text-light me-3 profile-link">
                            <img src="${currentUser.profileImage || 'https://www.manageengine.com/images/speaker-placeholder.png'}" 
                                 alt="Profile" 
                                 width="34" 
                                 height="34" 
                                 class="rounded-circle me-2 border border-light profile-image">
                            <span class="fw-semibold profile-username">${currentUser.fullName || currentUser.username}</span>
                        </a>
                        <button class="btn btn-outline-light btn-sm logoutBtn">Log out</button>
                    </div>
                </div>
            `;
        }

        // Добавляем hover эффекты через CSS
        addProfileLinkStyles();

        document.querySelectorAll(".logoutBtn").forEach(btn => {
            btn.addEventListener("click", function() {
                localStorage.removeItem("currentUser");
                window.location.reload();
            });
        });

        // Добавляем обработчики для профиля (опционально)
        document.querySelectorAll('.profile-link').forEach(link => {
            link.addEventListener('click', function(e) {
                // Можно добавить дополнительную логику здесь
                console.log('Navigating to profile...');
            });
        });
    } 
});

// Функция для добавления стилей hover
function addProfileLinkStyles() {
    const style = document.createElement('style');
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
    `;
    document.head.appendChild(style);
}