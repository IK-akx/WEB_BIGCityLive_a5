document.addEventListener("DOMContentLoaded", function() {
  const username = localStorage.getItem("username");

  const desktopNavActions = document.querySelector(".navbar-nav.ms-auto.d-lg-flex, .navbar-nav.ms-auto.d-none.d-lg-flex");

  const mobileNavActions = document.getElementById("mobileNavActions");

  function renderUserArea(container) {
    if (!container) return;
    container.innerHTML = `
      <div class="d-flex align-items-center justify-content-center">
        <img src="https://www.manageengine.com/images/speaker-placeholder.png" alt="Profile" width="40" height="40" class="rounded-circle me-2 border border-light">
        <span class="fw-semibold me-2">${username}</span>
        <button class="btn btn-outline-light btn-sm logoutBtn">Log out</button>
      </div>
    `;
  }

  if (username) {
    if (desktopNavActions) {
      renderUserArea(desktopNavActions);
    }

    if (mobileNavActions) {
      mobileNavActions.innerHTML = `
        <div>
          <div class="d-flex align-items-center justify-content-center">
            <img src="https://www.manageengine.com/images/speaker-placeholder.png" alt="Profile" width="34" height="34" class="rounded-circle me-2 border border-light">
            <span class="fw-semibold me-2">${username}</span>
            <button class="btn btn-outline-light btn-sm logoutBtn">Log out</button>
          </div>
        </div>
      `;
    }

    document.querySelectorAll(".logoutBtn").forEach(btn => {
      btn.addEventListener("click", function() {
        localStorage.removeItem("username");
        window.location.reload();
      });
    });
  } 
});
