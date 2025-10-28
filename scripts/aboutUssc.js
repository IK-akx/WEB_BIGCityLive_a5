// Callback function to display feedback
function showResponseMessage(success, message) {
  const responseEl = document.getElementById('responseMessage');
  responseEl.textContent = message;
  responseEl.style.color = success ? 'green' : 'red';
}

$(document).ready(function() {
  console.log("jQuery is ready!");

  // Notification function
  function showToast(message, duration = 3000) {
  console.log("Toast called with message:", message);

  // chech the container
  let $container = $('#toastContainer');
    if ($container.length === 0) {
      // create if is not 
      $container = $('<div id="toastContainer"></div>');
      $('body').append($container);
    }

    // create the toast
    const $toast = $('<div class="toast" role="status" aria-live="polite"></div>').text(message);
    $container.append($toast);

    requestAnimationFrame(() => {
      $toast.addClass('show');
    });

    // delete by duration 
    setTimeout(() => {
      $toast.removeClass('show').addClass('hide');
      // delete element 
      $toast.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
        $(this).remove();
      });

      // fallback option
      setTimeout(() => $toast.remove(), 600);
    }, duration);
  }


  // Form Validation
  $('#contactForm').on('submit', function(event) {
    event.preventDefault();

    const form = $(this);
    const name = $('#name').val();
    const email = $('#email').val();
    const message = $('#message').val();

    // Show "Sending..."
    $('#responseMessage')
      .text('⏳ Sending your message...')
      .css('color', 'orange');

    // Simulation of message
    setTimeout(function() {
      console.log("Form data submitted:");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Message:", message);

      $('#responseMessage')
        .text('✅ Message sent successfully!')
        .css('color', 'green');

      // Show toast
      showToast('✅ Message sent successfully!');

      // Clear form
      form[0].reset();
    }, 1500);
  });
});
