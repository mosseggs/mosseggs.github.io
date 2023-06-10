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
          upKey = keyCode;
          if(keyCode == 32){
            up = "space";
          }else{
            up = key;
          }
          keyLog = 0;
          keyLock = false;
          keyRel = false;
          break;
        case player.left:
          player.left = keyCode;
          leftKey = keyCode;
          if(keyCode == 32){
            left = "space";
          }else{
            left = key;
          }
          keyLog = 0;
          keyLock = false;
          keyRel = false;
          break;
        case player.down:
          player.down = keyCode;
          downKey = keyCode;
          if(keyCode == 32){
            down = "space";
          }else{
            down = key;
          }
          keyLog = 0;
          keyLock = false;
          keyRel = false;
          break;
        case player.right:
          player.right = keyCode;
          rightKey = keyCode;
          if(keyCode == 32){
            right = "space";
          }else{
            right = key;
          }
          keyLog = 0;
          keyLock = false;
          keyRel = false;
          break;
        case shootButton:
          shootButton = keyCode;
          if(keyCode == 32){
            shoot = "space";
          }else{
            shoot = key;
          }
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