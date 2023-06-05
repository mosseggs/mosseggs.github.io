class Enemy {
    constructor(x,y,health,difficulty){
        this.x = x;
        this.y = y;
        this.health = health;
        this.maxHealth = health;
        this.diameter = 50;
        this.collision = 0;
        this.angle = 0;
        this.angleDir=1;
        this.angleTimer=0;
        this.anglePath = 100;
        this.anglePathTimer=0;
        this.centerX = width/2;
        this.centerY = height/2;
        this.path = "start";
        this.start = 0;
        this.pathTimer = 0;
        this.angleIncrease = 0.05;
        this.speed=3;
        this.zigEraticity = 1.5;
        this.difficulty = difficulty;
        this.dashTimer = 0;
        this.dashX = 0;
        this.dashY = 0;
        this.dashReady = false;
        this.faceColor = difficulty * 10;
    }

    display(){
        //enemy itself
        //face gets more red the higher difficulty is
        if(this.difficulty * 10 <= 80 && this.difficulty * 10 >= 0){
            this.faceColor = this.difficulty * 10;
        }
        else{
            this.faceColor = 80;
        }
        colorMode(HSL);
        fill(color(0, 100, 100-this.faceColor));
        ellipse(this.x, this.y, this.diameter);
        colorMode(RGB);
        //face
        if(this.path == "circle" || this.path == "dash"){
            //thunder and lightning very very frightening
            if(this.path == "dash"){
                if(this.dashReady == false){
                    colorMode(RGB);
                    noFill();
                    stroke(0,255,255);
                    strokeWeight(2);
                    quad(this.x + random(11,13) * random(-5,5),this.y + random(11,13) * random(-5,5),this.x + random(11,13) * random(-5,5),this.y + random(11,13) * random(-5,5),this.x + random(11,13) * random(-5,5),this.y  + random(11,13) * random(-5,5),this.x  + random(11,13) * random(-5,5),this.y  + random(11,13) * random(-5,5));
                    quad(this.x + random(11,13) * random(-5,5),this.y + random(11,13) * random(-5,5),this.x + random(11,13) * random(-5,5),this.y + random(11,13) * random(-5,5),this.x + random(11,13) * random(-5,5),this.y  + random(11,13) * random(-5,5),this.x  + random(11,13) * random(-5,5),this.y  + random(11,13) * random(-5,5));
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
            ellipse(this.x + 10, this. y - 10, this.diameter/5);
            ellipse(this.x - 10, this. y - 10, this.diameter/5);
            //mouth
            //mouth gets more frowny as difficulty gets higher
            if(30 - difficulty * 10 > 0){
                arc(this.x, this.y + 2 + difficulty * 1.5, 30, 30 - difficulty * 10, 0, PI, CHORD);
            }
            else if(30 == difficulty * 10){
                rectMode(CENTER);
                rect(this.x, this.y + 2 + difficulty* 1.5, 30, 2);
            }
            else if (30 < difficulty * 10 && difficulty < 7){
                arc(this.x, this.y + 2 + difficulty * 1.5, 30, 30 - difficulty * 10, PI, TWO_PI, CHORD);
            }
            else{
                arc(this.x, this.y + 2 + 9, 30, 30, PI, TWO_PI, CHORD);
            }
            //bowtie :D
            fill(100,255,9);
            quad(this.x - this.diameter/2 + 2, this.y - this.diameter/2 - 1, this.x - this.diameter/4, this.y - this.diameter/2 + 3, this.x - this.diameter/2 - 10, this.y-5, this.x - this.diameter/2, this.y );
            quad(this.x + this.diameter/2 - 2, this.y - this.diameter/2 - 1, this.x + this.diameter/4, this.y - this.diameter/2 + 3, this.x + this.diameter/2 + 10, this.y-5, this.x + this.diameter/2, this.y);

        }
        if(this.path == "zig"){
            //bowtie :D
            fill(100,255,9);
            quad(this.x - this.diameter/2 + 2, this.y + this.diameter/2 - 1, this.x - this.diameter/4, this.y + this.diameter/2 - 3, this.x - this.diameter/2 - 10, this.y+5, this.x - this.diameter/2, this.y );
            quad(this.x + this.diameter/2 - 2, this.y + this.diameter/2 - 1, this.x + this.diameter/4, this.y + this.diameter/2 - 3, this.x + this.diameter/2 + 10, this.y+5, this.x + this.diameter/2, this.y);
        }
        //health bg
        fill(255);
        rectMode(CENTER);
        rect(width/2, 20, width/2, 20, width - 10);
        //health
        fill(255,0,0);
        rectMode(CORNER);
        rect(width/4,10,map(this.health, 0,this.maxHealth, 0, width/2),20,width-10);
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

    update(player){
        //starting path decision
        if(this.path == "start"){
            this.start = floor(random(1,4));
            switch(this.start){
                case 1:
                    this.path = "circle";
                    break;
                case 2:
                    this.path = "zig";
                    break;
                case 3:
                    this.path = "dash";
                    break;
            }
        }
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
                this.centerX = random(this.anglePath + this.diameter, width - this.anglePath - this.diameter);
                this.centerY = random(this.anglePath + this.diameter, height - this.anglePath - this.diameter);
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
            if(this.y >= height - this.diameter/2){
                this.angle = 0;
                this.x = random(25 + this.diameter, width - 25 - this.diameter);
                this.y = this.diameter;
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
        //Decides what pathing the enemy should take
        if(this.pathTimer >= 10){
            if(this.path == "circle"){
                this.path = random(0,2) > 1 ? "zig": "dash";
                if(this.path == "zig"){
                    this.speed = 3;
                }
                else{
                    this.speed = 5;
                }
            }
            else if(this.path == "zig"){
                this.path = random(0,2) > 1 ? "circle": "dash";
                if(this.path == "circle"){
                    this.speed = 0;
                }
                else{
                    this.speed = 5;
                }
            }
            else if(this.path == "dash"){
                this.path = random(0,2) > 1 ? "circle": "zig";
                if(this.path == "circle"){
                    this.speed = 0;
                }
                else{
                    this.speed = 3;
                }
            }
            this.pathTimer = 0;
        }
        this.pathTimer += 1/60;
    }
}