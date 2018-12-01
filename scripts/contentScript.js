let madlibRequest = [];
let replacements = [];
let newWord = "HELP";
let nouns = 0;
let verbs = 0;
let verbing = 0;
let adjectives = 0;
let properNouns = 0;

$(document).ready(function () {
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

    btn.click(function () {
        modal.css('display', 'inline-block');
    });
    span.click(function () {
        modal.css('display', 'none');
    });
});

$("p").each(function () {
    console.log($(this).text().split(' '));
    let txt = $(this).text();
    let element = $(this);
    $.ajax({
        type: "POST",
        url: "https://text-processing.com/api/tag/",
        data: {text: txt},
        async: false
    }).done(function (result) {
        let words = result.text.split(" ");
        let newWords = [];
        for (let i = 0; i < words.length; i++) {
            if (words[i].includes("/")) {
                let wordSplit = words[i].trim().split("/");
                let originalWord = wordSplit[0];
                let partOfSpeech = wordSplit[1];
                if (partOfSpeech.includes(")")) {
                    partOfSpeech = partOfSpeech.slice(0, -2);
                }
                //console.log("Pre-split: " + words[i]);
                //console.log("Original word: " + originalWord);
                //console.log("Part of speech: " + partOfSpeech);
                if (Math.random() < 0.2) {
                    if (partOfSpeech == "NN") {
                        //Noun
                        newWords.push("_nounPlaceholder");
                        nouns++;
                    } else if (partOfSpeech == "JJ") {
                        //Adjective
                        newWords.push("_adjectivePlaceholder");
                        adjectives++;
                    } else if (partOfSpeech == "VBG") {
                        //Verb ending in ING
                        newWords.push("_verbIngPlaceholder");
                        verbing++;
                    } else if (partOfSpeech == "VB") {
                        //Verb
                        newWords.push("_verbPlaceholder");
                        verbs++;
                    } else if (partOfSpeech == "NNP") {
                        //Proper noun
                        newWords.push("_properNounPlaceholder");
                        properNouns++;
                    } else {
                        //console.log(partOfSpeech + " DID NOT MATCH ANYTHING");
                        newWords.push(originalWord);
                    }
                } else {
                    newWords.push(originalWord);
                }
            }
        }
        element.text(newWords.join(" "));
    });

    console.log("NOUNS: " + nouns);
    console.log("VERBS: " + verbs);
    console.log("VERBINGS: " + verbing);
    console.log("ADJECTIVES: " + adjectives);
    console.log("PROPERNOUNS: " + properNouns);
    // //Run through each word
    // for (let i = 0, len = words.length; i < len; ++i) {
    //     //Random chance of checking:
    //     if (Math.random() < 0.05) {
    //         words[i] = "{{RANDOM PLACEHOLDER FOR:" + words[i] + "}}";
    //         replacements.push(i);
    //     }
    //     //Check for numbers
    //     if ($.isNumeric(words[i])) {
    //         console.log("is NUMBER");
    //         //Replaces numbers with a placeholder text
    //         words[i] = "{{NUMBER PLACEHOLDER FOR:" + words[i] + "}}";
    //     }
    //     /*
    //     if (wordIsValid) {
    //         if (Math.random() < chance) {
    //             madlibRequest.push(word.type());
    //         }
    //     }
    //      */
    // }
    // for (let i = 0, len = replacements.length; i < len; ++i) {
    //     words[replacements[i]] = newWord;
    // }
    /*
    $(words).each(function () {
        //Check for numbers
        if ($.isNumeric(this)) {
            console.log("is NUMBER");
        }
    });
    */
    //Set p text content
});


/*Pseudocode to replace words in doc:
for (word in wordReplacements) {
    indexOfReplacement = words.indexOf("{{RANDOM_PLACEHOLDER")
    words[indexOfReplacement] = word;
}
 */
