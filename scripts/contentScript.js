let madlibRequest = []; //List of words to fill in
let replacements = [];
let newWord = "HELP";
let nouns = 0;
let verbs = 0;
let verbing = 0;
let adjectives = 0;
let properNouns = 0;

$(document).ready(function () {
    $("body").append(`
    <div id="myModal" class="modal">

      <div class="modal-content">
        <span class="close">&times;</span>
        <p>Some text in the Modal..</p>
      </div>

    </div>
  `);

    // Get the modal
    let span = $(".close");

    span.click(function () {
        $("#myModal").css('display', 'none');
    });
});

//Message from popup
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        console.log(message);
        console.log(sender);
        if(message.type === "newMadLib") {
            $("#myModal").css('display', 'inline-block');
            console.log(madlibRequest);

            sendResponse(madlibRequest);
        }
    }
);

$("p").each(function () {
    //console.log($(this).text().split(' '));
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
                        madlibRequest.push("noun");
                    } else if (partOfSpeech == "JJ") {
                        //Adjective
                        newWords.push("_adjectivePlaceholder");
                        adjectives++;
                        madlibRequest.push("adjective");
                    } else if (partOfSpeech == "VBG") {
                        //Verb ending in ING
                        newWords.push("_verbIngPlaceholder");
                        verbing++;
                        madlibRequest.push("verbing");
                    } else if (partOfSpeech == "VB") {
                        //Verb
                        newWords.push("_verbPlaceholder");
                        verbs++;
                        madlibRequest.push("verb");
                    } else if (partOfSpeech == "NNP") {
                        //Proper noun
                        newWords.push("_properNounPlaceholder");
                        properNouns++;
                        madlibRequest.push("properNoun");
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

});
console.log("NOUNS: " + nouns);
console.log("PROPERNOUNS: " + properNouns);
console.log("VERBS: " + verbs);
console.log("VERBINGS: " + verbing);
console.log("ADJECTIVES: " + adjectives);
console.log(madlibRequest);
