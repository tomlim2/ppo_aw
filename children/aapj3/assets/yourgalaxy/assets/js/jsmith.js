(function(){

  /* init this trash */

  var $window = $(window);
  var $canvas = $('<canvas id="chill-vibes" width="' + $window.width() + '" height="' + $window.height() + '">Your browser doesn\'t support canvas. Boo-hiss.</canvas>');
  $('body').prepend($canvas);
  var ctx = $canvas[0].getContext('2d');

  ctx.font="40px monospace";
  var gradient=ctx.createLinearGradient(0,0,$canvas.width(),0);
  gradient.addColorStop("0","#83AF9B");
  gradient.addColorStop("0.5","#A7DBD8");
  gradient.addColorStop("1.0","#FA6900");
  ctx.fillStyle='white';
  ctx.fillText("press j until the smiths",30,300);


  /* helpers to randomize */

  var getRandomNumber = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomPosition = function(){
    var pos = {
      x: getRandomNumber(0, $window.width()),
      y: getRandomNumber(0, $window.height())
    };

    return pos;
  };

  var getRandomColor = function(){

    var color = ["#69D2E7","#A7DBD8","#E0E4CC","#F38630","#FA6900"];
    var color2 = ["#FE4365","#FC9D9A","#F9CDAD","#C8C8A9","#83AF9B"];
    var randomColor = Math.floor(Math.random() * 5);
    // var color = {
    //   r: getRandomNumber(0, 255),
    //   g: getRandomNumber(0, 255),
    //   b: getRandomNumber(0, 255)
    // };

    return color2[randomColor];
  };



  /* helpers to draw */

  var drawRandomRectangle = function(){
    var pos = getRandomPosition();
    var width = getRandomNumber(1,200);
    var height = getRandomNumber(1,200);

    ctx.beginPath();
    ctx.fillStyle = getRandomColor();
    ctx.rect(pos.x, pos.y, width, height);
    ctx.fill();
  };

  var drawRandomArc = function(){
    var pos = getRandomPosition();
    var radiusX = getRandomNumber(1,200);
    var radiusY = getRandomNumber(1,200);

    ctx.beginPath();
    ctx.fillStyle = getRandomColor();
    ctx.arc(pos.x, pos.y, radiusX, radiusY, 360, 0, 2 * Math.PI);
    ctx.fill();
  };

  var drawRandomImage = function(){
    console.log('img');
  };

  var drawRandomThing = function(){
    var rand = getRandomNumber(0, 1);
    switch( rand ){
      case 0: drawRandomRectangle();
              break;
      case 1: drawRandomArc();
              break;
      case 2: drawRandomLine();
              break;
      case 3: drawRandomImage();
              break;
    }
  };

  var draw = function() {
    drawVisual = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);

    drawRandomThing();
  };



  /* AUDIO GARBAGE */

  var loadAudio = function(url) {
    var request = new XMLHttpRequest();
    request.open('GET', audioURL, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
      audioCtx.decodeAudioData(request.response, function(buffer) {
        midiBuffer = buffer;
      });
    }
    request.send();
  }

  var onKeyDown = function(e){
    switch (e.keyCode) {
      case 74: // j
          playSong();
          break;
    }
  };

  var playSong = function(){
    if ( midiBuffer && !playSound ) {
      playSound = audioCtx.createBufferSource();
      playSound.buffer = midiBuffer;
      playSound.connect(audioCtx.destination);
      playSound.start(0);

      playSound.connect(analyser);

      analyser.fftSize = 2048;
      dataArray = new Uint8Array(analyser.fftSize);
      analyser.getByteTimeDomainData(dataArray);

      draw();
    }

  };


  /* LET'S MAKE SOME GARBAGE ART */

  var playSound, dataArray;
  var midiBuffer = null;
  var audioURL = 'https://cdn.glitch.com/5112be86-af43-4967-8d38-be0c9b610868%2Fcharmingman.mp3';

  // web audio api turn upppp
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioCtx = new AudioContext();
  var analyser = audioCtx.createAnalyser();

  loadAudio(audioURL);
  window.addEventListener("keydown",onKeyDown);

})()
