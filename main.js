let game = document.querySelector('#game');
let ctx = game.getContext('2d');
let startScreen = document.getElementById('startscreen');
let startButton = document.querySelector('button');
let gameDiv = document.getElementById('container');
let title = document.querySelector('h1');
let subTitle = document.querySelector('h4');
let poisonDisplay = document.getElementById("top-left");
const towerImg = document.getElementById('towerImg');
const ascenderImg = document.getElementById('ascenderImg');
let ascender;
let tower;
let radiation;
ctx.fillStyle = 'white';
ctx.lineWidth = 5;
let bkgdImg = new Image();
bkgdImg.src = "./graphics/clouds.jpeg"
let score = 0;

class Tower {
    constructor(x, y, color, width, height){
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;

        this.render = function() {
            // ctx.fillStyle = this.color;
            // ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(towerImg, 220, 0, 380, 500);
        }
    }
}

// let towerTest = new Tower(400, 0, 'black', 10, 500);
// console.log(towerTest);
// towerTest.render();

class Ascender {
    constructor(x, y, color, width, height){
        this.color = color;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alive = true;
        console.log(ascenderImg);
        this.render = function() {
            // ctx.fillStyle = this.color;
            // ctx.fillRect(                 360, 375, 25, 25);
            ctx.drawImage(ascenderImg, this.x, this.y, this.width, this.height);
        }
    }
}

class Radiation {
    constructor(x, y, color, width, height){
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.alive = false;

        this.render = function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

// ====================== launch game ====================== //
function startGame() {
    startScreen.classList.toggle("hidden");
    gameDiv.classList.toggle("container");
    game.setAttribute('height', getComputedStyle(game)["height"]);
    game.setAttribute('width', getComputedStyle(game)["width"]);
    title.classList.toggle("hidden");
    subTitle.classList.toggle("hidden");
    // ascender = new Ascender(360, 375, 'yellow', 25, 25);
    ascender = new Ascender(ascenderImg, 100, 100, 100, 100);
    tower = new Tower;
    radiation = new Radiation(330, 0, 'green', 50, 50);
    radiation.y = 0;

    const runGame = setInterval(gameLoop, 120);
    const radLoop = setInterval(radiationLoop, 4200);
}

// ADD EVENT LISTENER FOR ONCLICK TO RUN startGame() //

// game.setAttribute('height', getComputedStyle(game)["height"]);
// game.setAttribute('width', getComputedStyle(game)["width"]);
// ======================= event listeners ========================== //

// window.addEventListener("DOMContentLoaded", function(e) {
//     ascender = new Ascender(360, 375, 'yellow', 25, 25);
//     tower = new Tower(385, 0, 'white', 50, 500);
//     radiation = new Radiation(330, 100, 'green', 50, 50);

//     const runGame = setInterval(gameLoop, 60);
// });

document.addEventListener('keydown', movementHandler);

// ========================= movement functions ========================= //
function movementHandler(e) {
    console.log('movement', e.key); //tests the movement
    switch(e.key) {
        case 'w': //move user up, but stop at canvas limit if user gets to top 
            ascender.y - 10 >= 0 ? ascender.y -= 20 : null;
            break;
        case 'a':  //move user left, but only to the other side of the tower
            ascender.x - 10 >= 400 ? ascender.x -= 75 : null;
            break;
        case 'd': //move user right, but only to the other side of the tower
            ascender.x + 10 <= (game.width - 400) ? ascender.x += 75 : null;
            break;
        case 's': //move user down, but stop at the bottom border of the canvas
            ascender.y + 10 <= (game.height - 20) ? ascender.y += 10 : null;
            break;
    }
}

// ==================== make it scroller ===================== //
let bkgdImgHeight = 0;
let scrollSpeed = 10;
function scroller() {
        ctx.drawImage(bkgdImg, 0, bkgdImgHeight);
        ctx.drawImage(bkgdImg, 0, bkgdImgHeight - game.height);
        bkgdImgHeight += scrollSpeed;
        if (bkgdImgHeight >= game.height) {
        bkgdImgHeight = 0;
        }    // window.requestAnimationFrame(imgLoop);
}
// ===================== game loop ============================ //

function gameLoop () {

    ctx.clearRect(0, 0, game.width, game.height);
    // poisonDisplay.textContent = `Poison Level:${hit}`;
    scroller();

    if (ascender.alive) {
        ascender.render();
        let hit = detectHit(radiation, ascender);
        
    if (hit === true) {
        radiation.alive = false;
        }
    if (radiation.alive) {
        radiation.render();
        }
        let gravity = 6;
        radiation.y += gravity;
    } 
    tower.render();
}

function radiationLoop() {
    console.log(radiation);
    radiation.alive = true;
    // radiation.render();

    // if (detectHit() === true) {
    //     radiation = {};
    // } else {
    //     radiation.render();
    // }
}


// ==================== hit detection ======================== //
function detectHit (p1, p2) {

    let hitTest = (
        p1.y + p1.height > p2.y && 
        p1.y < p2.y + p2.height &&
        p1.x + p1.width > p2.x &&
        p1.x < p2.x + p2.width
    ); // {boolean} : if all are true -> hit

    if (hitTest) {
        console.log('HIT');
        radiation = {};
        radiation = new Radiation(Math.random() * (480 - 300) + 330, 
                    0, 
                    'green',
                    Math.random() * 100, 
                    Math.random() * 100);
        console.count(hitTest);
        return score++;
        // return addRadiationPoisoning();
    } if (radiation.y >= 400) {
        radiation = {};
        radiation = new Radiation(Math.random() * (480 - 300) + 330, 
                    0, 
                    'green', 
                    Math.random() * (100 - 35) + 35, 
                    Math.random() * (100 - 35) + 35);
    } else {
        return false;
    }
}

// function drawScore() {
//     ctx.fillText("Poison Level: " + score, 300, 300);
// }
// drawScore();


// todo - make the hitTest value print to the top-left div
// draw image in for ascender
// figure out if it's feasible to draw images in for the radiation clouds
// make a game over screen for when you get hit with 5 poison clouds
// add music / update background image
// add sound when you are hit by radiation


// ======================= add radiation poisoning =================== //
// function addRadiationPoisoning() {
//          }
