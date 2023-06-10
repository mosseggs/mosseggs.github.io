//starting page
let gameState = "title";
let babyMode = false;
//enemy
let enemyX = 400;
let enemyY = 250;
let enemyDX = 0;
let enemyDY = 0;
let enemyBullets = [];
let enemyBullets2 = [];
let enemyBullets3 = [];
let spawnTimer = 0;
let spawnTimer2 = 0;
let enemyBullet;
let enemyBullet2;
let enemyBullet3;
let bulletCount = 5;
let enBulSpawnSpeed = 2;
let enemyHealth = 400;
let originalEnBulSpawnSpeed = enBulSpawnSpeed;
let enBulChoice = 0;
//player
let playerDX = 0;
let playerDY = 0;
let playerBullets = [];
let bulletTimer = 0;
let bulletsShot = 0;
let fireSpeed = 0.2;
let originalFireSpeed = fireSpeed;
let playerDmg = 10;
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
let upKey = 87;
let downKey = 83;
let leftKey = 65;
let rightKey = 68;
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
let powerSpawn = 9;
let power;

function preload() {
  font = loadFont("fonts/font.ttf");
}

function setup() {
  createCanvas(800,windowHeight);
  play = new Button("left",height * 3/4, "play", 250, 75, 150);
  setting = new Button("right",height * 3/4, "settings", 250, 75, 150);
  baby = new Button("left", height * 7/8, "baby mode", 250,75, 150)
  guide = new Button("right", height * 7/8, "guide", 250,75, 150);
  plus = new Button("left",height * 13.5/20, "+", 50,50, 35);
  minus = new Button("right",height * 13.5/20, "-", 50,50, 35);
  p1 = new Button("left", height * 8/10, "1", 60, 60, 70);
  p2 = new Button("middle", height * 8/10, "2", 60, 60, 0);
  p3 = new Button("right", height * 8/10, "3", 60, 60, 70);
  back = new Button("middle", height * 9/10, "back", 200,75, 0);
  restart = new Button("middle", height * 7/10, "back to title", 400,75, 0);
  player = new Player(width / 2, 4 * windowHeight / 5, playerDX, playerDY,upKey,downKey,leftKey,rightKey);
  enemy = new Enemy(enemyX,enemyY,width/2, startDif);
  circler = new TestEnemy(width * 1/4,height * 4/8, "circle");
  zigzag = new TestEnemy(width * 2/4,height * 4/8, "zig");
  dasher = new TestEnemy(width * 3/4,height * 4/8, "dash");
  dummy1 = new Dummy(width * 1/4, height * 3/ 4);
  dummy2 = new Dummy(width * 2/4, height * 3/ 4);
  dummy3 = new Dummy(width * 3/4, height * 3/ 4);
  increaseDifficulty();
  for (let i = 0; i < bulletCount; i++)
  {
       enemyBullet = new EnemyBullet(enemy.x, enemy.y, i, bulletCount)
       enemyBullet.setSpeed();
       enemyBullets.push(enemyBullet)
  }
  enemyBullet2 = new EnemyBullet2(enemy.x, enemy.y, player);
  enemyBullet2.setSpeed();
  enemyBullets2.push(enemyBullet2);
  enemyBullet3 = new EnemyBullet3(enemy.x, enemy.y, player);
  enemyBullet3.setSpeed();
  enemyBullets3.push(enemyBullet3);
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
     case "guide2":
        tutorial2();
        break;
     case "guide3":
        tutorial3();
        break;
     case "play":
        game();
        break;
     case "gameOver":
        gameOver();
        break;
  }
}

