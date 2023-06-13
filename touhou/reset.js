function reset(){
    let playerX = player.x;
    let playerY = player.y;
    player = new Player(playerX, playerY, playerDX, playerDY,upKey,downKey,leftKey,rightKey);
    enemy = new Enemy(enemyX + random(-100,100),enemyY + random(-100,100) , enemyHealth, difficulty);
    necBul+= enemyHealth/playerDmg;
    playerBullets.length = 0;
    enemyBullets.length = 0;
    enemyBullets2.length = 0;
    enemyBullets3.length = 0;
    for (let i = 0; i < bulletCount; i++)
    {
         enemyBullet = new EnemyBullet(enemy.x, enemy.y, i)
         enemyBullet.setSpeed();
         enemyBullets.push(enemyBullet)
    }
    enemyBullet2 = new EnemyBullet2(enemy.x, enemy.y, player);
    enemyBullet2.setSpeed();
    enemyBullets2.push(enemyBullet2);
    enemyBullet3 = new EnemyBullet3(enemy.x, enemy.y, player);
    enemyBullet3.setSpeed();
    enemyBullets3.push(enemyBullet3);
    spawnTimer = 0;
    bulletTimer = 0;
  }