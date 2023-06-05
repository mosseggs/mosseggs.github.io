//Notable bugs:
//random collision crash that happened during the bullet switching, crashes at line 258 (if (enemyBullets[i].collides(playerBullets[j])))
//starting bullets is always like 7 (i think you fixed this but never uploaded it?)


//starting page
let gameState = "title";
//enemy
let enemyX = 400;
let enemyY = 250;
let enemyDX = 0;
let enemyDY = 0;
let enemyBullets = [];
let spawnTimer = 0;
let enemyBullet;
let bulletCount = 5;
let enBulSpawnSpeed = 2;
let enemyHealth = 400;
let originalEnBulSpawnSpeed = enBulSpawnSpeed;
//player
let playerDX = 0;
let playerDY = 0;
let playerBullets = [];
let bulletTimer = 0;
let bulletsShot = 0;
let fireSpeed = 0.2;
let originalFireSpeed = fireSpeed;
let playerDmg = 20;
let originalPlayerDmg = playerDmg;
//difficulty
let difficulty = -1;
let startDif = 0;
let difTimer = 0;
//score
let score = 0;
let necBul = 0;
let scoreCalc = false;
//Keybindings
let keyLog = 0;
let keyLock = false;
let keyRel = true;
let mouseRel = true;
let up = "w";
let left = "a";
let down = "s";
let right = "d";
let shoot = "space";
let shootButton = 32;
//powerups
let powerups = [];
let powerSpawnTimer = 0;
let powerDurTimer = [0,0,0,0,0];
let puDiam = 20;
let puIncFireSpeed=false;
let puIncAtk=false;
let puDecEnBulSpawnSpeed=false;
let powerDur = 10;
let power;


function preload() {
  font = loadFont("fonts/font.ttf");
}


function setup() {
  createCanvas(800,windowHeight);
  play = new Button("left",height * 3/4, "play", 200, 75, 150);
  setting = new Button("right",height * 3/4, "settings", 200, 75, 150);
  guide = new Button("middle", height * 7/8, "guide", 200,75, 0);
  plus = new Button("left",height * 13.5/20, "+", 50,50, 35);
  minus = new Button("right",height * 13.5/20, "-", 50,50, 35);
  back = new Button("middle", height * 9/10, "back", 200,75, 0);
  restart = new Button("middle", height * 7/10, "back to title", 400,75, 0);
  player = new Player(width / 2, 4 * windowHeight / 5, playerDX, playerDY);
  enemy = new Enemy(enemyX,enemyY,width/2, startDif);
  increaseDifficulty();
  for (let i = 0; i < bulletCount; i++)
  {
       enemyBullet = new EnemyBullet(enemy.x, enemy.y, i, bulletCount)
       enemyBullet.setSpeed();
       enemyBullets.push(enemyBullet)
  }
}


function title() {
  textAlign(CENTER);
  textFont(font);
  fill(255);
  noStroke();
  textSize(56);
  text("A BAD BULLET HELL",width / 2, height / 5);
  textSize(18);
  text("by tarin fung and gabriel lau",width / 2, height* 5/20);
  play.display();
  setting.display();
  guide.display();
  if(mouseIsPressed === false){
    mouseRel = true;
  }
  if(mouseX < play.x + play.w/2 && mouseX > play.x - play.w/2 && mouseY < play.y + play.h/2 && mouseY > play.y - play.h/2 && mouseIsPressed === true && mouseRel == true){
      gameState = "play";
      mouseRel = false;
  }
  if(mouseX < setting.x + setting.w/2 && mouseX > setting.x - setting.w/2 && mouseY < setting.y + setting.h/2 && mouseY > setting.y - setting.h/2 && mouseIsPressed === true && mouseRel == true){
      gameState = "setting";
      mouseRel = false;
  }
  if(mouseX < guide.x + guide.w/2 && mouseX > guide.x - guide.w/2 && mouseY < guide.y + guide.h/2 && mouseY > guide.y - guide.h/2 && mouseIsPressed === true && mouseRel == true){
    gameState = "guide";
    mouseRel = false;
}
}


function draw() {
  background(0);
  switch (gameState)
  {
     case "title":
        title();
        break;
     case "setting":
        settings();
        break;
     case "guide":
        tutorial();
        break;
     case "play":
        game();
        break;
     case "gameOver":
        gameOver();
        break;
  }
}

