let game = document.querySelector('#game');
let ctx = game.getContext('2d');
let ascender;
let tower;
let radiation;
ctx.fillStyle = 'white';
ctx.lineWidth = 5;
let bkgdImg = new Image();
bkgdImg.src = "./graphics/clouds.jpeg"

game.setAttribute('height', getComputedStyle(game)["height"]);
game.setAttribute('width', getComputedStyle(game)["width"]);
// game.width = 600;
// game.height = 600;

class Tower {
    constructor(x, y, color, width, height){
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;

        this.render = function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

// let towerTest = new Tower(400, 0, 'black', 10, 500);
// console.log(towerTest);
// towerTest.render();

class Ascender {
    constructor(x, y, color, width, height){
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.alive = true;

        this.render = function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

// let ascenderTest = new Ascender(390, 390, 'yellow', 10, 10);
// console.log(ascenderTest);
// ascenderTest.render();

class Radiation {
    constructor(x, y, color, width, height){
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;

        this.render = function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

// ======================= event listeners ========================== //

window.addEventListener("DOMContentLoaded", function(e) {
    ascender = new Ascender(360, 375, 'yellow', 25, 25);
    tower = new Tower(385, 0, 'white', 50, 500);
    radiation = new Radiation(330, 100, 'green', 50, 50);

    const runGame = setInterval(gameLoop, 120);
});

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

window.onload = function scroller() {
    let bkgdImgHeight = 0;
    let scrollSpeed = 1;
    function imgLoop() {
        ctx.drawImage(bkgdImg, 0, bkgdImgHeight);
        ctx.drawImage(bkgdImg, 0, bkgdImgHeight - game.height);
        bkgdImgHeight += scrollSpeed;
        if (bkgdImgHeight === game.height)
        bkgdImgHeight = 0;
        window.requestAnimationFrame(imgLoop);
    }
    imgLoop();
}
// ===================== game loop ============================ //

function gameLoop () {
    // clears the canvas
    ctx.clearRect(0, 0, game.width, game.height);
    if (ascender.alive) {
        ascender.render();
        let hit = detectHit(radiation, ascender);
    }
    tower.render();
    radiation.render();
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
        // return addRadiationPoisoning();
    } else {
        return false;
    }
}

// ======================= add radiation poisoning =================== //
// function addRadiationPoisoning() {

// }
