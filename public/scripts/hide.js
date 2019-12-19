$(document).ready(function () {
  $("#new-tweet").hide(200);
  $("#write-new-tweet").on('click', function () {
    $("#new-tweet").slideToggle(function() {
      $('.text-area').focus();
    });
  })
});