function tutorial(){
  textAlign(CENTER);
  textFont(font);
  fill(255);
  noStroke();
  textSize(40);
  textSize(30);
  text("Hi welcome to our game, I hope you enjoy", width/2, height * 0.5/10);
  text("You can move & shoot ", width/2, height * 1.5/10);
  text("using your preffered keys,", width/2, height * 2/10);
  text("changable in the settings", width/2, height * 2.5/10);
  text("The enemy gets more difficult as ", width/2, height * 3.5/10);
  text("the game progressses and has 3 patterns:", width/2, height * 4/10);
  text("circling, zigzag, and tracking", width/2, height * 4.5/10);
  text("At the 3rd level, difficulty level 2", width/2, height * 5.5/10);
  text("you can gain powerups", width/2, height * 6/10);
  fill(0,255,0);
  ellipse(width * 1.5 / 7,height * 6.5/10,20,20);
  fill(132, 0, 255);
  ellipse(width * 3 / 7,height * 6.5/10,20,20);
  fill(0,253,255);
  ellipse(width * 4.5 / 7,height * 6.5/10,20,20);
  fill(137,129,118);
  ellipse(width * 6 / 7,height * 6.5/10,20,20);
  fill(255);
  text("Health",width * 1.5 / 7,height * 7/10);
  text("Attack Up",width * 3 / 7,height * 7/10);
  text("Fire",width * 4.5 / 7,height * 7/10);
  text("Speed",width * 4.5 / 7,height * 7.5/10);
  text("Up",width * 4.5 / 7,height * 8/10);
  text("Enemy Fire",width * 6 / 7,height * 7/10);
  text("Speed Down",width * 6 / 7,height * 7.5/10);
  back.display();
  if(mouseX < back.x + back.w/2 && mouseX > back.x - back.w/2 && mouseY < back.y + back.h/2 && mouseY > back.y - back.h/2 && mouseIsPressed === true && mouseRel == true){
    gameState = "title";
    mouseRel = false;
  }
  if(mouseIsPressed === false){
    mouseRel = true;
  }
}

function settings() {
  textAlign(CENTER);
  textFont(font);
  fill(255);
  noStroke();
  textSize(40);
  text("SETTINGS AND CONTROLS MENU",width / 2, height * 1 / 10);
  textSize(30);
  text("Movement controls",width / 2, height * 3 / 20);
  text("Up: " + up, width/2, height * 4/20);
  text("Left: " + left, width/2, height * 5/20);
  text("Down: " + down, width/2, height * 6/20);
  text("Right: " + right, width/2, height * 7/20);
  text("Shoot: " + shoot, width/2, height * 8/20);
  text("To change controls,", width/2, height * 9/20);
  text("press the current key for", width/2, height * 9.6/20);
  text("the direction you wish to change,", width/2, height * 10.2/20);
  text(" then press your new key.", width/2, height * 10.8/20);
  text("Starting Difficulty: " + startDif, width/2, height * 12/20);
  if(mouseX < plus.x + plus.w/2 && mouseX > plus.x - plus.w/2 && mouseY < plus.y + plus.h/2 && mouseY > plus.y - plus.h/2 && mouseIsPressed === true && difTimer >= 0.4){
    startDif++;
    difTimer = 0;
  }
  if(mouseX < minus.x + minus.w/2 && mouseX > minus.x - minus.w/2 && mouseY < minus.y + minus.h/2 && mouseY > minus.y - minus.h/2 && mouseIsPressed === true && startDif != 0  && difTimer >= 0.2){
    startDif--;
    difTimer = 0;
  }
  if(mouseIsPressed === false){
    difTimer = 1;
    mouseRel = true;
  }
  text("To change Difficulty,", width/2, height * 15/20);
  text("press the buttons above", width/2, height * 16/20);
  if(mouseX < back.x + back.w/2 && mouseX > back.x - back.w/2 && mouseY < back.y + back.h/2 && mouseY > back.y - back.h/2 && mouseIsPressed === true && mouseRel == true){
    mouseRel = false;
    gameState = "title";
    if(startDif != 0){
      for(i = 0; i < startDif; i++){
        increaseDifficulty();
      }
    }
  }
  plus.display();
  minus.display();
  back.display();
  difTimer += 1/60;
  //keeps track of if one of the directional keys is pressed
  if(keyIsPressed === true && keyLock == false && keyLog == 0 && keyRel == true){
    if(keyIsDown(player.up)){
      print("3");
      keyLog = player.up;
      keyLock = true;
      keyRel = false;
    }
    else if(keyIsDown(player.left)){
      keyLog = player.left;
      keyLock = true;
      keyRel = false;
    }
    else if(keyIsDown(player.down)){
      keyLog = player.down;
      keyLock = true;
      keyRel = false;
    }
    else if(keyIsDown(player.right)){
      keyLog = player.right;
      keyLock = true;
      keyRel = false;
    }
    else if(keyIsDown(shootButton)){
      keyLog = shootButton;
      keyLock = true;
      keyRel = false;
    }
    else{
      keyLog = 0;
    }
  }
  //make sure the player releases the button first, so it doesnt just end up in an infinite loop
  if(keyIsPressed === false){
    keyRel = true;
  }
  //if one of the directional keys is pressed, then set it to whatever is the next key to be pressed
  if(keyLog != 0 && keyLock == true && keyIsPressed === true && keyRel == true){
    switch(keyLog){
      case player.up:
        player.up = keyCode;
        up = key;
        keyLog = 0;
        keyLock = false;
        keyRel = false;
        break;
      case player.left:
        player.left = keyCode;
        left = key;
        keyLog = 0;
        keyLock = false;
        keyRel = false;
        break;
      case player.down:
        player.down = keyCode;
        down = key;
        keyLog = 0;
        keyLock = false;
        keyRel = false;
        break;
      case player.right:
        player.right = keyCode;
        right = key;
        keyLog = 0;
        keyLock = false;
        keyRel = false;
        break;
      case shootButton:
        shootButton = keyCode;
        shoot = key;
        keyLog = 0;
        keyLock = false;
        keyRel = false;
        break;
    }
  }
  //make sure the player releases the button first, so it doesnt just end up in an infinite loop of only 1 button being changed
  if(keyIsPressed === false){
    keyRel = true;
  }
}




