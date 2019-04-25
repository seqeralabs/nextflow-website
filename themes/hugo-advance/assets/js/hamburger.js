var body = document.querySelector('body');
var menuTrigger = document.querySelector('#toggle-main-menu-mobile');
var menuContainer = document.querySelector('#main-menu-mobile');
var hamburgerIcon = document.querySelector('.hamburger');

menuTrigger.onclick = function() {
  menuContainer.classList.toggle('open');
  hamburgerIcon.classList.toggle('is-active');
  body.classList.toggle('lock-scroll');
};
