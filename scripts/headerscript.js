document.addEventListener("DOMContentLoaded", function() {
  const username = localStorage.getItem("username");
  const navActions = document.querySelector(".navbar-nav.ms-auto");

  if (username && navActions) {
    navActions.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="../images/profile.png" alt="Profile" width="40" height="40" class="rounded-circle me-2 border border-light">
        <span class="text-white fw-semibold me-3">${username}</span>
        <button id="logoutBtn" class="btn btn-outline-light btn-sm">Log out</button>
      </div>
    `;

    document.getElementById("logoutBtn").addEventListener("click", function() {
      localStorage.removeItem("username");
      window.location.reload();
    });
  }
});
