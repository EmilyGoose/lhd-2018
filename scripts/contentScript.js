

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