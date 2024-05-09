let player1Score = 0;
let player2Score = 0;
let ball = [];
let player1, player2;
let state = "start";
let server = 1;
let win;
let ponghit, pongbounce, pongscore;
let lasthit;
let ai = 0;
let angle1 = 0;
let angDir;
let ballAi = 0;
let amount = 1;
let gravity = true;

function preload() {
  fontRetro = loadFont("font.ttf");
  ponghit = loadSound("ponghit.wav");
  pongbounce = loadSound("pongbounce.wav");
  pongscore = loadSound("pongscore.wav");
}

function setup() {
  createCanvas(800, 500);
  mic = new p5.AudioIn();
  mic.start();
  for(let i = 0; i < 1; i++) {
    ball[i] = new Ball(width/2, height/2, random(2) < 1 ? 5 : -5, random(-3,3),10);
  }
  player1 = new Paddle("left");
  player2 = new Paddle("right");
  ball[0].velX = -5;
  angDir= random(0,2) > 1 ?  1 : -1;
  noCursor();
}

function draw() {
  let vol = mic.getLevel();
  background(0);
  dashedLine(25);
  title();
  score();
  for(i = 0; i < ball.length; i++){
    ball[i].display();
    if(state == "server") {
      if(server == 1) {
        ball[i].velX = random(1,10);
      }
      else {
        ball[i].velX = random(-10,-1);
      }
    }
    else if(state == "play") {
      ball[i].move();

      if(ball[i].collides(player1)) {
        ponghit.play();
        ball[i].x = player1.x + 10;
        lasthit = 1;
        angDir = random(0,2) > 1 ?  1 : -1;
        if(ballAi == 5){
          ball[amount] = new Ball(ball[i].x, ball[i].y, ball[i].velX, -ball[i].velY, 10);
          amount++;
        }
      }
      if(ball[i].collides(player2)) {
        ball[i].x = player2.x - 10;
        ponghit.play();
        lasthit = 2;
        angDir = random(0,2) > 1 ?  1 : -1;
        if(ballAi == 5){
          ball[amount] = new Ball(ball[i].x, ball[i].y, ball[i].velX, -ball[i].velY, 10);
          amount++;
        }
      }
      if(ball[i].y < 0 || ball[i].y > height) {
        if(ballAi == 0){
          ball[i].velY = -ball[i].velY;
        }
        else if(ballAi != 0){
          ball[i].velY = -ball[i].velY;
          if(ball[i].y < 0){
            ball[i].y = 5;
          }
          else if(ball[i].y > height) {
            ball[i].y = height - 5;
          }
        }
        angDir = random(0,2) > 1 ?  1 : -1;
        pongbounce.play()
      }

      if(ball[i].x < 0) {
        server = 1;
        player2Score++;
        pongscore.play();
        if(player1Score == 10) {
          win = 1;
          state = "done";
        }
        else if(player2Score == 10) {
          win = 2;
          state = "done";
        }
        else {
          state = "serve";
          ball.length = 1;
          amount = 1;
          i = 0;
          ball[0].reset();
        }
      }
      if(ball[i].x > width) {
        server = 2;
        player1Score++;
        pongscore.play();
        if(player1Score == 10) {
          win = 1;
          state = "done";
        }
        else if(player2Score == 10) {
          win = 2;
          state = "done";
        }
        else {
          state = "serve";
          ball.length = 1;
          amount = 1;
          i = 0;
          ball[0].reset();
        }
      }
    }
  }

  player1.display();
  player2.display();
  player1.move();
  player2.move();
  fill(255,0,0,100);
  ellipse(mouseX, mouseY, 10, 10);
  fill(255,255,255);
}

function score() {
  fill(180);
  noStroke();
  textAlign(CENTER);
  textSize(60);
  textFont(fontRetro);
  text(player1Score, width / 4, 80);
  text(player2Score, 3*width / 4, 80);
}

