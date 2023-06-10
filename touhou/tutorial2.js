function tutorial2(){
    textAlign(CENTER);
    textFont(font);
    fill(255);
    noStroke();
    //enemy bullet explanation
    textSize(30);
    text("The enemy can shoot 3 kinds of bullets", width/2, height * 2/20);
    colorMode(HSL);
    fill(0,67,47);
    ellipse(width * 1 / 8,height * 3/20,20,20);
    fill(293,52,73);
    ellipse(width * 1 / 8,height * 4.5/20,20,20);
    colorMode(RGB);
    fill(255,0,0);
    ellipse(width * 1 / 8,height * 6/20,20,20);
    fill(255);
    textSize(20);
    textAlign(LEFT);
    text("Normal Bullets that fire at you", width * 5/32, height * 3/20);
    text("Fly Bullets: will track your position every 2 seconds,", width * 5/32, height * 4.25/20);
    text("and gets faster when they miss", width * 5/32, height * 4.75/20);
    text("Ring Bullets: will shoot a ring of bullets", width * 5/32, height * 5.5/20);
    text("with more bullets as the difficulty increases.", width * 5/32, height * 6/20);
    text("Activate on difficulty 2", width * 5/32, height * 6.5/20);
    textAlign(CENTER);
    //powerup explanation
    textSize(30);
    text("At the 3rd level, difficulty level 2", width/2, height * 9/20);
    text("you can gain powerups", width/2, height * 10/20);
    fill(0,255,0);
    ellipse(width * 2 / 8,height * 11/20,20,20);
    fill(132, 0, 255);
    ellipse(width * 2 / 8,height * 12/20,20,20);
    fill(0,253,255);
    ellipse(width * 2 / 8,height * 13/20,20,20);
    fill(137,129,118);
    ellipse(width * 2 / 8,height * 14/20,20,20);
    fill(255);
    textAlign(LEFT);
    textSize(20);
    text("Health",width * 10/32,height * 11/20);
    text("Attack Up",width * 10/32,height * 12/20);
    text("Fire Speed Up",width * 10/32,height * 13/20);
    text("Enemy Fire Speed Down",width * 10/32,height * 14/20);
    textAlign(CENTER);

    //button displays
    back.display();
    p1.display();
    p2.display();
    p3.display();
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