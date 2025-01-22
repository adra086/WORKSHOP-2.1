### WORKSHOP-2: Ladybug Animation with p5.js

#### Link to repository for Workshop 2: https://github.com/adra086/WORKSHOP-2.1/

## Overview
### In this workshop, we used the p5.js library to create an interactive ladybug animation with a trail. The project incorporates random movement of the ladybug, smooth animations, and user interaction through mouse clicks to control its behavior. The goal was to explore the power of p5.js for creating dynamic visuals and interactive sketches.

## Learning Objectives
    - Implement interactive animations using p5.js.
    - Use setTimeout() and setInterval() to control animation timing.
    - Create smooth, random movement with noise.
    - Generate and manage a dynamic trail effect.
    - Implement user interaction (mouse click) to change the ladybug's behavior.
    - Document and visualize the process with step-by-step explanations.

## Project Description
### The project dynamically generates:
    - Ladybug Animation: A ladybug that moves randomly across the canvas and changes direction smoothly using noise.
    - Dynamic Trail: The ladybug leaves a green trail as it moves, visualizing its past movements.

### The project includes a brief introductory message that appears for the first 2 seconds and then transitions to the interactive ladybug animation.
Key Features

    - Interactive Animation: The ladybug moves in response to mouse clicks.
    - Trail Effect: The ladybug leaves a green trail wherever it moves.
    - Smooth Movement: The ladybug's movement is driven by Perlin noise for smooth, natural transitions.
    - Timed Transition: The animation begins with a message that disappears after 2 seconds.

## Code Explanation
### 1. Canvas Setup
#### Code Extract: 

function setup() {
  createCanvas(400, 400);
  ladybug = new Ladybug(width / 2, height / 2);
  movementTimeout = setTimeout(startLadybug, 2000);  // Show message for first 2 seconds
  targetX = ladybug.x;
  targetY = ladybug.y;
}

#### Code Description:

    - createCanvas(400, 400); creates a 400x400 pixel drawing area.
    - ladybug = new Ladybug(width / 2, height / 2); initializes the ladybug at the center of the canvas.
    - setTimeout() shows a message for the first 2 seconds.

#### Outcome/Screenshot: The canvas is set up, and the ladybug is initialized.
![image](https://github.com/user-attachments/assets/df0decb9-509f-4f21-8c7d-08510add7480)

### 2. Ladybug Class
#### Code Extract:

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
    ellipse(this.x, this.y, this.size, this.size);  // Ladybug body
    fill(0);
    ellipse(this.x - 8, this.y - 8, 8, 8);  // Left spot
    ellipse(this.x + 8, this.y - 8, 8, 8);  // Right spot
    ellipse(this.x, this.y + 8, 8, 8);  // Bottom spot
  }
}

#### Code Description:

    - The Ladybug class manages the ladybug's position and display.
    - The update() function uses Perlin noise for smooth movement and keeps the ladybug within canvas boundaries.
    - The display() function draws the ladybug on the canvas with spots.

#### Outcome/Screenshot: The ladybug appears at the center and begins to move smoothly.
![image](https://github.com/user-attachments/assets/d1f0bfca-2847-47b7-870a-49e52723c242)

### 3. Trail Creation
#### Code Extract: 

function createTrail() {
  trail.push(createVector(ladybug.x, ladybug.y));
  stroke(0, 255, 0);  // Green color for the trail
  strokeWeight(10);
  noFill();

  for (let i = 0; i < trail.length - 1; i++) {
    line(trail[i].x, trail[i].y, trail[i + 1].x, trail[i + 1].y);
  }

  if (trail.length > 400) {
    trail.splice(0, 0);  // Remove the oldest trail points
  }
}

#### Code Description:

    The createTrail() function tracks the ladybug's movement and creates a green trail using lines.
    The trail is stored as vectors in an array, and lines are drawn between successive positions.

### 4. Interactive Behavior
#### Code Extract:

function mousePressed() {
  targetX = mouseX;
  targetY = mouseY;
}

#### Code Description:

    The mousePressed() function updates the target position of the ladybug to the mouse's position, making the ladybug move towards the click.

#### Outcome/Screenshot: The ladybug moves towards the mouse click.
![image](https://github.com/user-attachments/assets/15f1b55e-7878-4f92-a2e9-5d53ac321a94)

### 5. Timed Transition
#### Code Extract:

function startLadybug() {
  showMessage = false;
}

#### Code Description:

    After 2 seconds, the introductory message is removed, and the ladybug starts moving on its own.

#### Outcome/Screenshot: The message disappears, and the animation begins.
![image](https://github.com/user-attachments/assets/2924e226-1a3f-4109-9201-f2a210c80f67)

## Documentation Improvements
### Problem-Solving

    - Fixed issues with smooth movement by using Perlin noise for consistent speed.
    - Adjusted trail length to ensure the trail doesn't overflow memory.

### Helpful Resources

    - p5.js Reference Documentation was very helpful in creating the ladybug
    - p5.js Tutorials on youtube
    - ChatGPT was used for debugging the trail and movement logic.

## Learning Highlights

    - Using noise() for smooth animations as this was mentioned in numerous youtube tutorials
    - Creating interactive animations with mousePressed().
    - Drawing continuous trails with dynamic shapes.