function game(){
  //Enemy bullets spawning
  for (let i = 0; i < enemyBullets.length; i++)
  {
    enemyBullets[i].display();
    enemyBullets[i].update();
       if(spawnTimer >= enBulSpawnSpeed){
         for (let j = 0; j < bulletCount; j++)
         {
            enemyBullet = new EnemyBullet(enemy.x, enemy.y, j, bulletCount)
            enemyBullet.setSpeed();
            enemyBullets.push(enemyBullet)
         }
         spawnTimer = 0;
       }
       if (difficulty > 0)
       {
           enemyBullets[i].bounce();
       }
       //Checks if each bullet collides with player
       if (player.collides(enemyBullets[i]))
       {
           player.health -= 10;
           enemyBullets.splice(i, 1);
       }
       //Checks if each enemy bullet is colliding with each player bullet
  }
  for (let k = playerBullets.length - 1; k > -1; k--)
  {
      for (let i = enemyBullets.length - 1; i > -1; i--)
      {
        if (playerBullets[k].collides(enemyBullets[i]))
        {
          enemyBullets.splice(i, 1);
        }
      }
  }
   //Spawns the players bullets
   if(keyIsDown(shootButton)){
    if(bulletTimer > fireSpeed){
      bullet = new Bullet(player.x,player.y - player.diameter / 2);
      playerBullets.push(bullet);
      bulletsShot++;
      bulletTimer = 0;
    }
  }
  for (let i = 0; i < playerBullets.length; i++)
  {
    playerBullets[i].display();
    playerBullets[i].update();
    if(playerBullets[i].y <= 0){
      if(playerBullets.length != 1)
      {
        playerBullets.splice(i, 1);
      }
      else{
        playerBullets.length = 1;
      }
    }
    else if (playerBullets[i].collides(enemy))
    {
        enemy.health -= playerDmg;
        playerBullets.splice(i, 1);
    }
  }
  //When enemy health hits X, Y happens
  if(enemy.health <= 0){
    increaseDifficulty();
    reset();
  }
  if(player.health <= 0){
    gameState = "gameOver";
  }
  if(player.collides(enemy)){
    player.health--;
  }
  //spawns powerups
  if(difficulty > 1){
    if(powerSpawnTimer > 9){
      power = new Powerup(random(puDiam/2,width-(puDiam/2)), random(puDiam/2,width-(puDiam/2)),puDiam);
      powerups.push(power);
      powerSpawnTimer = 0;
    }
  }
  for(let i = 0; i < powerups.length; i++){
    powerups[i].display();
  if(powerups[i].collides(player)){
    switch(powerups[i].power){
      //green
      case 0:
          player.health += 40;
          break;
      //purple
      case 1:
          puIncFireSpeed=true;
          originalFireSpeed = fireSpeed;
          powerDurTimer[0] = powerDur;
          break;
      //teal
      case 2:
          puIncAtk=true;
          powerDurTimer[1] = powerDur;
          originalPlayerDmg = playerDmg;
          break;
      //gray
      case 3:
          puDecEnBulSpawnSpeed=true;
          originalEnBulSpawnSpeed = enBulSpawnSpeed;
          powerDurTimer[2] = powerDur;
          break;
    }
    powerups.splice(i, 1);
  }
}
colorMode(RGB);
fill(255);
if(puIncFireSpeed==true){
  fireSpeed = 0.01;
  text("Fire Speed  ", width-100,height-150);
  if(powerDurTimer[0] <= 0){
    fireSpeed = originalFireSpeed;
    puIncFireSpeed = false;
  }
  powerDurTimer[0]-=1/60;
}
if(puIncAtk == true){
  text("Atk", width-100,height-100);
  playerDmg = 50;
  if(powerDurTimer[1] <= 0){
    playerDmg = originalPlayerDmg;
    puIncAtk = false;
  }
  powerDurTimer[1]-=1/60;
}
if(puDecEnBulSpawnSpeed == true){
  text("Enemy Fire Speed", width-150,height-50);
  enBulSpawnSpeed = 2;
  if(powerDurTimer[2] <= 0){
    enBulSpawnSpeed = originalEnBulSpawnSpeed;
    puDecEnBulSpawnSpeed = false;
  }
  powerDurTimer[2]-=1/60;
}
  //displays
  player.display();
  player.update();
  player.move();
  enemy.display();
  enemy.update(player);
  //Text
  textAlign(CENTER);
  textFont(font);
  textSize(30);
  noStroke();
  fill(255);
  text("Health: " + player.health, 120, (height - 25));
  //timers
  enemy.difficulty = difficulty;
  spawnTimer += 1/60;
  bulletTimer += 1/60;
  powerSpawnTimer += 1/60;
}


