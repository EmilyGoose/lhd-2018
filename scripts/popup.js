$("#make-it-happen").click(function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type:"newMadLib"}, function(response){
      //console.log(response);
      $("body").append("<p>" + response + "</p>");
    });
  });
});
