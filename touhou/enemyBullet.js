class EnemyBullet{
    constructor(x, y, dirNum, bulletCount){
      this.x = x;
      this.y = y;
      this.speed = 2;
      this.dy = 0;
      this.dx = 0;
      this.diameter = 5 * 2;
      this.directionalNumber = dirNum;//The number that tracks which out of the 8 balls this is to track its direction
      this.goingLeft = true;
      this.goingDown = true;
    }
    display() {
        noStroke();
        fill(255,0,0);
        circle(this.x, this.y , this.diameter);
    }
    setSpeed(){
        //Mathmatically calculates the number of bullets and creates a shape where each direction in equidistant from the next for each directional number
        //Since 2pi is a circle bulletCount is divided by 2
        this.dx = this.speed * cos(this.directionalNumber * (PI/(bulletCount / 2)));
        if (this.dx > 0)
        {
            this.goingLeft = false;
        }
        this.dy = this.speed * sin(this.directionalNumber * (PI/(bulletCount / 2)));
        if (this.dy < 0)
        {
            this.goingDown = false;
        }
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;
    }
    bounce(){
        if (this.x < 0 && this.goingLeft)
        {
            this.dx = -this.dx;
            this.goingLeft = !this.goingLeft;
        }
        else if (this.x > width && !this.goingLeft)
        {
            this.dx = -this.dx
            this.goingLeft = !this.goingLeft;
        }
        if (this.y < 0 && !this.goingDown)
        {
            this.dy = -this.dy;
            this.goingDown = !this.goingDown;
        }
        else if (this.y > height && this.goingDown)
        {
            this.dy = -this.dy
            this.goingDown = !this.goingDown;
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



