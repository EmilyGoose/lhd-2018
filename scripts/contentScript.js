$(document).ready(function(){
  $("body").append(`
    <button id="myBtn">Open Modal</button>

    <div id="myModal" class="modal">

      <div class="modal-content">
        <span class="close">&times;</span>
        <p>Some text in the Modal..</p>
      </div>

    </div>
  `);

  // Get the modal
  var modal = $("#myModal");
  var btn = $("#myBtn");
  var span = $(".close");

  btn.click(function() {
      modal.css('display', 'inline-block');
  });
  span.click(function() {
      modal.css('display', 'none');
  });
})



$("p").each(function() {
    console.log($(this).text().split(' '));
    let words = $(this).text().split(' ');
    //Run through each word
    $(words).each(function () {
        //Check for numbers
        if ($.isNumeric(this)) {
            console.log("NUMBER");
        }
    });
});
