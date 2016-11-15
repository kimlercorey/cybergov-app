/**
 * Run these on page load
 */
$( document ).ready(function() {

  /**
   * Toggle off-canvas z-index to avoid hidden alerts
   */
  $( 'body' ).on( 'opened.zf.offcanvas', function() {
    $( '#offCanvasRight' ).addClass( 'opened' );
  });
  $( 'body' ).on( 'closed.zf.offcanvas', function() {
    window.setTimeout( function() {
      $( '#offCanvasRight' ).removeClass( 'opened' );
    }, 500 );
  });

} );
