class Bullet{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.dy = 5;
        this.diameter = 10;
    }
    display(){
        fill(50,50,255);
        circle(this.x,this.y,this.diameter);
    }
    update(){
        this.y-=this.dy;
    }
    collides(object){
        if (dist(this.x, this.y, object.x, object.y) < ((this.diameter/2) + (object.diameter/2)))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
 }

