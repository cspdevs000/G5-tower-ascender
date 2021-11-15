let game = document.querySelector('#game');
let ctx = game.getContext('2d');
let startScreen = document.getElementById('startscreen');
let startButton = document.querySelector('button');
let gameDiv = document.getElementById('container');
let restart = document.getElementById('gameover');
let title = document.querySelector('h1');
let subTitle = document.querySelector('h4');
let avoidsDisplay = document.getElementById("top-left");
let poisonDisplay = document.getElementById("top-right");
let footDisplay = document.getElementById("bottom");
const towerImg = document.getElementById('towerImg');
const ascenderImg = document.getElementById('ascenderImg');
const radiationImg = document.getElementById('radiationImg');
let ascender;
let tower;
let radiation;
let runGame;
let radLoop;
ctx.fillStyle = 'white';
ctx.lineWidth = 5;
let bkgdImg = new Image();
bkgdImg.src = "./graphics/clouds5.jpeg"
let score = 0;
let avoids = 0;
let bkgdAudio = new Audio();
bkgdAudio.src = "./cease.mp3";
let splat = new Audio();
splat.src = "./splat3.wav";
let laugh = new Audio();
laugh.src = "./gameover2.wav";
let scratch = new Audio();
scratch.src = "./scratch.mp3";

class Tower {
    constructor(x, y, color, width, height){
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;

        this.render = function() {
            ctx.drawImage(towerImg, 220, 0, 380, 500);
        }
    }
}

class Ascender {
    constructor(x, y, color, width, height){
        this.color = color;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alive = true;

        this.render = function() {
            if (this.x <= 320) {
                ctx.drawImage(ascenderImg, this.x, this.y, this.width, this.height);
            } else {
                ctx.translate(this.x + this.width, this.y);
                ctx.scale(-1, 1);
                ctx.drawImage(ascenderImg, 0, 0, this.width, this.height);   
                ctx.setTransform(1,0,0,1,0,0);
            }

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
        this.alive = true;

        this.render = function() {
            ctx.drawImage(radiationImg, this.x, this.y, this.width, this.height);
        }
    }
}

function startGame() {
    bkgdAudio.play();
    score = 0;
    startScreen.classList.toggle("hidden");
    gameDiv.classList.toggle("container");
    game.setAttribute('height', getComputedStyle(game)["height"]);
    game.setAttribute('width', getComputedStyle(game)["width"]);
    title.classList.toggle("hidden");
    subTitle.classList.toggle("hidden");
    ascender = new Ascender(320, 150, 'color', 80, 100);
    tower = new Tower;
    radiation = new Radiation(330, 0, 'color', 50, 50);
    radiation.y = 0;
    runGame = setInterval(gameLoop, 80);
}

document.addEventListener('keydown', movementHandler);
function movementHandler(e) {
    switch(e.key) {
        case 'a':
            ascender.x - 10 >= 330 ? ascender.x -= 90 : null;
            break;
        case 'd':
            ascender.x + 10 <= (game.width - 400) ? ascender.x += 90 : null;
            break;
    }
}

let bkgdImgHeight = 0;
let scrollSpeed = 4;
function scroller() {
        ctx.drawImage(bkgdImg, 0, bkgdImgHeight);
        ctx.drawImage(bkgdImg, 0, bkgdImgHeight - game.height);
        bkgdImgHeight += scrollSpeed;
        if (bkgdImgHeight >= game.height) {
        bkgdImgHeight = 0;
        }
}

function gameLoop () {
    ctx.clearRect(0, 0, game.width, game.height);
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
    if (avoids >= 4) {
        let gravity = 7;
        radiation.y += gravity;
    }
    if (avoids >= 10) {
        let gravity = 8;
        radiation.y += gravity;
    }
    if (avoids >= 25) {
        let gravity = 9;
        radiation.y += gravity;
    }
    if (avoids >= 50) {
        let gravity = 10;
        radiation.y += gravity;
    }
    if (avoids >= 75) {
        let gravity = 11;
        radiation.y += gravity;
    }
    if (avoids >= 100) {
        let gravity = 12;
        radiation.y += gravity;
    }
    if (avoids >= 135) {
        let gravity = 13;
        radiation.y += gravity;
    }
    if (score >= 2) {
        poisonDisplay.style.backgroundColor = "yellow";
    }
    if (score >= 3) {
        poisonDisplay.style.backgroundColor = "orange";
    }
    if (score >= 4) {
        poisonDisplay.style.backgroundColor = "red";
        avoidsDisplay.style.backgroundColor = "red";
        footDisplay.style.backgroundColor = "red";
        footDisplay.textContent = "PLEASE BE CAREFUL!!";
        footDisplay.style.fontWeight = "bold";
    }
    tower.render();
    drawScore();
    drawAvoids();
    endGame();
}

function detectHit (p1, p2) {
    let hitTest = (
        p1.y + p1.height > (p2.y + 65) && 
        p1.y < (p2.y - 25) + p2.height &&
        p1.x + p1.width > (p2.x + 33) &&
        p1.x < (p2.x - 28) + p2.width
    );
    let avoid = (radiation.y >= 240);
    if (hitTest) {
        splat.play();
        radiation = {};
        radiation = new Radiation(Math.random() * (475 - 275) + 275, 
                    0, 
                    'green',
                    Math.random() * (60 - 50) + 45, 
                    Math.random() * (80 - 45) + 45);
        return score++;
    } if (radiation.y >= 280) {
        radiation = {};
        radiation = new Radiation(Math.random() * (450 - 300) + 300, 
                    0, 
                    'green', 
                    Math.random() * (70 - 40) + 40, 
                    Math.random() * (100 - 45) + 45);
        avoids++;
    } else {
        return false;
    }
}

function drawAvoids() {
    avoidsDisplay.textContent = "Radiation Clouds Avoided: " + avoids;
}

function drawScore() {
    poisonDisplay.textContent = "Poison Level: " + score;
}

function endGame() {
    if (score >= '5') {
        laugh.play();
        scratch.play();
        bkgdAudio.pause();
        bkgdAudio.currentTime = 0;
        clearInterval(runGame);
        clearInterval(radLoop);
        restart.classList.toggle("hidden");
        gameDiv.classList.toggle("container");
        title.classList.toggle("hidden");
        subTitle.classList.toggle("hidden");
        title.textContent = "You Died...";
        subTitle.textContent = "You manage to avoid " + avoids + " clouds of death";
    }
}

function restartGame() {
    title.classList.toggle("hidden");
    subTitle.classList.toggle("hidden");
    score = 0;
    avoids = 0;
    restart.classList.toggle("hidden");
    poisonDisplay.style.backgroundColor = "rgba(176, 224, 220, 0.473)";
    avoidsDisplay.style.backgroundColor = "rgba(176, 224, 220, 0.473)";
    footDisplay.style.backgroundColor = "rgb(187, 179, 179)";
    footDisplay.textContent = "Remember, 5 clouds will kill you!";
    gameDiv.classList.toggle("container");
    game.setAttribute('height', getComputedStyle(game)["height"]);
    game.setAttribute('width', getComputedStyle(game)["width"]);
    ascender = new Ascender(320, 150, 'color', 80, 100);
    tower = new Tower;
    radiation = new Radiation(330, 0, 'color', 50, 50);
    radiation.y = 0;

    runGame = setInterval(gameLoop, 120);
    bkgdAudio.play();
}