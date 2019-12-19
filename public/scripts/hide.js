$(document).ready(function () {
  //hides new tweet box until click-toggles it
  $("#new-tweet").hide(200);
  $("#write-new-tweet").on('click', function () {
    $("#new-tweet").slideToggle(function() {
      $('.text-area').focus();
    });
  })
});