// Callback function to display feedback
function showResponseMessage(success, message) {
  const responseEl = document.getElementById('responseMessage');
  responseEl.textContent = message;
  responseEl.style.color = success ? 'green' : 'red';
}

// Handle form submit (simulated asynchronous action)
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get data from form
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Show the "sending"
    showResponseMessage(false, '⏳ Sending your message...');
    setTimeout(() => {
      console.log("Form data submitted:");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Message:", message);

      // Call callback
      showResponseMessage(true, '✅ Message sent successfully!');
      form.reset();
    }, 1500);
  });
});
