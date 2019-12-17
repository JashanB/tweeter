$(document).ready(function() {
  console.log('working')
  // $("#text-area").keyup(function () {
  //   console.log()
  // })
  $("#text-area").on("keyup", function () {
    let length = $("#text-area").val().length;
    console.log(length);
  })
});