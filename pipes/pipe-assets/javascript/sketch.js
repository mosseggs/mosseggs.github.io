let gameState = "game";
let col = 12;
let row = 12;
let pipes = [];
let scale = 50
p5.disableFriendlyErrors = true;

function setup() {
  createCanvas(col * scale + ((4 * scale) / 8), row * scale + ((4 * scale) / 8));
  //  makeField(); // For DTM
  makePath(randomPathGen());
  makeRandom();
  describe(
    'A Pipe puzzle game, generated using prim\'s algorithm.'
  );
}

function draw() {
  background(204);
  switch (gameState) {
    case "game":
      game();
    case "end":
      end();
  }
}

function game() {
  let correct = 0;
  for(let i = 0; i < pipes.length; i++) {
    for (let j = 0; j < pipes[i].length; j++) {
      pipes[i][j].display();
      if (pipes[i][j].isCorrect(i,j)) {
        correct += 1;
      }
    }
  }
  if (correct == (col * row)) {
    gameState = "end";
  }
}

function end() {
  for(let i = 0; i < pipes.length; i++) {
    for (let j = 0; j < pipes[i].length; j++) {
      pipes[i][j].display(i,j);
    }
  }
  textAlign(CENTER, CENTER);
    textFont('Verdana');
    if(gameState == "end") {
      fill(0);
      text("Your work is finished",(col * scale + ((4 * scale) / 8)) / 2, row / 2);
      noFill();
    }

}

function mouseClicked(){
  let boxX = int((mouseX - (scale * 2) / 8) / scale);
  let boxY = int((mouseY - (2 * scale) / 8) / scale);
  if (gameState == "game") {
    pipes[boxX][boxY].rotate();
  }
}

