$(document).ready(function() {
  $(window).on("scroll", function() {
    let scrollTop = $(window).scrollTop();
    let docHeight = $(document).height() - $(window).height();
    let scrollPercent = (scrollTop / docHeight) * 100;
    $("#scrollProgress").css("width", scrollPercent + "%");
  });
});
