

$("p").each(function() {
    console.log($(this).text().split(' '));
    let words = $(this).text().split(' ');
    //Run through each word
    for (let i = 0, len = words.length; i < len; ++i) {
        //Check for numbers
        if ($.isNumeric(words[i])) {
            console.log("is NUMBER");
            //Replaces numbers with a placeholder text
            words[i] = "{{NUMBER PLACEHOLDER}}";
        }
    }

    /*
    $(words).each(function () {
        //Check for numbers
        if ($.isNumeric(this)) {
            console.log("is NUMBER");
        }
    });
    */
    //Set p text content
    $(this).text(words.join(" "));
});