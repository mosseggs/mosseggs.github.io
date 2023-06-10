function tutorial3(){
    textAlign(CENTER);
    textFont(font);
    fill(255);
    noStroke();
    textSize(40);
    text("Baby Mode", width/2, height * 1/20);
    text("Features of Baby Mode", width/2, height * 5/20);
    textSize(30);
    text("In the bottom left is the baby mode button.", width/2, height * 2.5/20);
    text("This activates the easier method of play", width/2, height * 3.5/20);
    text("You can control where", width/2, height * 6/20);
    text("you shoot with the mouse", width/2, height * 6.75/20);
    text("You deal more damage,", width/2, height * 7.75/20);
    text("with a faster fire rate", width/2, height * 8.5/20);
    text("More powerups spawn", width/2, height * 9.5/20);
    text("Powerups are buffed", width/2, height * 10.5/20);
    text("Scoring is the same,", width/2, height * 12/20);
    text("but since it's easier to miss bullets,", width/2, height * 12.75/20);
    text("scores will be lower", width/2, height * 13.5/20);
    //button displays
    back.display();
    p1.display();
    p2.display();
    p3.display();
    //button physics
    if(mouseX < back.x + back.w/2 && mouseX > back.x - back.w/2 && mouseY < back.y + back.h/2 && mouseY > back.y - back.h/2 && mouseIsPressed === true && mouseRel == true){
      gameState = "title";
      p1.state = true;
      p2.state = false;
      p3.state = false;
      mouseRel = false;
    }
    if(mouseX < p1.x + p1.w/2 && mouseX > p1.x - p1.w/2 && mouseY < p1.y + p1.h/2 && mouseY > p1.y - p1.h/2 && mouseIsPressed === true && mouseRel == true){
      gameState = "guide";
      p1.state = true;
      p2.state = false;
      p3.state = false;
      mouseRel = false;
    }
    if(mouseX < p2.x + p2.w/2 && mouseX > p2.x - p2.w/2 && mouseY < p2.y + p2.h/2 && mouseY > p2.y - p2.h/2 && mouseIsPressed === true && mouseRel == true){
      gameState = "guide2";
      p1.state = false;
      p2.state = true;
      p3.state = false;
      mouseRel = false;
    }
    if(mouseIsPressed === false){
      mouseRel = true;
    }
  }