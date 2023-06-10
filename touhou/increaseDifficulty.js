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
    case 5:
      increaseEnemyHealth();
      break;
  }
}




function increaseFireSpeed()
{
  //INcreases the delay betweem shots
    fireSpeed += .075;
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
    enemy.speed += 4;
    enemy.angleIncrease += .075;
}
function increaseEnemyHealth()
{
    enemyHealth+=50;
}