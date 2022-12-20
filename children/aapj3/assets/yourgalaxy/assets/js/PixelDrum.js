var audio = new AudioContext();

function createSineWave(audio, duration){
 var oscillator = audio.createOscillator();
 oscillator.type = "sine";

 oscillator.start(audio.currentTime);
 oscillator.stop(audio.currentTime + duration);

 return oscillator;
};

function rampDown(audio, item, startValue, duration){
  item.setValueAtTime(startValue, audio.currentTime);
  item.exponentialRampToValueAtTime(0.01, audio.currentTime + duration);
}

function createAmplifier(audio, startValue, duration){
  var amplifier = audio.createGain();
  rampDown(audio, amplifier.gain, startValue, duration);
  return amplifier;
};

function chain(items) {
  for (var i = 0; i < items.length - 1; i++){
    items[i].connect(items[i + 1]);
  }
};

function note(audio, frequency){
  return function(){
    var duration = 1;
    var sineWave = createSineWave(audio, duration);
    sineWave.frequency.value = frequency;

    chain([sineWave,
            createAmplifier(audio, 0.2, duration),
            audio.destination
          ]);

  };
};

function kick(audio){
  return function(){
    var duration = 2;
    var sineWave = createSineWave(audio, duration);
    rampDown(audio, sineWave.frequency, 160, duration);

    chain([sineWave,
            createAmplifier(audio, 0.4, duration),
            audio.destination
          ]);

  };
};


function createTrack(color, playSound) {
  var steps = [];
  for (var i = 0; i < 16; i++) {
    steps.push(false);
  };

  return { steps: steps, color: color, playSound: playSound};
};



var BUTTON_SIZE = 26;
function buttonPosition(column, row) {
  return{
    x: BUTTON_SIZE / 2 + column * BUTTON_SIZE * 1,
    y: BUTTON_SIZE / 2 + row * BUTTON_SIZE * 1,
  };
};

function drawButton(screen, column, row, color) {
  var position = buttonPosition(column, row);
  screen.fillStyle = color;
  screen.fillRect(position.x, position.y, BUTTON_SIZE, BUTTON_SIZE);

};


// note(audio, 440)()

function drawTracks(screen, data) {
  data.tracks.forEach(function(track, row) {
    track.steps.forEach(function(on, column) {
      drawButton(screen,
                column,
                row,
                on ? track.color : "#beb7af");

    });
  });
};

function isPointInButton(p, column, row){
  var b = buttonPosition(column, row);
  return !(p.x < b.x ||
           p.y < b.y ||
           p.x > b.x + BUTTON_SIZE ||
           p.y > b.y + BUTTON_SIZE);
};


var data = {
  step:0,
  tracks:[createTrack('#a3d5d2', note(audio, 880)),
          createTrack('#7cd3cb', note(audio, 659)),
          createTrack('#1eb8c2', note(audio, 587)),
          createTrack('#1ba7a4', note(audio, 523)),
          createTrack('#129891', note(audio, 440)),
          createTrack("#0797d4", kick(audio))]
};

//update

setInterval(function(){
  data.step = (data.step + 1) % data.tracks[0].steps.length;

  data.tracks
    .filter(function(track) { return track.steps[data.step]; })
    .forEach(function(track) { track.playSound(); });

}, 100);

//draw

var screen = document.getElementById("screen").getContext("2d");

(function draw() {
  screen.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
  drawTracks(screen, data);
  drawButton(screen, data.step, data.tracks.length, "#ffe14b");

  requestAnimationFrame(draw);
})();

//handle evets

(function setupButtonClicking(){
  addEventListener("click", function(e){
    var p = { x: e.clientX, y: e.clientY};

    data.tracks.forEach(function(track, row) {
      track.steps.forEach(function(on, column) {
        if (isPointInButton(p, column, row)) {
          track.steps[column] = !on;
        }
      });
    });
  });
})();
