class Dummy{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.diameter = 20;
        this.constraintx1 = x - this.diameter * 3;
        this.constraintx2 = x + this.diameter * 3;
    }

    display(){
        noStroke();
        fill(9,0,255);
        circle(this.x,this.y,this.diameter);
    }

    update(){
        if(random(-1,2) > 1 && random(-1,2) > 1){
            this.x += random(0,2) > 1 ? -random(1,5) : random(1,5);
        }
        if(this.x - this.diameter/2 <= this.constraintx1){
            this.x = this.constraintx1 + this.diameter;
        }
        else if(this.x+this.diameter/2 >= this.constraintx2){
            this.x = this.constraintx2 - this.diameter;
        }
    }
 }