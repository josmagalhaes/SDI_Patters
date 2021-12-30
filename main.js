let num = 10;
let agents = [];
let is_pressed = false;

let epicenter;
let speechAgent;

let is_imagemode = false;
let is_jumpscare = false;
let is_cooldown = false;

let cooldown_timer;

let img;
let imgsource = "";
let widthfactor = 0.01;
let heightfactor = 0.007;


function setup() {
  createCanvas(windowWidth - 4, windowHeight - 4);

  speechAgent = new SpeechAgent();
  epicenter = new createVector(width / 2, height / 2);
}

function windowResized() {
  resizeCanvas(windowWidth - 4, windowHeight - 4);
  epicenter = new createVector(width / 2, height / 2);
}

function initialize() {
  if (agents.length == 0) {
    epicenter = new createVector(width / 2, height / 2);
    for (let i = 0; i < num; i++) {
      agents.push(new Agent());
    }
  }

}

function terminate() {
  if (is_imagemode) {
    is_imagemode = false;
    initialize();
  } else {
    agents = [];
  }

}

function triggercooldown(seconds) {
  cooldown_timer = seconds;
  is_cooldown = true;

}

function draw() {

  if (is_cooldown) {
    if (frameCount % 60 == 0 && cooldown_timer > 0) {
      cooldown_timer--;
    }
    fill(0, 60);
    noStroke()
    rect(0, 0, width, height)
    for (let i of agents) {
      i.updatecooldown();
    }

    if (cooldown_timer == 0) {
      is_cooldown = false;
    }

  } else {

    if (!is_imagemode) {
      fill(0, 60);
      noStroke()
      rect(0, 0, width, height)
      if (is_jumpscare) {
        for (let i of agents) {
          i.jumpscare();
        }
        is_jumpscare = false;
        triggercooldown(1);
      } else {
        for (let i of agents) {
          i.update();
        }
      }
    }

  }

  if (is_imagemode) {
    if (imgsource != "") {
      if (widthfactor > 0.005) {
        widthfactor = widthfactor - 0.0001;
      }
      if (heightfactor > 0.005) {
        heightfactor = heightfactor - 0.0001;
      }


      for (let i = 0; i < 1000; i++) {
        let x = int(random(width));
        let y = int(random(height));
        let col = img.get(x, y);
        col = color(red(col), green(col), blue(col), 120);

        let size = map(brightness(col), 0, 255, width * widthfactor, width * heightfactor);
        fill(col);
        noStroke();
        ellipse(x, y, size, size);


      }
    }
  }
}

function mousePressed() {
  is_pressed = true;
}

function mouseReleased() {
  is_pressed = false;
}

function imagemode(passStr) {
  is_imagemode = true;

  if (passStr != imgsource) {
    imgsource = passStr;
    img = loadImage(passStr);
  }

  img.resize(width, height);
}

function initImage(passStr) {
  //rezsizeCanvas
  var wRatio = img.width / windowWidth;
  var hRatio = img.height / windowHeight;

  if (wRatio < hRatio) resizeCanvas(int(img.width / hRatio), int(windowHeight));
  else resizeCanvas(int(windowWidth), int(img.height / wRatio));

}

/*For Testing Purposes Only*/
function mouseClicked() {
  console.log("click");
  
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

