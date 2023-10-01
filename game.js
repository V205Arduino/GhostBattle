/*
@title: Ghost Battle?(SPOOKY?)
@author: V205
*/
// Thanks to Hackclub and tutorials!
// Setup stuff!

//Sprites!
const player = "p"; // Define Player
const coin = "c";// Define Coin
const obstacle = "o";// Define obstacle(asteroids)
const background = "b";// Define background. Only used to create space.
const wall = "w";// Used to create space for text.
const missile = "m";// Used to create space for text.


//Tunes!
const gamePlayTune = tune`
75,
37.5: D5^37.5,
37.5: D5^37.5,
37.5: C5^37.5,
37.5: C5^37.5,
37.5: C5^37.5,
37.5: G4^37.5,
37.5: G4^37.5,
37.5: G4^37.5,
37.5,
37.5: A5^37.5,
75,
37.5: B4^37.5,
150,
37.5: A5^37.5,
37.5: A5^37.5,
37.5,
37.5: C4^37.5,
37.5,
37.5: A5^37.5,
37.5: A5^37.5,
37.5,
37.5: A5^37.5,
37.5: A5^37.5,
112.5`// Game tune.
const gameEndTune = tune`
133.92857142857142,
133.92857142857142: B5^133.92857142857142,
133.92857142857142: A5^133.92857142857142,
133.92857142857142: G5^133.92857142857142,
133.92857142857142: F5^133.92857142857142,
133.92857142857142: E5^133.92857142857142,
133.92857142857142: D5^133.92857142857142,
133.92857142857142: C5^133.92857142857142,
133.92857142857142: B4^133.92857142857142,
133.92857142857142: A4^133.92857142857142,
133.92857142857142: G4^133.92857142857142,
133.92857142857142: F4^133.92857142857142,
133.92857142857142: E4^133.92857142857142,
133.92857142857142,
133.92857142857142: E4^133.92857142857142,
133.92857142857142: E4^133.92857142857142,
133.92857142857142,
133.92857142857142: E4^133.92857142857142,
133.92857142857142: E4^133.92857142857142,
133.92857142857142,
133.92857142857142: E4^133.92857142857142,
133.92857142857142: E4^133.92857142857142,
133.92857142857142,
133.92857142857142: D4^133.92857142857142,
133.92857142857142: D4^133.92857142857142,
133.92857142857142,
133.92857142857142: C4^133.92857142857142,
133.92857142857142: C4^133.92857142857142,
535.7142857142857`// Wa wa wa wa. You lost!

//Variables!
var gameTime = 0;// How long have you been playing?
var coinsCollected = 0; // How many coins?
var ghostsKilled = 0; // no cheating :)
var difficulty = 1; // Difficulty increases every hundred. Might become impossible at 3 or less.
var changeDifficulty = false; //Change to true if you want the difficulty to increase by one every hundred seconds.
//Set bitmaps.
setLegend(
  [obstacle, bitmap`
................
......22222.....
.....2222222....
.....2322232....
.....2222222....
....22222222....
....222222222...
....222222222...
...22222222222..
...22222222222..
....2222222222..
.....222222222..
......22222222..
................
................
................`], // Obstacles(asteroids)
  [player, bitmap`
................
...LLLLLLLLLL...
...LLLLLLLLLL...
...LL9LLL9LL....
...LLLLLLLLL....
...LLL999LLL....
...LLLLLLLLL....
.....LLLLL...1..
....LLLLLLLLL119
...LL.LLLL..11..
..LL..LLLL......
......LLLL......
......LLL.......
......LLLL......
.....LL..L......
....LL...LL.....`],// Spaceship
  [background, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCC1CCC
CCCDCCCCCCCCCCCC
CCCDCCCCCCCCCCCC
CCCDCCCCCC1CCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCLCCCCCDCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCDCCCC
CCC1CCCCCCCDCCCC
CCCCCCCCCCCCCCCC
CCCC1CCCCCCCCC1C
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],// Background
  [coin, bitmap`
................
................
.....LHHHL......
.....LHH4L......
.....LHHHL......
.....L4HHL......
.....LHHHL......
....LLHHHHLLL...
...LLHH4HHHHLL..
...LHHHHHH4HHL..
..LLHHHH4HHHHLL.
..LHH4HHHHHHHHL.
..LLHHHHHHH4HLL.
...LLHH4HHHHLL..
....LLLLLLLLL...
................`],// coin. Very ugly.
  [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],// Black square.
  [missile, bitmap`
................
................
................
................
................
................
3.LL.99999999...
3333L999999999..
3333L99999999999
3333L999999999..
3.LL.99999999...
................
................
................
................
................`],// Black square.
  
)

