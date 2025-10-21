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



