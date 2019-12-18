$(document).ready(function() {
  $("#text-area").on("keyup", function () {
    let length = $(this).val().length;
    $(this).parent().children("span").text((140 - length));
    if (length <= 140) {
      $(this).parent().children("span").css("background-color", "#f4f1ec");
    } else {
      $(this).parent().children("span").css("background-color", "red");
    }
  })

});