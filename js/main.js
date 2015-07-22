$(document).ready(function() {

  // your jQuery should all go in this document.ready block 
  $('.btn-container button').on('click', function(event) {
    // hides button, remember that this refers to the element that the handler is registered for
    $('.btn-container').css('display', 'none');
    // displays instructions with an animation
    $('.instructions').slideDown('slow');
  })

});