function gameOver()
{
  //score when i finally decide how to do that
  if(scoreCalc == false){
    score = 0;
    for(i = startDif; i < difficulty; i++){
      necBul = (370+ 40 * exp(i/2)) / 10;
      score+= 370+ 40 * exp(i/2) - necBul;
      bulletsShot -= necBul;
    }
    score += (enemy.maxHealth - enemy.health);
    score /= 10;
    score += 100;
    score -= (bulletsShot * 0.5)
    //subtract all bullets
    if(score < 0){
      score = 0;
    }
    scoreCalc = true;
  }
  //display stuff
  textAlign(CENTER);
  textFont(font);
  textSize(50);
  fill(255);
  text("GAME OVER", width/2, height/2 - 30);
  textSize(30);
  text("you beat the enemy " + (difficulty - startDif) + " times!", width/2, height/2);
  text("Score: " + nfc(Math.round(score)), width/2, height/2 + 30);
  if(mouseX < restart.x + restart.w/2 && mouseX > restart.x - restart.w/2 && mouseY < restart.y + restart.h/2 && mouseY > restart.y - restart.h/2 && mouseIsPressed === true){
    hardReset();
    mouseRel = false;
  }
  if(mouseIsPressed === false){
    mouseRel = true;
  }
  restart.display();
}


function reset(){
  let playerX = player.x;
  let playerY = player.y;
  player = new Player(playerX, playerY, playerDX, playerDY);
  enemy = new Enemy(enemyX + random(-100,100),enemyY + random(-100,100) , 370+ 40 * exp(difficulty/2), difficulty);
  playerBullets.length = 0;
  enemyBullets.length = 0;
  for (let i = 0; i < bulletCount; i++)
  {
       enemyBullet = new EnemyBullet(enemy.x, enemy.y, i)
       enemyBullet.setSpeed();
       enemyBullets.push(enemyBullet)
  }
  spawnTimer = 0;
  bulletTimer = 0;
}


