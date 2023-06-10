class TestEnemy {
    constructor(x,y,path){
        this.x = x;
        this.y = y;
        this.diameter = 30;
        this.angle = 0;
        this.angleDir=1;
        this.angleTimer=0;
        this.anglePath = 80;
        this.anglePathTimer=0;
        this.centerX = x;
        this.centerY = y - this.diameter;
        this.path = path;
        this.start = 0;
        this.pathTimer = 0;
        this.angleIncrease = 0.05;
        this.speed=3;
        this.zigEraticity = 1.5;
        this.dashTimer = 0;
        this.dashX = 0;
        this.dashY = 0;
        this.dashReady = false;
        this.scale = this.diameter/50;
    }

    display(){
        //enemy itself
        //face gets more red the higher difficulty is
        fill(255);
        ellipse(this.x, this.y, this.diameter);
        //face
        if(this.path == "circle" || this.path == "dash"){
            //thunder and lightning very very frightening
            if(this.path == "dash"){
                if(this.dashReady == false){
                    colorMode(RGB);
                    noFill();
                    stroke(0,255,255);
                    strokeWeight(2);
                    quad(this.x + random(11 * this.scale,13 * this.scale) * random(-5,5),this.y + random(11 * this.scale,13 * this.scale) * random(-5,5),this.x + random(11 * this.scale,13 * this.scale) * random(-5,5),this.y + random(11 * this.scale,13 * this.scale) * random(-5,5),this.x + random(11 * this.scale,13 * this.scale) * random(-5,5),this.y  + random(11 * this.scale,13 * this.scale) * random(-5,5),this.x  + random(11 * this.scale,13 * this.scale) * random(-5,5),this.y  + random(11 * this.scale,13 * this.scale) * random(-5,5));
                    quad(this.x + random(11 * this.scale,13 * this.scale) * random(-5,5),this.y + random(11 * this.scale,13 * this.scale) * random(-5,5),this.x + random(11 * this.scale,13 * this.scale) * random(-5,5),this.y + random(11 * this.scale,13 * this.scale) * random(-5,5),this.x + random(11 * this.scale,13 * this.scale) * random(-5,5),this.y  + random(11 * this.scale,13 * this.scale) * random(-5,5),this.x  + random(11 * this.scale,13 * this.scale) * random(-5,5),this.y  + random(11 * this.scale,13 * this.scale) * random(-5,5));
                    noStroke();
                    strokeWeight(0);
                    colorMode(HSL);
                    fill(color(0, 100, 100-this.faceColor));
                    ellipse(this.x, this.y, this.diameter);
                    colorMode(RGB);
                }
            }
            colorMode(RGB);
            noStroke();
            strokeWeight(0);
            ellipse(this.x, this.y, this.diameter);
            //eyes
            fill(0);
            ellipse(this.x + 10 * this.scale, this. y - 10* this.scale, this.diameter/5);
            ellipse(this.x - 10* this.scale, this. y - 10* this.scale, this.diameter/5);
            //mouth
            arc(this.x, this.y + 2 + difficulty * 1.5, 30 * this.scale , 30 * this.scale, 0, PI, CHORD);
            //bowtie :D
            fill(100,255,9);
            quad(this.x - this.diameter/2 + 2 * this.scale, this.y - this.diameter/2 - 1 * this.scale, this.x - this.diameter/4, this.y - this.diameter/2 + 3 * this.scale, this.x - this.diameter/2 - 10 * this.scale, this.y-5 * this.scale, this.x - this.diameter/2, this.y );
            quad(this.x + this.diameter/2 - 2 * this.scale, this.y - this.diameter/2 - 1 * this.scale, this.x + this.diameter/4, this.y - this.diameter/2 + 3 * this.scale, this.x + this.diameter/2 + 10 * this.scale, this.y-5 * this.scale, this.x + this.diameter/2, this.y);

        }
        if(this.path == "zig"){
            //bowtie :D
            fill(100,255,9);
            quad(this.x - this.diameter/2 + 2 * this.scale, this.y + this.diameter/2 - 1 * this.scale, this.x - this.diameter/4, this.y + this.diameter/2 - 3 * this.scale, this.x - this.diameter/2 - 10 * this.scale, this.y+5 * this.scale, this.x - this.diameter/2, this.y );
            quad(this.x + this.diameter/2 - 2 * this.scale, this.y + this.diameter/2 - 1 * this.scale, this.x + this.diameter/4, this.y + this.diameter/2 - 3 * this.scale, this.x + this.diameter/2 + 10 * this.scale, this.y+5 * this.scale, this.x + this.diameter/2, this.y);
        }
    }

    update(player){
        //constrain
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

        //pathing
        if(this.path == "circle"){
            //moves the enemy in a circle
            this.x = this.centerX + this.anglePath * cos(this.speed);
            this.y = this.centerY + this.anglePath * sin(this.speed);
            this.speed+= this.angleDir * this.angleIncrease;
            //randomizes location + possibility to change directions within bounds of the screen every 2 seconds
            if(this.angleTimer >= 2){
                this.angleDir = random(0,2) > 1 ? -1 : 1;
                this.centerX = random(this.anglePath + this.diameter, (width * 3 / 8) - this.anglePath - this.diameter);
                this.centerY = random((height / 2) + this.anglePath + this.diameter, (height * 3 / 4) - this.anglePath - this.diameter);
                this.angleTimer = 0;
            }
            //randomly increases distance from the center every 1/2 a seconc
            if(this.anglePathTimer >= 0.5){
                this.anglePath += random(0,2) > 1 ? -1 : 1;
                this.anglePathTimer = 0;
            }
            this.angleTimer += 1/60;
            this.anglePathTimer += 1/60;
        }
        else if(this.path == "zig"){
            //goes back and forth
            this.x = this.x + (tan(cos(this.angle)) * 5 * random(1, this.zigEraticity));
            this.y += this.speed;
            this.angle += 0.1;
            //when enemy reaches the bottom, spawn it back at the top at a random x
            if(this.y >= height * 3/4){
                this.angle = 0;
                this.x = random(width/2 - this.diameter, width/2 + this.diameter);
                this.y = height/2;
            }
        }
        else if(this.path == "dash"){
            //create vectors
            let enemyLocation = createVector(this.x,this.y);
            let target = createVector(this.dashX,this.dashY);
            //after 3 seconds, if the enemy isnt already dashing, track where the player is and start dashing
            if(this.dashTimer >= 3 && this.dashReady == false){
                this.dashY = player.y;
                this.dashX = player.x;
                target = createVector(this.dashX,this.dashY);
                this.dashReady = true;
                this.dashTimer = 0;
            }
            //start dashing
            if(this.dashReady == true){
                //track the distance between the player and enemy
                let distance = target.dist(enemyLocation);
                //sets speed of dash
                let mappedDistance = map(distance, 100, 0, this.speed, this.speed);
                //tracks what direction the player is in
                target.sub(enemyLocation);
                //set length of vector to 1, it hink this just crushes the info a bit?
                target.normalize();
                //actually uses speed of dash
                target.mult(mappedDistance);
                //moves the fucker to the player i think;
                enemyLocation.add(target);
                this.x = enemyLocation.x;
                this.y = enemyLocation.y;
                //stops dashing
                if(dist(this.x, this.y, this.dashX, this.dashY) < player.diameter/2){
                    this.dashReady = false;
                }
            }
            this.dashTimer += 1/60;
        }
    }
}