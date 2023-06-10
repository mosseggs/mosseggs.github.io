class EnemyBullet3{
    constructor(x, y, player){
      this.x = x;
      this.y = y;
      this.speed = 2;
      this.dy = 0;
      this.dx = 0;
      this.diameter = 10;
      this.pos = createVector(this.x,this.y);
      this.vel = createVector(this.dx,this.dy);
      this.player = createVector(player.x,player.y);
      this.speed = 2;
      this.timer = 0;
      this.limit = 2;
      this.damage = 10;
    }
    display() {
        noStroke();
        colorMode(HSL);
        fill(293,52,73);
        colorMode(RGB)
        circle(this.pos.x, this.pos.y , this.diameter);
    }
    setSpeed(){
        this.player = createVector(player.x,player.y);
        let playerDir = createVector(this.player.x, this.player.y).sub(this.pos);
        let dirOffset = p5.Vector.add(this.pos, playerDir);
        this.vel = playerDir;
        this.vel.setMag(this.speed);
        this.vel.initialPos = dirOffset;
        this.vel.pos = this.vel.initialPos.copy();
    }
    update() {
        this.pos.add(this.vel);
        if(this.timer >= this.limit){
            this.speed += 1;
            this.damage = this.speed * 5;
            this.limit -= 1/20;
            this.setSpeed();
            this.timer = 0;
        }
        this.timer += 1/60;
    }
    bounce(){
        if ((this.pos.x < 0) || (this.pos.x > width))
        {
            this.vel.x = -this.vel.x;
            this.speed += 1;
            this.damage = this.speed * 5;
            this.limit -= 1/20;
        }
        if ((this.pos.y < 0) || (this.pos.y > height))
        {
            this.dy = -this.dy;
            this.speed += 1;
            this.damage = this.speed * 5;
            this.limit -= 1/20;
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



