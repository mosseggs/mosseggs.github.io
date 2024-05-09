let bubble = [];
let w=1440;
let h=789;
let n=100000;

function setup() {
    createCanvas(w,h);
    for(let i = 0; i < n; i++) {
        let bubbleSize = random(100, 200);
        let minX=bubbleSize;
        let minY=bubbleSize;
        let maxX=w-bubbleSize;
        let maxY=h-bubbleSize;
        bubble[i] = {
            x:random(minX, maxX),
            y:random(minY, maxY),
            size:bubbleSize,
            color: {
                r:random(255),
                g:random(255),
                b:random(255)
            }
        };
    }
}

function draw() {
  background(0);
  for(let i = 0; i < n; i++) {
    fill(bubble[i].color.r,bubble[i].color.g,bubble[i].color.b);
    circle(bubble[i].x, bubble[i].y, bubble[i].size);
    bubble[i].x += random(-100, 100);
    bubble[i].y += random(-100, 100);
    if(bubble[i].x <= bubble[i].size)
    {
        bubble[i].x = bubble[i].size;
    }
    if(bubble[i].y <= bubble[i].size)
    {
        bubble[i].y = bubble[i].size;
    }
    if(bubble[i].x >= w - bubble[i].size)
    {
        bubble[i].x = w - bubble[i].size;
    }
    if(bubble[i].y >= h - bubble[i].size)
    {
        bubble[i].y = h - bubble[i].size;
    }
  }
}