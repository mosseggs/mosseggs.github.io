function gameOver()
{
  //score when i finally decide how to do that
  if(scoreCalc == false){
    score = necBul * playerDmg;
    score += (enemy.maxHealth - enemy.health);
    bulletsShot -= necBul;
    score += 100;
    score -= (bulletsShot * 2)
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

function hardReset(){
    //initial state
    gameState = "title";
    //enemy
    enemyX = 400;
    enemyY = 250;
    enemyDX = 0;
    enemyDY = 0;
    enemyBullets.length = 0;
    enemyBullets2.length = 0;
    enemyBullets3.length = 0;
    spawnTimer = 0;
    spawnTimer2 = 0;
    bulletCount = 7;
    enBulSpawnSpeed = 2;
    enemyHealth = 400;
    originalEnBulSpawnSpeed = enBulSpawnSpeed;
    enBulChoice = 0;
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
    //difficulty
    difficulty = 0;
    startDif = 0;
    difTimer = 0;
    //score
    score = 0;
    necBul = 0;
    scoreCalc = false;
    //Keybindings
    keyLog = 0;
    keyLock = false;
    keyRel = true;
    mouseRel = true;
    up = "w";
    left = "a";
    down = "s";
    right = "d";
    shoot = "space";
    shootButton = 32;
    //powerups
    powerups.length = 0;
    powerSpawnTimer = 0;
    powerDurTimer = [0,0,0,0,0];
    puDiam = 20;
    puIncFireSpeed=false;
    puIncAtk=false;
    puDecEnBulSpawnSpeed=false;
    powerSpawn = 9;
    powerDur = 10;
    //Setup items
    enemy = new Enemy(enemyX + random(-100,100),enemyY + random(-100,100) , enemyHealth, difficulty);
    player = new Player(width / 2, 4 * windowHeight / 5, playerDX, playerDY,upKey,downKey,leftKey,rightKey);
    for (let i = 0; i < bulletCount; i++)
    {
        enemyBullet = new EnemyBullet(enemy.x, enemy.y, i)
        enemyBullet.setSpeed();
        enemyBullets.push(enemyBullet)
    }

  }