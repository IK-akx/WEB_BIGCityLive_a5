// header 
document.addEventListener("DOMContentLoaded", function() {
  const username = localStorage.getItem("username");
  const navActions = document.querySelector(".navbar-nav.ms-auto");

  if (username && navActions) {
    navActions.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="images/profile.png" alt="Profile" width="40" height="40" class="rounded-circle me-2 border border-light">
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
      e.target.textContent = isHidden ? "Read Less" : "Read More";
    });
  });
});



