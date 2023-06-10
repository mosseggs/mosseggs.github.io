function tutorial(){
    textAlign(CENTER);
    textFont(font);
    fill(255);
    noStroke();
    textSize(30);
    text("Hi welcome to our game, I hope you enjoy", width/2, height * 1/20);
    text("You can move & shoot ", width/2, height * 2.5/20);
    text("using your preffered keys,", width/2, height * 3.5/20);
    text("changable in the settings", width/2, height * 4.5/20);
    text("The enemy gets more difficult as ", width/2, height * 6/20);
    text("the game progressses and has 3 patterns:", width/2, height * 7/20);
    text("circling, zigzag, and tracking", width/2, height * 8/20);
    //buttons
    back.display();
    p1.display();
    p2.display();
    p3.display();
    //enemy & dummy examples
    circler.display();
    zigzag.display();
    dasher.display();
    dummy1.display();
    dummy2.display();
    dummy3.display();
    circler.update(dummy1);
    zigzag.update(dummy2);
    dasher.update(dummy3);
    dummy1.update();
    dummy2.update();
    dummy3.update();
    if(dasher.y >= dummy3.y - dasher.diameter/2 ){
      dasher = new TestEnemy(width * 3/4, height * 4/8, "dash");
    }
    //button physics
    if(mouseX < back.x + back.w/2 && mouseX > back.x - back.w/2 && mouseY < back.y + back.h/2 && mouseY > back.y - back.h/2 && mouseIsPressed === true && mouseRel == true){
      gameState = "title";
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
    if(mouseX < p3.x + p3.w/2 && mouseX > p3.x - p3.w/2 && mouseY < p3.y + p3.h/2 && mouseY > p3.y - p3.h/2 && mouseIsPressed === true && mouseRel == true){
      gameState = "guide3";
      p1.state = false;
      p2.state = false;
      p3.state = true;
      mouseRel = false;
    }
    if(mouseIsPressed === false){
      mouseRel = true;
    }
  }