function makeField() {
  let col1 = [];
  let col2 = [];
  let col3 = [];
  let col4 = [];
  let col5 = [];
  let col6 = [];
  let col7 = [];
  let col8 = [];
  let col9 = [];
  let col10 = [];
  let col11 = [];
  let col12 = [];

  let Mizu = new EndPipe("Mizuki Akiyama", 1, 4);
  let Miko = new EndPipe("Miko Sakura", 1, 2);
  let House = new EndPipe("Gregory House", 1, 2);
  let Pew = new EndPipe("Felix Arvid Ulf Kjellberg", 1, 1);
  let Cud = new EndPipe("Lisa Cuddy", 1, 1);
  let Sui = new EndPipe("Suisei Hoshimachi", 1, 1);
  let Wil = new EndPipe("James Evan Wilson", 1, 4);
  let John = new EndPipe("John Hamish Watson", 1, 2);
  let Ena = new EndPipe("Ena Shinonome", 1, 2);
  let Till = new EndPipe("Till", 1, 1);
  let Mark = new EndPipe("Mark Edward Fischbach", 1, 4);
  let Sean = new EndPipe("Seán William McLoughlin", 1, 4);
  let Cole = new EndPipe("Cole Cassidy", 1, 4);
  let Baku = new EndPipe("Katsuki Bakugo", 1, 4);
  let Todo = new EndPipe("Shouto Todoroki", 1, 4);
  let Lock = new EndPipe("Sherlock Holmes", 1, 4);
  let Ilya = new EndPipe("Ilya Rozanov", 1, 1);
  let Crow = new EndPipe("Crowley", 1, 3);
  let Az = new EndPipe("Aziraphael", 1, 1);
  let Gabe = new EndPipe("Gabriel Reyes", 1, 4);
  let Klav = new EndPipe("Klavier Gavin", 1, 4);
  let Apollo = new EndPipe("Apollo Justice", 1, 2);
  let Cas = new EndPipe("Castiel", 1, 4);
  let Jack = new EndPipe("Jack Morrison", 1, 1);
  let Ivan = new EndPipe("Ivan", 1, 3);
  let Dean = new EndPipe("Dean Winchester", 1, 2);
  let Deku = new EndPipe("Izuku Midoriya", 1, 4);
  let Shane = new EndPipe("Shane Hollander", 1, 1);

  col1.push(new MidPipe(1,1,2));
  col1.push(new MidPipe(3,1,1));
  col1.push(new MidPipe(2,1,1));
  col1.push(new MidPipe(1,1,1));
  col1.push(new MidPipe(1,1,2));
  col1.push(new MidPipe(2,1,1));
  col1.push(new MidPipe(2,1,1));
  col1.push(new MidPipe(2,1,1));
  col1.push(new MidPipe(2,1,1));
  col1.push(new MidPipe(2,1,1));
  col1.push(new MidPipe(3,1,1));
  col1.push(Pew);

  col2.push(new MidPipe(2,1,2));
  col2.push(new MidPipe(2,1,2));
  col2.push(new MidPipe(1,1,2));
  col2.push(new MidPipe(4,1,2));
  col2.push(new MidPipe(4,1,2));
  col2.push(new MidPipe(1,1,1));
  col2.push(new MidPipe(1,1,2));
  col2.push(new MidPipe(2,1,1));
  col2.push(new MidPipe(1,1,1));
  col2.push(Crow);
  col2.push(new MidPipe(4,1,2));
  col2.push(Az);

  col3.push(new MidPipe(2,1,2));
  col3.push(new MidPipe(2,1,2));
  col3.push(new MidPipe(2,1,2));
  col3.push(new MidPipe(2,1,2));
  col3.push(new MidPipe(2,1,2));
  col3.push(new MidPipe(2,1,2));
  col3.push(new MidPipe(2,1,2));
  col3.push(House);
  col3.push(new MidPipe(2,1,2));
  col3.push(new MidPipe(1,1,2));
  col3.push(new MidPipe(4,1,2));
  col3.push(new MidPipe(1,1,1));

  col4.push(new MidPipe(2,1,2));
  col4.push(new MidPipe(2,1,2));
  col4.push(Lock);
  col4.push(new MidPipe(2,1,2));
  col4.push(Sean);
  col4.push(new MidPipe(2,1,2));
  col4.push(new MidPipe(2,1,2));
  col4.push(new MidPipe(2,1,2));
  col4.push(new MidPipe(2,1,2));
  col4.push(new MidPipe(2,1,2));
  col4.push(Mark);
  col4.push(Klav);

  col5.push(Baku);
  col5.push(new MidPipe(2,1,2));
  col5.push(new MidPipe(1,1,2));
  col5.push(new MidPipe(4,1,2));
  col5.push(Till);
  col5.push(new MidPipe(2,1,2));
  col5.push(new MidPipe(2,1,2));
  col5.push(new MidPipe(3,1,2));
  col5.push(new MidPipe(4,1,2));
  col5.push(new MidPipe(4,1,2));
  col5.push(Cud);
  col5.push(Apollo);

  col6.push(new MidPipe(1,1,2));
  col6.push(new MidPipe(1,1,4));
  col6.push(new MidPipe(2,1,2));
  col6.push(Todo);
  col6.push(John);
  col6.push(new MidPipe(2,1,2));
  col6.push(new MidPipe(2,1,2));
  col6.push(Wil);
  col6.push(new MidPipe(2,1,2));
  col6.push(new MidPipe(1,1,3));
  col6.push(new MidPipe(2,1,1));
  col6.push(new MidPipe(1,1,4));

  col7.push(Deku);
  col7.push(Ena);
  col7.push(new MidPipe(1,1,3));
  col7.push(new MidPipe(1,1,1));
  col7.push(new MidPipe(1,1,3));
  col7.push(new MidPipe(1,1,4));
  col7.push(new MidPipe(2,1,2));
  col7.push(new MidPipe(1,1,2));
  col7.push(new MidPipe(4,1,2));
  col7.push(new MidPipe(2,1,1));
  col7.push(new MidPipe(2,1,1));
  col7.push(Ilya);

  col8.push(new MidPipe(1,1,2));
  col8.push(new MidPipe(4,1,3));
  col8.push(new MidPipe(3,1,1));
  col8.push(new MidPipe(4,1,3));
  col8.push(new MidPipe(2,1,1));
  col8.push(Jack);
  col8.push(Cas);
  col8.push(new MidPipe(2,1,2));
  col8.push(new MidPipe(2,1,2));
  col8.push(new MidPipe(1,1,2));
  col8.push(new MidPipe(2,1,1));
  col8.push(new MidPipe(1,1,1));

  col9.push(new MidPipe(2,1,2));
  col9.push(new MidPipe(2,1,2));
  col9.push(Gabe);
  col9.push(new MidPipe(1,1,3));
  col9.push(new MidPipe(2,1,1));
  col9.push(new MidPipe(1,1,1));
  col9.push(Miko);
  col9.push(new MidPipe(2,1,2));
  col9.push(new MidPipe(2,1,2));
  col9.push(new MidPipe(2,1,2));
  col9.push(Dean);
  col9.push(new MidPipe(2,1,2));

  col10.push(new MidPipe(2,1,2));
  col10.push(new MidPipe(1,1,3));
  col10.push(new MidPipe(2,1,1));
  col10.push(new MidPipe(2,1,1));
  col10.push(new MidPipe(1,1,1));
  col10.push(new MidPipe(2,1,2));
  col10.push(new MidPipe(2,1,2));
  col10.push(new MidPipe(2,1,2));
  col10.push(new MidPipe(1,1,3));
  col10.push(new MidPipe(4,1,2));
  col10.push(new MidPipe(1,1,4));
  col10.push(new MidPipe(2,1,2));

  col11.push(new MidPipe(2,1,2));
  col11.push(new MidPipe(1,1,2));
  col11.push(new MidPipe(2,1,1));
  col11.push(new MidPipe(2,1,1));
  col11.push(new MidPipe(1,1,4));
  col11.push(new MidPipe(2,1,2));
  col11.push(new MidPipe(2,1,2));
  col11.push(new MidPipe(1,1,3));
  col11.push(Shane);
  col11.push(new MidPipe(1,1,3));
  col11.push(Sui);
  col11.push(new MidPipe(2,1,2));

  col12.push(Cole);
  col12.push(Mizu);
  col12.push(Ivan);
  col12.push(new MidPipe(2,1,1));
  col12.push(new MidPipe(2,1,1));
  col12.push(new MidPipe(1,1,4));
  col12.push(new MidPipe(1,1,3));
  col12.push(new MidPipe(2,1,1));
  col12.push(new MidPipe(2,1,1));
  col12.push(new MidPipe(2,1,1));
  col12.push(new MidPipe(2,1,1));
  col12.push(new MidPipe(1,1,4));

  pipes.push(col1, col2, col3, col4, col5, col6, col7, col8, col9, col10, col11, col12);
}

