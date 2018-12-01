let links = [];
$("#add-link").click(function() {
    let linkInput = $("#link-input");
    let newLink = linkInput.val();

    linkInput.val("");
    links.add(newLink);
    //Access the chrome storage

});

chrome.storage.onChanged.addListener(function(changes,){
  for(var i = 0; i<=links.length; i++){
    $("link-list").append{
        "
        <button class='remove-link' type='button' onclick='removeItemFromLinks("+id+")'>Remove</button>"

      }
  }();

});