setMap(map`
wwwwwwww
........
........
........
........
p.......
........
........
........
........`);// set map.
setSolids([wall, player]);// Don't allow other things to go inside these things.
setBackground(background);// Set background.


var gameRunning = true; //This will go to false if you crash into a asteroid.


// End Setup stuff
// Controlls.
onInput("w", () => {
  if (gameRunning) {
    getFirst(player).y -= 1;
  }
});

onInput("s", () => {
  if (gameRunning) {
    getFirst(player).y += 1;
  }
});


onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1;
  }
});

onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1;
  }
});

//WIP Blaster!
onInput("i", () => {
  if (gameRunning) {
    spawnMissile();
  }
});
//bullet
function spawnMissile() {
  
  let p = getFirst(player);
  addSprite(p.x+1, p.y, missile); 
}


function moveMissiles() {
  let missiles = getAll(missile);

  for (let i = 0; i < missiles.length; i++) {
    missiles[i].x += 1;
  }
}

function despawnMissiles() {
  let missiles = getAll(missile);

  for (let i = 0; i < missiles.length; i++) {
   if (missiles[i].x == 7) {
     missiles[i].remove();
   }
  }
}

function checkMissileHit() {
 
  let m = getAll(missile);
  let o = getAll(obstacle);

  for (let i = 0; i < m.length; i++) {

    for (let b = 0; b < o.length; b++) {
      if (m[i].x == o[b].x && m[i].y == o[b].y) {
        o[b].remove();
        m[i].remove();
      }
    }
    
  }

  
}





// Obstacle management.
function increaseDifficulty() {
  
  if(gameTime >=101 && changeDifficulty == true){
    
    difficulty = Math.floor(gameTime/100 +1 );
  }
}


function spawnObstacle() {

  for (let i = 0; i < difficulty; i++) { 
    let x = 7;
    let y =  getRandomNumber(1,9);//old way: Math.floor(Math.random() * 8.5);
  
    addSprite(x, y, obstacle);
  }
  
}

function moveObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 1;
  }
}

function despawnObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].x == 0) {
     obstacles[i].remove();
   }
  }
}

function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }

  return false;
}

// End Obstacle management.

// Coin management.

function spawnCoins() {

  if ( getRandomNumber(1,3)== 1) {
    let x = 7;
    let y =  getRandomNumber(1,9);//old way: Math.floor(Math.random() * 8.5);
  
    addSprite(x, y, coin);
  }
  
}

function moveCoins() {
  let coins = getAll(coin);

  for (let i = 0; i < coins.length; i++) {
    coins[i].x -= 1;
  }
}

function despawnCoins() {
  let coins = getAll(coin);

  for (let i = 0; i < coins.length; i++) {
   if (coins[i].x == 0) {
     coins[i].remove();
   }
  }
}


function checkCoinHit() {
  let coins = getAll(coin);
  let p = getFirst(player);

  for (let i = 0; i < coins.length; i++) {
    if (coins[i].x == p.x && coins[i].y == p.y) {
      return true;
    }
  }

  return false;
}




// Function to make random numbers easier. 
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


var gameLoop = setInterval(() => {

  despawnMissiles();
  checkMissileHit()
  
  increaseDifficulty();
  despawnObstacles();
  moveObstacles();
  spawnObstacle();

  despawnCoins();
  moveCoins();
  spawnCoins();

  moveMissiles();
  
  
  playTune(gamePlayTune);
  gameTime += 1;
  
 
  addText( String(gameTime) , {
      x: 0,
      y: 0,
      color: color`3`
    });

  if(checkCoinHit()){

    coinsCollected+=1;
    addText("P: "+ String(coinsCollected), {
      x: 5,
      y: 0,
      color: color`H`
    });
  }
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    clearText();
    playTune(gameEndTune);
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
    addText("Time: "+ String(gameTime), {
      x: 5,
      y: 7,
      color: color`3`
    });

    addText("Potions: "+ String(coinsCollected), {
      x: 5,
      y: 8,
      color: color`H`
    });
  }
  
  

}, 1000)

