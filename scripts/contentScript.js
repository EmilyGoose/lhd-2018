let madlibRequest = [];
let replacements = [];
let newWord = "HELP";

$("p").each(function() {
    console.log($(this).text().split(' '));
    let words = $(this).text().split(' ');
    //Run through each word
    for (let i = 0, len = words.length; i < len; ++i) {
        //Random chance of checking:
        if (Math.random() < 0.01) {
            words[i] = "{{RANDOM PLACEHOLDER FOR:" + words[i] + "}}";
            replacements.push(i);
        }
        //Check for numbers
        if ($.isNumeric(words[i])) {
            console.log("is NUMBER");
            //Replaces numbers with a placeholder text
            words[i] = "{{NUMBER PLACEHOLDER FOR:" + words[i] + "}}";
        }
        /*
        if (wordIsValid) {
            if (Math.random() < chance) {
                madlibRequest.push(word.type());
            }
        }
         */
    }
    for (let i = 0, len = replacements.length; i < len; ++i) {
        words[replacements[i]] = newWord;
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

/*Pseudocode to replace words in doc:
for (word in wordReplacements) {
    indexOfReplacement = words.indexOf("{{RANDOM_PLACEHOLDER")
    words[indexOfReplacement] = word;
}
 */