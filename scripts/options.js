$("#add-link").click(function() {
    let linkInput = $("#link-input");
    let newLink = linkInput.val();

    linkInput.val("");

    chrome.storage.local.get({links: []}, function(result) {
        console.log("Result: ");
        console.log(result.valueOf());
        let linkList = result.links;
        console.log(linkList);
        linkList.push(newLink);
        chrome.storage.local.set({links: linkList}, function() {
            console.log('Value is set to ' + linkList);
        });
    });


});

chrome.storage.onChanged.addListener(function(changes, namespace){
    if ("links" in changes) {
        let newLinkList = changes["links"].newValue;
        console.log(newLinkList);
        console.log(newLinkList.length);
        for (let i = 0; i < newLinkList.length; i++) {
            $("#link-list").append("<p>" + newLinkList[i] + "</p>");
        }
    }
});
