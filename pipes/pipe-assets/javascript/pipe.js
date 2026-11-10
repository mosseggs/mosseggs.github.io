class Pipe {
  constructor(dir, cdir) {
    this.dir = int(dir);
    this.cdir = int(cdir);
  }

  rotate() {
    if (this.dir == 4) {
      this.dir = 0;
    }
    this.dir += 1;
  }

  isCorrect() {
    return this.cdir == this.dir;
  }
}

class EndPipe extends Pipe{
  constructor(name, dir, cdir) {
    super(dir, cdir);
    this.name = name.split(" ");
    this.longest = this.name[0].length;
    for (let i = 0; i < this.name.length; i++) {
      if (this.longest < this.name[i].length) {
        this.longest = this.name[i].length;
      }
    }
  }

  display(x,y) {
    rectMode(CENTER)
    let posX = (x * scale)  + (scale * 6) / 8;
    let posY = (y * scale)  + (scale * 6) / 8;
    fill(204);
    stroke(0);
    square(posX, posY, scale);
    noStroke();
    fill(255, 0, 0);
    circle(posX, posY, scale * 3 / 4);
    if(this.dir == 1) {
      rect(posX, posY - scale * 11/32, scale / 4, scale / 3);
    } else if (this.dir == 2) {
      rect(posX + scale * 11/32, posY , scale / 3, scale / 4);
    } else if (this.dir == 3) {
      rect(posX, posY + scale * 11/32 , scale / 4, scale / 3);
    } else if (this.dir == 4) {
      rect(posX - scale * 11/32, posY, scale / 3, scale / 4);
    }
    noFill();
    textAlign(CENTER, CENTER);
    textFont('Verdana');
    fill(255);
    for (let i = 0; i < this.name.length; i++) {
      textSize(12 - (this.longest / 2));
      text(this.name[i], posX, posY - (scale * this.name.length * 1 / (15)) + (scale  * i  / (5)));
    }
    noFill();
  }
}

class MidPipe extends Pipe {
  constructor(sides, dir,cdir) {
    super(dir, cdir);
    this.sides = sides;
  }

  isCorrect() {
    if(this.sides == 2) {
      return (this.cdir % 2) == (this.dir % 2);
    } else if (this.sides == 4) {
      return true;
    } else {
      return int(this.cdir) == int(this.dir);
    }
  }

  display(x,y) {
    rectMode(CENTER)
    let posX = (x * scale)  + (scale * 6) / 8;
    let posY = (y * scale)  + (scale * 6) / 8;
    fill(204);
    stroke(0);
    square(posX, posY, scale);
    noStroke();
    fill(255, 0, 0);
    if(this.dir == 1) {
      if(this.sides == 3) {
        rect(posX + scale / 4, posY , scale/2, scale / 4);
      } else if(this.sides == 4) {
        rect(posX, posY , scale, scale / 4);
      }
      if (this.sides != 1) {
        if (this.sides != 2) {
          stroke(0);
          square(posX,posY, scale/4);
          noStroke();
        }
        rect(posX, posY , scale / 4, scale);
      } else {
        rect(posX + scale / 4, posY , scale / 2, scale / 4);
        rect(posX, posY - scale / 4, scale / 4, scale / 2);
        circle(posX,posY, scale/4)
      }

    } else if (this.dir == 2) {
      if(this.sides == 3) {
        rect(posX, posY + scale / 4, scale/4, scale / 2);
      } else if(this.sides == 4) {
      rect(posX, posY, scale / 4, scale);
      }

      if (this.sides != 1) {
        if (this.sides != 2) {
          stroke(0);
          square(posX,posY, scale/4);
          noStroke();
        }
        rect(posX, posY , scale, scale / 4);
      } else {
        rect(posX + scale / 4, posY , scale / 2, scale / 4);
        rect(posX, posY + scale / 4, scale / 4, scale / 2);
        circle(posX,posY, scale/4)
      }

    } else if (this.dir == 3) {
      if(this.sides == 3) {
        rect(posX - scale / 4, posY , scale/2, scale / 4);
      } else if(this.sides == 4) {
        rect(posX, posY , scale, scale / 4);
      }

      if (this.sides != 1) {
        if (this.sides != 2) {
          stroke(0);
          square(posX,posY, scale/4);
          noStroke();
        }
        rect(posX, posY , scale / 4, scale);
      } else {
        rect(posX - scale / 4, posY , scale / 2, scale / 4);
        rect(posX, posY + scale / 4, scale / 4, scale / 2);
        circle(posX,posY, scale/4)
      }

    } else if (this.dir == 4) {
      if(this.sides == 3) {
        rect(posX, posY - scale / 4, scale/4, scale / 2);
      } else if(this.sides == 4) {
      rect(posX, posY, scale / 4, scale);
      }
      if (this.sides != 1) {
        if (this.sides != 2) {
          stroke(0);
          square(posX,posY, scale/4);
          noStroke();
        }
        rect(posX, posY , scale, scale / 4);
      } else {
        rect(posX - scale / 4, posY , scale / 2, scale / 4);
        rect(posX, posY - scale / 4, scale / 4, scale / 2);
        circle(posX,posY, scale/4)
      }
    }
    noFill();
    noStroke();
  }
}