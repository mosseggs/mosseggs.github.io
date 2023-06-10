class Button{
    constructor(row, y, name, w, h, offset) {
      this.x = 0;
      this.y = y;
      this.row = row;
      this.offset = offset;
      this.w = w;
      this.h = h;
      this.name = name;
      this.state = false;
    }

    display() {
      if(this.row =="left"){
        this.x = (width/2) - this.offset;
      }
      else if(this.row == "right"){
        this.x = (width/2) + this.offset;
      }
      else if(this.row == "middle"){
        this.x = width/2;
      }
      rectMode(CENTER);
      if(this.state == false){
        fill(255);
      }
      else{
        fill(100);
      }
      rect(this.x, this.y, this.w, this.h);
      fill(0);
      textAlign(CENTER,CENTER);
      textSize(40);
      text(this.name,this.x + 3,this.y - 3);
    }
  }
