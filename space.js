const canvas = document.getElementById('board');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const shipWidth = 50;
const shipHeight = 20;
const shipVelocityX = 5;
const bulletVelocityY = -5;
const alienWidth = 40;
const alienHeight = 30;

let ship = {
    x: canvas.width / 2 - shipWidth / 2,
    y: canvas.height - shipHeight - 10,
    width: shipWidth,
    height: shipHeight
};

let bulletArray = [];
let alienArray = [];
let points = 0;
let gameOver = false;

const alienRows = 3;
const alienColumns = 5;
const alienPadding = 10;
const alienOffsetTop = 30;
const alienOffsetLeft = 30;
const alienVelocityX = 2;
let alienDirection = 1;
const pointsToWin = 50; // Points required to transition to the next game

function createAliens() {
    alienArray = []; // Clear existing aliens
    for (let c = 0; c < alienColumns; c++) {
        for (let r = 0; r < alienRows; r++) {
            let alien = {
                x: alienOffsetLeft + c * (alienWidth + alienPadding),
                y: alienOffsetTop + r * (alienHeight + alienPadding),
                width: alienWidth,
                height: alienHeight,
                alive: true
            };
            alienArray.push(alien);
        }
    }
}

function moveShip(direction) {
    if (gameOver) return;

    if (direction === 'left' && ship.x - shipVelocityX >= 0) {
        ship.x -= shipVelocityX;
    } else if (direction === 'right' && ship.x + shipVelocityX + ship.width <= canvas.width) {
        ship.x += shipVelocityX;
    }
}

function shoot() {
    if (gameOver) return;

    let bullet = {
        x: ship.x + shipWidth / 2 - 2.5,
        y: ship.y,
        width: 5,
        height: 15,
        used: false
    };
    bulletArray.push(bullet);
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function update() {
    bulletArray.forEach(bullet => {
        bullet.y += bulletVelocityY;
        if (bullet.y < 0) {
            bullet.used = true;
        }
    });
    bulletArray = bulletArray.filter(bullet => !bullet.used);

    bulletArray.forEach(bullet => {
        alienArray.forEach(alien => {
            if (alien.alive && detectCollision(bullet, alien)) {
                alien.alive = false;
                bullet.used = true;
                points++;
                if (points >= pointsToWin) {
                    window.location.href = 'pong.html'; // Redirect to the next game
                }
            }
        });
    });

    // Move aliens
    let moveDown = false;
    alienArray.forEach(alien => {
        if (alien.alive) {
            alien.x += alienVelocityX * alienDirection;
            if (alien.x + alien.width > canvas.width || alien.x < 0) {
                moveDown = true;
            }
        }
    });

    if (moveDown) {
        alienDirection *= -1;
        alienArray.forEach(alien => {
            if (alien.alive) {
                alien.y += alienHeight;
            }
        });
    }

    // Check for collision with the ship
    alienArray.forEach(alien => {
        if (alien.alive && detectCollision(ship, alien)) {
            gameOver = true;
            alert('Game Over');
        }
    });

    // Respawn aliens if all are defeated
    if (alienArray.every(alien => !alien.alive)) {
        createAliens();
    }

    // Update score display
    document.getElementById('score').textContent = `Score: ${points}`;
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ship
    context.fillStyle = '#00f';
    context.fillRect(ship.x, ship.y, ship.width, ship.height);

    // Draw the bullets
    context.fillStyle = '#f00';
    bulletArray.forEach(bullet => {
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // Draw the aliens (using emoji)
    context.font = '30px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#f00';
    alienArray.forEach(alien => {
        if (alien.alive) {
            context.fillText('👾', alien.x + alien.width / 2, alien.y + alien.height / 2);
        }
    });

    update();
    requestAnimationFrame(draw);
}

function setupEventListeners() {
    document.getElementById('left').addEventListener('touchstart', () => moveShip('left'));
    document.getElementById('right').addEventListener('touchstart', () => moveShip('right'));
    document.getElementById('shoot').addEventListener('touchstart', shoot);

    document.getElementById('left').addEventListener('click', () => moveShip('left'));
    document.getElementById('right').addEventListener('click', () => moveShip('right'));
    document.getElementById('shoot').addEventListener('click', shoot);

    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowLeft') moveShip('left');
        if (e.code === 'ArrowRight') moveShip('right');
        if (e.code === 'Space') shoot();
    });
}

createAliens();
setupEventListeners();
draw();