function hardReset(){
  //initial state
  gameState = "title";
  //enemy
  enemyX = 400;
  enemyY = 250;
  enemyDX = 0;
  enemyDY = 0;
  enemyBullets.length = 0;
  spawnTimer = 0;
  bulletCount = 7;
  enBulSpawnSpeed = 2;
  enemyHealth = 400;
  originalEnBulSpawnSpeed = enBulSpawnSpeed;
  enemy = new Enemy(enemyX + random(-100,100),enemyY + random(-100,100) , 370+ 40 * exp(difficulty/2), difficulty);
  for (let i = 0; i < bulletCount; i++)
  {
      enemyBullet = new EnemyBullet(enemy.x, enemy.y, i)
      enemyBullet.setSpeed();
      enemyBullets.push(enemyBullet)
  }
  //player
  playerDX = 0;
  playerDY = 0;
  playerBullets.length = 0;
  bulletTimer = 0;
  bulletsShot = 0;
  fireSpeed = 0.2;
  originalFireSpeed = fireSpeed;
  playerDmg = 10;
  originalPlayerDmg = playerDmg;
  player = new Player(width / 2, 4 * windowHeight / 5, playerDX, playerDY);
  //Keybindings
  ckeyLog = 0;
  keyLock = false;
  keyRel = true;
  mouseRel = true;
  up = "w";
  left = "a";
  down = "s";
  right = "d";
  shoot = "space";
  shootButton = 32;
  //difficulty
  difficulty = 0;
  startDif = 0;
  difTimer = 0;
  //score
  score = 0;
  necBul = 0;
  scoreCalc = false;
  //powerups
  powerups.length = 0;
  powerSpawnTimer = 0;
  powerDurTimer = [0,0,0,0,0];
  puDiam = 20;
  puIncFireSpeed=false;
  puIncAtk=false;
  puDecEnBulSpawnSpeed=false;
  powerDur = 10;
}


function increaseDifficulty()
{
 difficulty++;
 bulletCount = 7 + 2 * difficulty;
 //Bouncing added in a different loop
 if (difficulty == 1)
 {
   increaseFireSpeed()
   //sets spawn speed to 1.5
 }
 else if (difficulty == 2)
 {
   increaseEnemyMoveSpeed()
   //Sets speed to four
   //sets angleIncrease to .075
 }
 else if (difficulty == 3)
 {
   increaseZigEraticity();
   increaseEnemyBulletFireRate()
 }
 else
 {
  for(i = 0; i < difficulty - 3; i++){
    randomizeDifficultyAddition();
  }
 }
}


function randomizeDifficultyAddition()
{
  let rand = Math.round(random(0.5,5.499))
  switch (rand)
  {
    case 1:
      increaseFireSpeed();
      break;
    case 2:
      increaseEnemyBulletFireRate();
      break
    case 3:
      increaseZigEraticity();
      break
    case 4:
      increaseEnemyMoveSpeed();
      break;
  }
}


function increaseFireSpeed()
{
  //INcreases the delay betweem shots
    fireSpeed += .05;
}
function increaseEnemyBulletFireRate()
{
    enBulSpawnSpeed = enBulSpawnSpeed * .75;
}
function increaseZigEraticity()
{
    enemy.zigEraticity += .25;
}
function increaseEnemyMoveSpeed()
{
    enemy.speed += 3;
    enemy.angleIncrease += .05;
}


class Button{
  constructor(row, y, name, w, h, offset) {
    this.x = 0;
    this.y = y;
    this.row = row;
    this.offset = offset;
    this.w = w;
    this.h = h;
    this.name = name;
  }


  display() {
    if(this.row =="left"){
      this.x = (width/2) - this.offset;
    }
    else if(this.row == "right"){
      this.x = (width/2) + this.offset;
    }
    else if(this.row == "middle"){
      this.x = width/2;
    }
    rectMode(CENTER);
    fill(255);
    rect(this.x, this.y, this.w, this.h);
    fill(0);
    textAlign(CENTER,CENTER);
    textSize(40);
    text(this.name,this.x + 3,this.y - 3);
  }
}