function keyPressed() {
  if(keyCode == ENTER || keyCode == RETURN) {
    if(state == "start") {
      state = "serve";
    }
    else if(state == "serve") {
      state = "play";
    }
    else if(state == "done") {
      state = "serve";
      player1Score=player2Score=0;
      ball[0].reset();
      server = winner == 1 ? 2 : 1;
      if (win == 1) {
        velX = -5;
      }
      if (win == 2) {
        velX = 5;
      }
    }
  }
  else if(keyCode == 192) {
    if(ai >= 5){
      ai = 0;
    }
    else{
      ai++;
    }
  }
  else if(ai == 4 && keyCode == 17) {
    gravity = !gravity;
  }
  else if(keyCode == 16) {
    if(ballAi >= 5){
      ballAi = 0;
    }
    else{
      ballAi++;
    }
    if(ballAi != 5){
      ball.length = 1;
    }
  }
}

function title() {
  fill(255);
  noStroke();
  textSize(18);
  textFont(fontRetro);
  if(state == "start") {
    textSize(36);
    text("Press Enter to Begin", width / 2, 35);
    textSize(18);
    text("Use Grave(`) to cycle Player 2 modes", width/2, 60);
    text("and Use Shift to cycle Ball modes", width/2, 80);
  }
  else if(state == "serve") {
    textSize(36);
    text("Player " + server + " serves", width / 2, 35);
    textSize(18);
    text("Press Enter to Restart", width/2, 60);
  }
  else if(state == "done") {
    textSize(36);
    text("Player " + win + " Wins!", width / 2, 35);
    textSize(18);
    text("Press Enter to Restart", width/2, 60);
  }
  if(ai != 0){
    textSize(18);
    if(ai == 1){
      text("Player 2 mode 1: Human Error", width/2, 100);
    }
    else if(ai == 2){
      text("Player 2 mode 2: Random wall", width/2, 100);
    }
    else if(ai == 3){
      text("Player 2 mode 3: Tracking", width/2, 100);
    }
    else if(ai == 4){
      text("Player 2 mode 4: Volume based", width/2, 100);
      text("Press CTRL to flip the paddle around", width/2, 120);
      if(gravity == false) {
        text("Paddle flipped", width/2, 150);
      }
    }
    else if(ai == 5){
      text("Player 2 mode 5: Alphabet soup", width/2, 100);
      textSize(8);
      text("yes W and S control both paddles :)", width/2, 110);
    }
  }
  if(ballAi != 0){
    textSize(18);
    if(ballAi == 1){
      text("Ball mode 1: Firefly", width/2, height-35);
    }
    else if(ballAi == 2){
      text("Ball mode 2: Bouncy balls", width/2, height-35);
    }
    else if(ballAi == 3){
      text("Ball mode 3: Random Positions", width/2, height-35);
    }
    else if(ballAi == 4){
      text("Ball mode 4: Hell", width/2, height-35);
    }
    else if(ballAi == 5){
      text("Ball mode 5: Duplicating balls", width/2, height-35);
    }
    else {
      let a = ballAi-5;
      text("Place Holder " + a, width/2, height-35);
    }
  }

}

function dashedLine(pixels) {
  stroke(180);
  strokeWeight(2);
  let center = width / 2;
  for (let i = 0; i < height / pixels; i++) {
    line(center, i * pixels + 5, center, i * pixels + 15);
  }
}

