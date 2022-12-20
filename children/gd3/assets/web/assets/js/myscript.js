$(document).ready(function() {


    $("#homeb").click(function() {
      $('html, body').animate({
        scrollTop: $("#homebx").offset().top
      }, 1000);
    });
    $("#adoptingb").click(function() {
      $('html, body').animate({
        scrollTop: $("#adoptingbx").offset().top
      }, 1000);
    });
    $("#eventb,#eventb2").click(function() {
      $('html, body').animate({
        scrollTop: $("#eventbx").offset().top
      }, 1000);
    });
    $("#oliviab").click(function() {
      $('html, body').animate({
        scrollTop: $("#aboutbx").offset().top
      }, 1000);
    });
    $("#timeb").click(function() {
      $('html, body').animate({
        scrollTop: $(".locationimg").offset().top
      }, 300);
    });

  var vip1= 100; //스크롤 위치값
  $(window).scroll(function(){
    var num=$(window).scrollTop();
      if(num<vip1){

        $("#homeb").css({"color": "#ec5432"});

      }else{
        $("#homeb").css({"color": "#414042"});

      }
    });


    var vip2= 100; //스크롤 위치값
    $(window).scroll(function(){
      var num=$(window).scrollTop();
        if(num>vip2){
          $(".mainnav").css({"padding-top": 24 + "px"});
          $(".bgmg").css({"height": 70 + "px"});

        }else{
          $(".mainnav").css({"padding-top": 54 + "px"});
          $(".bgmg").css({"height": 100 + "px"});


        }
      });

    var vip2= 100; //스크롤 위치값
    $(window).scroll(function(){
      var num=$(window).scrollTop();
        if(num>vip2){
          $("#adoptingb").css({"color": "#ec5432"});

        }else{
          $("#adoptingb").css({"color": "#414042"});

        }
      });

      var vip3= 1600; //스크롤 위치값
      $(window).scroll(function(){
        var num=$(window).scrollTop();
          if(num>vip3){
            $("#eventb").css({"color": "#ec5432"});
            $("#adoptingb").css({"color": "#414042"});

          }else{
            $("#eventb").css({"color": "#414042"});

          }
        });

        var vip4= 2400; //스크롤 위치값
        $(window).scroll(function(){
          var num=$(window).scrollTop();
            if(num>vip4){
              $("#oliviab").css({"color": "#ec5432"});
              $("#eventb").css({"color": "#414042"});

            }else{
              $("#oliviab").css({"color": "#414042"});

            }
          });

});
