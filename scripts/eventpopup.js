// popup.js

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("ticketModal");
  const openBtn = document.querySelector(".ticket-info .btn"); 
  const closeBtn = document.querySelector(".close");
  const form = document.getElementById("ticketForm");

  // Open window
  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
  });

  // Close by x
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close by click on the space
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Form Validation 
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {
      alert("Please fill in all fields.");
      return;
    }

    alert(`Thank you, ${name}! Your ticket has been reserved.`);
    form.reset();
    modal.style.display = "none";
  });
});