class Ball {
  constructor(x,y,velX,velY,w) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.w = this.h = w;
  }

  display() {
    rectMode(CENTER);
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }

  move() {
    if(ballAi == 0) {
      this.x += this.velX;
      this.y += this.velY;
    }
    if(ballAi == 1){
      this.velY = random(0,100) > 30 ? this.velY : -this.velY;
      this.velX = random(0,500) > 1 ? this.velX : -this.velX;
      this.x += this.velX + random(-10,10);
      this.y += this.velY + random(-10,10);
    }
    if(ballAi == 2){
      let ang1 = radians(angle1);
      this.y += this.velY + 2 *  atan(tan(acos(cos(ang1))));
      this.x += this.velX / 2;
      angle1 += 2;
    }
    if(ballAi == 3){
      this.x = random(-10,width + (10));
      this.y = random(0,height);
    }
    if(ballAi == 4) {
      let ang1 = radians(angle1);
      this.velY = random(0,100) > 30 ? this.velY : -this.velY;
      this.velX = random(0,500) > 1 ? this.velX : -this.velX;
      this.x += this.velX + random(-10,10) + 3 * angDir * sin(ang1);
      this.y += this.velY + random(-10,10) + this.velX / 2;
      angle1 += 2;
    }
    if(ballAi == 5){
      this.x += this.velX;
      this.y += this.velY;
    }
  }

  reset() {
    this.x = width/2;
    this.y = height/2;
    this.velY = random(-3,3);
    angle1 = 0;
  }

  collides(paddle) {
    if (this.x - this.w/2 > paddle.x + paddle.w/2 || this.x + this.w/2 < paddle.x - paddle.w/2) {
      return false;
    }
    if (this.y - this.h/2 > paddle.y + paddle.h/2 || this.y + this.h/2 < paddle.y - paddle.h/2) {
      return false;
    }

    this.velX = -this.velX + 1.03;
    this.velY = this.velY < 0 ? random(-5,-2) : random(2,5);

    return true;
  }
}

class Paddle {
  constructor(position) {
    this.position = position;
    this.w = 10;
    this.h = 50;
    this.y = height/2;
    this.x = this.position == "left" ? (width/2) - 350 : (width/2) + 350;
    this.store = random(-100,100);
    this.rand = ball.y + this.store;
  }

  display() {
    rectMode(CENTER);
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }

  move() {
    if(this.position == "right") {
      //Player controls
      if(ai == 0){
        if(keyIsDown(UP_ARROW)) {
          this.y += -10;
        }
        else if(keyIsDown(DOWN_ARROW)) {
          this.y += 10;
        }
      }
      if(ai == 0){
        this.h = 50;
      }
      if(ai == 1){
        this.h = 50;
        this.rand = ball[0].y + this.store;
        if(state == "play" && lasthit == 1){
          if(this.y > this.rand) {
            this.y += -ball[0].velX;
            this.store = random(1,5) > 3 ? random(-100,10) : random(-20,2);
          }
          else if(this.y < ball[0].y) {
            this.y += ball[0].velX;
            this.store = random(-10,100);
          }
        }
      }
      if(ai == 2){
        this.h = random(1,height);
        this.y = random(1,height);
      }
      if(ai == 3){
        this.h = 50;
        if(ballAi != 5){
          this.y = ball[0].y;
        }
        else {
          for(i = 0; i < ball.length; i++){
            this.y = ball[i].y;
          }
        }
      }
      if(ai == 4){
        this.h = 50;
        let vol = mic.getLevel() * 4;
        if(gravity == true) {
          let h = map(vol, 0, 1, height+50, 0);
          this.y = h+25;
        }
        else {
          let h = map(vol, 0, 1, 0, height-50);
          this.y = h-25;
        }
      }
      if(ai == 5){
        this.h = 50;
        let keyIndex = -1;
        if (key >= 'a' && key <= 'z') {
          keyIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
        }
        if (keyIndex === -1) {}
        else {
          // It's a letter key, fill a rectangle
          let x = map(keyIndex, 0, 25, 25, height-25);
          this.y = x;
        }
      }
    }

    if(this.position == "left") {
      if(keyIsDown(87)) {
        this.y += -10;
      }
      else if(keyIsDown(83)) {
        this.y += 10;
      }
    }

    this.y = constrain(this.y, this.h/2, height - this.h / 2);
  }
}