var body = document.querySelector('body');
var menuTrigger = document.querySelector('#toggle-main-menu-mobile');
var menuContainer = document.querySelector('#main-menu-mobile');
var hamburgerIcon = document.querySelector('.hamburger');
var parentMenu = document.querySelector('li.hasChild > a');

menuTrigger.onclick = function() {
  menuContainer.classList.toggle('open');
  hamburgerIcon.classList.toggle('is-active');
  body.classList.toggle('lock-scroll');
};

parentMenu.onclick = function(e) {
	e.preventDefault();
	e.stopPropagation();
	this.parentNode.classList.toggle('is-open');
}