let ladybug;
let trail = [];
let counter = 0;
let movementTimeout;
let showMessage = true;
let targetX, targetY;

function setup() {
  createCanvas(400, 400);
  ladybug = new Ladybug(width / 2, height / 2);

  movementTimeout = setTimeout(startLadybug, 2000); 
  targetX = ladybug.x;
  targetY = ladybug.y;
}

function draw() {
  background(255);

  if (showMessage) {
    showInstructionMessage();
  } else {
    ladybug.update();
    ladybug.display();

    createTrail();

    if (mouseX < ladybug.x + ladybug.size / 2 && mouseY < ladybug.y + ladybug.size / 2 && mouseX > ladybug.x - ladybug.size / 2 && mouseY > ladybug.y - ladybug.size / 2) {
      cursor('grab');
    } else {
      cursor(ARROW);
    }
  }
}

function showInstructionMessage() {
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Click the screen to guide the ladybug", width / 2, height / 2);
}

class Ladybug {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30;
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
  }

  update() {
    let dx = targetX - this.x;
    let dy = targetY - this.y;
    let distance = dist(this.x, this.y, targetX, targetY);

    if (distance > 1) {
      this.x += dx / 10;  
      this.y += dy / 10; 
    }

    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    this.y = constrain(this.y, this.size / 2, height - this.size / 2);
  }

  display() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size); 

    fill(0);
    ellipse(this.x - 8, this.y - 8, 8, 8); 
    ellipse(this.x + 8, this.y - 8, 8, 8); 
    ellipse(this.x, this.y + 8, 8, 8); 
  }
}

function createTrail() {
  trail.push(createVector(ladybug.x, ladybug.y));

  stroke(0, 255, 0); 
  strokeWeight(10);
  noFill();

  for (let i = 0; i < trail.length - 1; i++) {
    line(trail[i].x, trail[i].y, trail[i + 1].x, trail[i + 1].y);
  }

  if (trail.length > 400) {
    trail.splice(0, 0); 
  }
}

function startLadybug() {
  showMessage = false;
}

function mousePressed() {
  targetX = mouseX;
  targetY = mouseY;
}
