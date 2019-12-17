$(document).ready(function() {
  console.log('working')
  $("#text-area").on("keyup", function () {
    let length = $(this).val().length;
    console.log(140 - length);
    console.log($(this).parent())
    if (length <= 140) {
      $(this).parent().children("span").text((140 - length));
    } else {
      $(this).parent().children("span").text(0);
      $(this).parent().children("span").css("background-color", "red");
    }
  })

});