class Powerup{
    constructor(x,y,diameter){
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.power = floor(random(0,3.9));
    }

    display(){
        switch(this.power){
            case 0:
                fill(0,255,0);
                break;
            case 1:
                fill(132, 0, 255);
                break;
            case 2:
                fill(0,253,255);
                break;
            case 3:
                fill(137,129,118);
                break;
        }
        ellipse(this.x,this.y,this.diameter);
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