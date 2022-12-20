$(document).ready(function(){

var windowWidth = $('.soundBoxContainer').width();
var windowheight = $('.soundBoxContainer').height();

function randomNum(m,n){

  m = parseInt(m);
  n = parseInt(n);

  return Math.floor(Math.random()*(n-m+1)) + m;

}

for(var n = 1; n < 12; n++){

  var xPos = randomNum(1, windowWidth);
  var yPos = 80;

  $('.soundBoxContainer').append('<div class="soundBox-'+n+'" style="left: '+xPos+'px; top: '+yPos+'px;">'+n+'</div>' );
}


});