function game(){
  if(babyMode == true){
    if(puIncFireSpeed==false){
      fireSpeed = 0.125;
    }
    if(puIncAtk==false){
      playerDmg = 45;
    }

    powerSpawn = 2;
  }
  //Enemy bullets spawning
  //normal
  if(spawnTimer2 >= enBulSpawnSpeed/2 && enBulChoice < 7){
    enemyBullet2 = new EnemyBullet2(enemy.x, enemy.y, player);
    enemyBullet2.setSpeed();
    enemyBullets2.push(enemyBullet2);
    spawnTimer2 = 0;
  }
  for(let i = 0; i < enemyBullets2.length; i++){
    enemyBullets2[i].display();
    enemyBullets2[i].update();

    if (difficulty > 0)
    {
        enemyBullets2[i].bounce();
    }
    if (enemyBullets2[i].collides(player))
    {
        player.health -= 10;
        enemyBullets2.splice(i, 1);
    }
  }
  //fly
  if(spawnTimer2 >= enBulSpawnSpeed/2 && enBulChoice > 7){
    enemyBullet3 = new EnemyBullet3(enemy.x, enemy.y, player);
    enemyBullet3.setSpeed();
    enemyBullets3.push(enemyBullet3);
    enBulChoice = 0;
    spawnTimer2 = 0;
  }
  for(let i = 0; i < enemyBullets3.length; i++){
    enemyBullets3[i].display();
    enemyBullets3[i].update();

    if (difficulty > 0)
    {
        enemyBullets3[i].bounce();
    }
    if (enemyBullets3[i].collides(player))
    {
        player.health -= enemyBullets3[i].damage;
        enemyBullets3.splice(i, 1);
    }
  }
  //circle
  if(difficulty > 1){
    if(spawnTimer >= enBulSpawnSpeed){
      for (let j = 0; j < bulletCount; j++)
      {
          enemyBullet = new EnemyBullet(enemy.x, enemy.y, j, bulletCount);
          enemyBullet.setSpeed();
          enemyBullets.push(enemyBullet);
      }
      spawnTimer = 0;
    }
    for (let i = 0; i < enemyBullets.length; i++)
    {
      enemyBullets[i].display();
      enemyBullets[i].update();
        enemyBullets[i].bounce();
        //Checks if each bullet collides with player
        if (player.collides(enemyBullets[i]))
        {
            player.health -= 10;
            enemyBullets.splice(i, 1);
        }
     }
  }
  //Checks if each enemy bullet is colliding with each player bullet
  for (let k = playerBullets.length - 1; k > -1; k--)
  {
      for (let i = enemyBullets.length - 1; i > -1; i--)
      {
        if (playerBullets[k].collides(enemyBullets[i]))
        {
          enemyBullets.splice(i, 1);
        }
      }
      for (let i = enemyBullets2.length - 1; i > -1; i--)
      {
        if (enemyBullets2[i].collides(playerBullets[k]))
        {
          enemyBullets2.splice(i, 1);
        }
        else if(babyMode == true){
          if(enemyBullets2[i].collides2(playerBullets[k])){
            enemyBullets2.splice(i, 1);
          }
        }

      }
      for (let i = enemyBullets3.length - 1; i > -1; i--)
      {
        if (enemyBullets3[i].collides(playerBullets[k]))
        {
          enemyBullets3.splice(i, 1);
        }
        else if(babyMode == true){
          if(enemyBullets3[i].collides2(playerBullets[k])){
            enemyBullets3.splice(i, 1);
          }
        }

      }
  }
   //Spawns the players bullets
   if(keyIsDown(shootButton)){
    if(bulletTimer > fireSpeed){
      if(babyMode == false){
        bullet = new Bullet(player.x,player.y - player.diameter / 2);
      }
      else{
        bullet = new Bullet2(player.x,player.y);
        bullet.setSpeed();
      }
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
    if(powerSpawnTimer > powerSpawn){
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
  text("Fire Speed", width-100,height-150);
  if(babyMode == true){
    fireSpeed = 0.001;
  }
  else{
    fireSpeed = 0.01;;
  }
  if(powerDurTimer[0] <= 0){
    fireSpeed = originalFireSpeed;
    puIncFireSpeed = false;
  }
  powerDurTimer[0]-=1/60;
}
if(puIncAtk == true){
  text("Atk", width-100,height-100);
  if(babyMode == true){
    playerDmg = 75;
  }
  else{
    playerDmg = 50;
  }
  if(powerDurTimer[1] <= 0){
    playerDmg = originalPlayerDmg;
    puIncAtk = false;
  }
  powerDurTimer[1]-=1/60;
}
if(puDecEnBulSpawnSpeed == true){
  text("Enemy Fire Speed", width-150,height-50);
  enBulSpawnSpeed = 5;
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
  spawnTimer2 += 1/60;
  bulletTimer += 1/60;
  powerSpawnTimer += 1/60;
  enBulChoice += 1/60;
}