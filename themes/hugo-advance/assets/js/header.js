$(window).scroll(function() {
  // this will work when your window scrolled.
  var scroll = $(window).scrollTop(); //getting the scrolling height of window
  if (scroll > 100) {
    $('.header').addClass('header-scrolled');
  } else {
    $('.header').removeClass('header-scrolled');
  }
});
