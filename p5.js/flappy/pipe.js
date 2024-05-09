class Pipe {
    constructor(img){
        this.img = img;
        this.x = 500;
        this.y = random(100,200);
        this.width = img.width;
        this.height = img.height;
        this.scroll = -1;
        this.a = 0.1;
        this.b = -0.1;
        this.c = 0;
        this.gap = random(80,100);
        this.scored = false;
        this.used = false;

    }

    update(){
        this.x += this.scroll;
        this.y += random(-1,1) > 0 ? this.a: this.b;
        this.c++;
        if(this.c >= 90){
            this.a = this.a * 1.8;
            this.b = this.b * 1.8;
            this.scroll -= random(0.1,0.9);
            this.c = 0;
        }
    }

    display(){
        image(this.img, this.x, this.y, this.width / 1.5, this.height / 1.5);
        push();
        scale(1,-1);
        image(this.img, this.x, this.gap - this.y, this.width / 1.5, this.height / 1.5);
        pop();
    }
}