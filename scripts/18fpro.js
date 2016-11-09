/**
 * FUNCTION: resize on-canvas block to height of larger off-canvas block to prevent scollbars in off-canvas blocks
 */
function resizeOffCanvas() {
  var onHeight = $('.off-canvas-content').outerHeight();
  var offHeightLeft = $('.off-canvas.position-left > div').outerHeight();
  var offHeightRight = $('.off-canvas.position-right > div').outerHeight();
  var offHeightMax = Math.max(offHeightLeft, offHeightRight);
  if (offHeightMax > onHeight) {
    $('.off-canvas-content').height(offHeightMax + 100);
  } else {
    $('.off-canvas-content').height('auto');
  }
}


/**
 * Run these on page load
 */
$( document ).ready(function() {

  /**
   * Initialize Foundation plugins after a short delay (change to fire on callback)
   */


  /**
   * Toggle hamburger menu animation state when clicked
   */
  $('.header-button > button').click(function(){
    $(this).toggleClass('open');
  });


  /**
   * Trigger resizeOffCanvas() function when window is resized
   */
  $( window ).resize(function() {
    resizeOffCanvas();
  });


  /**
   * Trigger resizeOffCanvas() function on page load
   */
  resizeOffCanvas();

} );