function makeRandom() {
  for(let i = 0; i < pipes.length; i++) {
    for(let j = 0; j < pipes[i].length; j++) {
      pipes[i][j].dir = int(random(1,5));
    }
  }
}

function randomPathGen() {
  // Cols is the set of columns that will be populated by the path vectors.
  let cols = [];
  for(let i = 0; i < col; i++) {
    let column = [];
    // Initalize all unvisited nodes to -1, so we know we haven't visited them yet.
    for(let j = 0; j < row; j++) {
      column.push([-1,-1,-1,-1]);
    }
    cols.push(column);
  }

  // this first wall is the starting point of the maze. Not necessarily an endpoint.
  let wall = [int(random(col)),int(random(row))];
  // Walls will store all currently open ended walls that aren't on the edge.
  let walls = [];
  // counter variable
  let z = 1;
  do {
    // mark all visited nodes as visited.
    for(let i = 0; i < 4; i++) {
      if(cols[wall[0]][wall[1]][i] == -1) {
        cols[wall[0]][wall[1]][i] = 0;
      }
    }
    // Add all unvisited directions of the chosen wall to walls.
    for (let i = 0; i < 4; i++) {
      let j = round(cos(i * PI/2 - PI));
      let k = round(cos(i * PI/2 - PI/2));
      if (wall[0] + j >= 0 && wall[1] + k >= 0
        && wall[0] + j < col && wall[1] + k < row
        && cols[wall[0] + j][wall[1] + k][0] == -1) {
          walls.push([wall,i]);

        }
    }
    // Random wall out of all the walls with unvisited neighbors.
    let rt = random(walls.length);
    let rand = int(rt);
    let wall1 = walls[rand][0];

    // the first unchosen neighbor to that wall
    let dir = walls[rand][1];
    let wall2 = [walls[rand][0][0] + round(cos(dir * PI/2 - PI)),
      walls[rand][0][1] + round(cos(dir * PI/2 - PI/2))];

    // Verifies that the wall is unvisited
    if(cols[wall2[0]][wall2[1]][0] == -1) {
      // makes the link between the neighbor and the wall
      cols[wall1[0]][wall1[1]][dir] = z;
      cols[wall2[0]][wall2[1]][(dir + 2) % 4] = z;
      // makes the old neighbor the new wall.
      wall = wall2;

    }
    // removes the old neighbor from list of potential targets.
    walls.splice(rand,1);
    z+=1;
  } while(walls.length != 0);
  return cols;
}

function makePath(ar) {
  console.log(ar)
  for(let i = 0; i < col; i++) {
    let column = [];
    for (let j = 0; j < row; j++) {
      let dir = 0;
      pipe = ar[i][j];
      for (let k = 0; k < 4; k++) {
        if (pipe[k] != 0) {
            // The +4 is to create a situation where an addition of 2 numbers couldnt
            // be confused for 1 number (i.e having 1 and 2 is not to be confused with 3.)
            dir += k + 5;
        }
      }
      console.log(dir);
      console.log("pipe: " + pipe);
      switch(dir) {
        // End nodes
        case 5:
        case 6:
        case 7:
        case 8:
          column.push(new EndPipe("", 1, abs((dir - 9))));
          break;
        // Column
        case 11:
        case 13:
        case 15:
          // Since dir 1 + 4 is the same as 2 + 3 I've added a swap mechanic to seperate them.
          let swap = (pipe[1] + pipe[2] != 0) ? 0 : 2;
          column.push(new MidPipe(1, 1, (abs(((dir - 9)/2) - 4) + swap)));
          break;
        case 12:
        case 14:
          column.push(new MidPipe(2,1, ((dir - 10) / 2) + 1));
          break;
        case 18:
        case 19:
        case 20:
        case 21:
          column.push(new MidPipe(3, 1, (dir-17)%4 + 1));
          break;
        case 26:
          column.push(new MidPipe(4,1, 4));
          break;
      }
    }
    pipes.push(column);
  }
}