$(document).ready(function() {
  $('.copy-btn').on('click', function() {
    const targetId = $(this).data('target');
    const textToCopy = $('#' + targetId).text();
    const $btn = $(this);

    // Copy to buffer
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Change icon and show tooltip
      $btn.html('✅ Copied!');
      const $tooltip = $('<span class="tooltip">Copied to clipboard!</span>');
      $btn.after($tooltip);

      // After 2 second: return 
      setTimeout(() => {
        $tooltip.fadeOut(400, function() { $(this).remove(); });
        $btn.html('📋 Copy');
      }, 2000);
    });
  });
});
