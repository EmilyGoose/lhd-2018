function save_options() {
  var percentage = document.getElementById('percent').value;
  var lines = [];
 $.each($('websites').val().split(/\n/), function(i, line){
   if(line && line.length){
      lines.push(line);
   }
});
   function() {

    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 0);
  });
}


function restore_options() {

  chrome.storage.sync.get({
    favoriteColor: 'red',
    likesColor: true
  }, function(items) {
  });

}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
