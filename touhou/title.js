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
    baby.display();
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
      p1.state = true;
      p2.state = false;
      p3.state = false;
      mouseRel = false;
    }
    if(mouseX < baby.x + baby.w/2 && mouseX > baby.x - baby.w/2 && mouseY < baby.y + baby.h/2 && mouseY > baby.y - baby.h/2 && mouseIsPressed === true && mouseRel == true){
      babyMode = !babyMode;
      baby.state = !baby.state;
      mouseRel = false;
    }
  }