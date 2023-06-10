class Bullet2{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.diameter = 10 * 1.5;
        this.pos = createVector(this.x,this.y);
        this.vel = createVector(this.dx,this.dy);
        this.direction = createVector(mouseX,mouseY);
        this.speed = 2;
        this.damage = 10;
    }
    display(){
        fill(50,50,255);
        circle(this.pos.x, this.pos.y , this.diameter);
    }
    setSpeed(){
        let mouseDir = createVector(this.direction.x, this.direction.y).sub(this.pos);
        let dirOffset = p5.Vector.add(this.pos, mouseDir);
        this.vel = mouseDir;
        this.vel.setMag(this.speed);
        this.vel.initialPos = dirOffset;
        this.vel.pos = this.vel.initialPos.copy();
        this.vel.normalize();
        this.vel.mult(5);
    }
    update() {
        this.pos.add(this.vel);
    }
    collides(object){
        if (dist(this.pos.x, this.pos.y, object.x, object.y) < ((this.diameter/2) + (object.diameter/2)))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
 }

