$(document).ready(function () {
  console.log('hide')
  $("#new-tweet").hide(200);
  $("#write-new-tweet").on('click', function () {
    $("#new-tweet").toggle(200);
  })
});