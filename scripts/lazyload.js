$(document).ready(function() {
  function lazyLoadImages() {
    $('.lazy').each(function() {
      const $img = $(this);
      const imgTop = $img.offset().top;
      const scrollBottom = $(window).scrollTop() + $(window).height();

      // Check the photo
      if (imgTop < scrollBottom) {
        const realSrc = $img.attr('data-src');
        if (realSrc) {
          $img.attr('src', realSrc)
              .hide()
              .fadeIn(600);
          $img.removeAttr('data-src');
        }
      }
    });
  }

  // Check through load and scroll
  $(window).on('scroll', lazyLoadImages);
  lazyLoadImages();
});
