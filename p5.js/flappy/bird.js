class Bird {
    constructor(img,x,y,){
        this.img = img;
        this.width = img.width;
        this.height = img.height;

        this.x = x;
        this.y = y;

        this.dy = 0;
        this.gravity = 0.2;
    }

    display(){
        image(this.img, this.x, this.y);
    }

    update(){
        this.dy += this.gravity;
        this.y += this.dy;
        this.y = constrain(this.y, 0, 248);
    }

    reset(y){
        this.y = y;
        this.dy = 0;
        this.gravity = 0.2;
    }

    jump(){
        this.dy = -3;
        this.gravity += 0.0005;
    }

    collides(pipe){
        if(this.x + 3 > pipe.x + pipe.width / 1.5 || pipe.x > this.x + this.width - 2) {
            return false;
        }
        if(this.y + 4 > pipe.y - pipe.gap && pipe.y > this.y + this.height - 4) {
            return false;
        }
        return true;
    }
}