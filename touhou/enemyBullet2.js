class EnemyBullet2{
    constructor(x, y, player){
      this.x = x;
      this.y = y;
      this.speed = 2;
      this.dy = 0;
      this.dx = 0;
      this.diameter = 10;
      this.enemyPos = createVector(x,y);
      this.pos = createVector(this.x,this.y);
      this.vel = createVector(this.dx,this.dy);
      this.player = createVector(player.x,player.y);
      this.speed = 2;
    }
    display() {
        noStroke();
        colorMode(HSL);
        fill(0,67,47);
        colorMode(RGB)
        circle(this.pos.x, this.pos.y , this.diameter);
    }
    setSpeed(){
        let playerDir = createVector(this.player.x, this.player.y).sub(this.enemyPos);
        let dirOffset = p5.Vector.add(this.enemyPos, playerDir);
        this.vel = playerDir;
        this.vel.setMag(this.speed);
        this.vel.initialPos = dirOffset;
        this.vel.pos = this.vel.initialPos.copy();
    }
    update() {
        this.pos.add(this.vel);
    }
    bounce(){
        if ((this.pos.x < 0) || (this.pos.x > width))
        {
            this.vel.x = -this.vel.x;
        }
        if ((this.pos.y < 0) || (this.pos.y > height))
        {
            this.dy = -this.dy;
        }
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
    collides2(object){
        if (dist(this.pos.x, this.pos.y, object.pos.x, object.pos.y) < ((this.diameter/2) + (object.diameter/2)))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
 }



