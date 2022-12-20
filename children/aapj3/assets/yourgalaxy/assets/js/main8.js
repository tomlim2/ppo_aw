
$(document).ready(function(){

  


  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });

  $("#clickHere").click(function(){

    $('.namescreen').hide();

  });

  document.getElementById('date').value = Date();










});
