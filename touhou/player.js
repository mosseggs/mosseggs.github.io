class Player{
    constructor(x,y,dx,dy,u,d,l,r){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.diameter = 40;
        this.health = 100;
        this.up = u;
        this.down = 8 3;
        this.left = 65;
        this.right = 68;
    }

    display(){
        noStroke();
        fill(9,0,255);
        circle(this.x,this.y,this.diameter);

    }

    update(){
        this.x += this.dx;
        this.y += this.dy;

    }

    move(){
        if(keyIsDown(this.up)) {
            this.dy = -10;
        }
        else if(keyIsDown(this.down)) {
            this.dy = 10;
        }
        else{
            this.dy = 0;
        }
        if(keyIsDown(this.left)){
            this.dx = -10;
        }
        else if(keyIsDown(this.right)){
            this.dx = 10;
        }
        else{
            this.dx = 0;
        }
        if(this.x < this.diameter/2){
            this.x = this.diameter/2;
        }
        else if(this.x > width - this.diameter/2){
            this.x = width - this.diameter/2;
        }
        if(this.y < this.diameter/2){
            this.y = this.diameter/2;
        }
        else if(this.y > height - this.diameter/2){
            this.y = height - this.diameter/2;
        }
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