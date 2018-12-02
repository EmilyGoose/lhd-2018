let madlibRequest = []; //List of words to fill in
let replacements = [];
let newWord = "HELP";
let nouns = 0;
let verbs = 0;
let verbing = 0;
let adjectives = 0;
let properNouns = 0;
let newWords = [];
let wordType = [];
let counter = 0;
let i = 0;

$(document).ready(function () {
    $("body").append(`
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h1 style="font-family: 'Roboto Slab'">Madlibify</h1>
        <p style="font-family: 'Roboto'" id="prompt"></p>
        <input style="font-family: 'Roboto'" type="text" id="answer">
        <button style="font-family: 'Roboto'" id="nextCust"> Next </button>
      </div>
    </div>`);

    //next
    $("#nextCust").click(function(){
      let answer = $("#answer").val();
      newWords.push(answer);
      console.log(answer);
      i++;
      if(i < madlibRequest.length){
        $("#prompt").text("Enter a " + madlibRequest[i] + "...");
        $("#answer").val('');
      } else {
        console.log(newWords);
          $("p").each(function () {
              let words = $(this).text().split(' ');
              for (let i = 0; i < words.length; i++) {
                  if (words[i].includes("_noun") || words[i].includes("_verb") || words[i].includes("_verbIng") || words[i].includes("_properNoun") || words[i].includes("_adjective")) {
                      words[i] = "<span style='color:red'; font-family: 'Delius', cursive;>" + newWords[0] + "</span>";
                      newWords.shift();
                  }
              }
              $(this).html(words.join(" "));
          });
        $("#prompt").text("Your madlibs has been completed!");
        $("#answer").css('display', 'none');
        $("#nextCust").css('display', 'none');

        $("#myModal").css('display', 'none');
        newWords = [];
      }

    });

    //Enter submits button
    $(document).keypress(function(e) {
      if(e.which == 13 && $("#myModal").css('display') != 'none') {
          $("#nextCust").click();
      }
  });
});

//Message from popup
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        if(message.type === "newMadLib") {

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

            $("#myModal").css('display', 'inline-block');
            //console.log(madlibRequest);

            i = 0;
            $("#prompt").text("Enter a " + madlibRequest[i] + "...");

            let message = "Popup Created!";
            sendResponse(message);
        }
    }
);
