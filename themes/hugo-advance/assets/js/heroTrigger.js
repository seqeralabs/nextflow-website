// scroll down when clicking the arrow on a fullscreen hero image
var heroTrigger = document.getElementById('hero-anchor-trigger');
if (heroTrigger !== null) {
  heroTrigger.addEventListener('click', function(e) {
    var windowHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    console.log(windowHeight);
    window.scrollTo(0, windowHeight);
  });
}
