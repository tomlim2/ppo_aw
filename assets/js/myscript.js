$(document).ready(function(){
  var windowWidth = $(window).width();
	var windowHeight = $(window).height();

  function randomNum(m,n) {
		m = parseInt(m);
		n = parseInt(n);

		return Math.floor( Math.random() * (n - m + 1) ) + m;
	};


  $(window).scroll(function(){
    var num = $(window).scrollTop();
    $(".hero-img").css({
      "transform": "translateY(" + Math.max(- num, -200) + "px)",
      });
  });

  var scrlls1img= 0;

  $(window).scroll(function(){
    var num = $(window).scrollTop();
      if(num>scrlls1img){
        $(".headerNav").addClass("fixed");
      }else{
        $(".headerNav").removeClass("fixed");
      }
    });

  $( "#logo" ).click(function() {
    $('.about-section').toggleClass('about-open');
  });

});
