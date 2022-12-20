
class Drop {
  constructor(){
    this.x = Math.floor(Math.random() * 900);
    this.y = 0;
    this.accel = 10;
    this.speed = 1;
    this.lastTime = millis();
  }

  update(){
    this.y = this.y + this.speed;
    var now = millis();
    this.speed = this.speed + ((now - lastTime) / 1000) * 1.5;
  }

  isDead(){
    return this.y > 500;
  }

  draw() {
    fill(0);
    ellipse(this.x, this.y, 30, 30);
  }
}

var drops = [];
var sounds = [];
var backgroundVal = 255;
var lastTime;
var reverb;

function setup() {
  canvas = createCanvas(900,500);
  canvas.parent('sketch-holder');
  lastTime = millis();
  sound_a = loadSound("https://cdn.glitch.com/2639a924-90bb-481b-9e69-394c0edcf51d%2Fpiano-a.wav?1494393052546");
  sound_a.disconnect();
  sound_c = loadSound("https://cdn.glitch.com/2639a924-90bb-481b-9e69-394c0edcf51d%2Fpiano-c.wav?1494393052713");
  sound_c.disconnect();
  sound_d = loadSound("https://cdn.glitch.com/2639a924-90bb-481b-9e69-394c0edcf51d%2Fpiano-d.wav?1494393052961");
  sound_d.disconnect();
  sound_g = loadSound("https://cdn.glitch.com/2639a924-90bb-481b-9e69-394c0edcf51d%2Fpiano-g.wav?1494393053037");
  sound_g.disconnect();
  reverb = new p5.Reverb();
  reverb.process(sound_a, 2, 10);
  reverb.process(sound_c, 2, 10);
  reverb.process(sound_d, 2, 10);
  reverb.process(sound_g, 2, 10);
  //sound_a.preload();
  sounds = [sound_a, sound_c, sound_d, sound_g];
  //  sound_a.play();
}

function draw() {
  background(backgroundVal);

  for(var i = 0; i < drops.length; i++){
    drops[i].draw();
    drops[i].update();
  }

  var now = millis();
  if(Math.random() * 30 < ((now - lastTime)/1000)){
    lastTime = now;
    drops.push(new Drop());
  }

  // reap
  var allClean = false;
  while(!allClean){
    allClean = true;
    for(var i = 0; i < drops.length; i++){
      if(drops[i].isDead()){
        allClean = false;
        drops.splice(i, 1);
        backgroundVal = 230 + Math.floor(Math.random() * 20);

        sounds[Math.floor(Math.random() * 4)].play();
        continue;
      }
    }
  }


}

// Add a new boid into the System
function mouseDragged() {

}
