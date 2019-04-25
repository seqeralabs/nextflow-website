console.log('Work');

var grid = document.querySelector('.grid');
var msnry = new Masonry(grid, {
  // options
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true,
});

imagesLoaded(grid).on('progress', function() {
  // layout Masonry after each image loads
  msnry.layout();
});
