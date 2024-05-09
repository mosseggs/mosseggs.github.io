var posX = Math.floor((Math.random() * 15) + 1);
var posY = Math.floor((Math.random() * 15) + 1);
var dirX = 1;
var dirY = 1;
var x = 0;
var y = 0;
let img;
function preload() {
  img = loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8j2ZvogClZN_eBG7qKeZUCcHweqjjsulAsOGOzKvhkQ2iEEzF');
}

function setup() {
  createCanvas(1440, 789);
  tint(Math.floor((Math.random() * 256) + 1),Math.floor((Math.random() * 256) + 1),Math.floor((Math.random() * 256) + 1));
}

function draw() {
  background(000);
  // put your code for drawing here
  x = x + (posX * dirX);
  y = y + (posY * dirY);
  rect(x,y,50,50);

  image(img, x, y, 1440, 1440);
  if(x >= 1)
  {
    posX = Math.floor((Math.random() * 1000) + 1);
    dirX = -1;
    tint(Math.floor((Math.random() * 256) + 1),Math.floor((Math.random() * 256) + 1),Math.floor((Math.random() * 256) + 1));
  }
  if(x <= 0)
  {
    posX = Math.floor((Math.random() * 1000) + 1);
    dirX = 1;
    tint(Math.floor((Math.random() * 256) + 1),Math.floor((Math.random() * 256) + 1),Math.floor((Math.random() * 256) + 1));
  }
  if(y >= -651)
  {
    posY = Math.floor((Math.random() * 1000) + 1);
    dirY =-1;
    tint(Math.floor((Math.random() * 256) + 1),Math.floor((Math.random() * 256) + 1),Math.floor((Math.random() * 256) + 1));
  }
  if(y <= 0)
  {
    posY = Math.floor((Math.random() * 1000) + 1);
    dirY =1;
    tint(Math.floor((Math.random() * 256) + 1),Math.floor((Math.random() * 256) + 1),Math.floor((Math.random() * 256) + 1));
  }
  tint(Math.floor((Math.random() * 256) + 1),Math.floor((Math.random() * 256) + 1),Math.floor((Math.random() * 256) + 1));
}
