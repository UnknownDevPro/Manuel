const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
const paddleSpeed = 10;
const ballSpeed = 7; // Increased speed
const winningScore = 5;

let playerPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, dy: 0 };
let botPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight };
let ball = { x: canvas.width / 2, y: canvas.height / 2, size: ballSize, dx: ballSpeed, dy: ballSpeed };
let playerScore = 0;
let botScore = 0;

function drawPaddle(paddle) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    // Move paddles
    playerPaddle.y += playerPaddle.dy;

    // Keep paddles within canvas
    playerPaddle.y = Math.max(0, Math.min(canvas.height - playerPaddle.height, playerPaddle.y));

    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom walls
    if (ball.y - ball.size < 0 || ball.y + ball.size > canvas.height) {
        ball.dy = -ball.dy;
        ball.dy += (Math.random() - 0.5) * 2; // Add slight random variation
    }

    // Ball collision with paddles
    if (ball.x - ball.size < playerPaddle.x + playerPaddle.width && ball.y > playerPaddle.y && ball.y < playerPaddle.y + playerPaddle.height) {
        ball.dx = -ball.dx;
        ball.dx += (Math.random() - 0.5) * 2; // Add slight random variation
    }
    if (ball.x + ball.size > botPaddle.x && ball.y > botPaddle.y && ball.y < botPaddle.y + botPaddle.height) {
        ball.dx = -ball.dx;
        ball.dx += (Math.random() - 0.5) * 2; // Add slight random variation
    }

    // Ball out of bounds
    if (ball.x - ball.size < 0) {
        botScore++;
        if (botScore >= winningScore) {
            window.location.href = 'nextgame.html'; // Redirect to the next game
        }
        resetBall();
    }
    if (ball.x + ball.size > canvas.width) {
        playerScore++;
        if (playerScore >= winningScore) {
            window.location.href = 'nextgame.html'; // Redirect to the next game
        }
        resetBall();
    }

    // Update bot paddle movement
    if (ball.dy > 0) {
        botPaddle.y += Math.min(ball.dy, canvas.height - botPaddle.y - botPaddle.height);
    } else {
        botPaddle.y -= Math.min(-ball.dy, botPaddle.y);
    }
    botPaddle.y = Math.max(0, Math.min(canvas.height - botPaddle.height, botPaddle.y));

    // Update score display
    document.getElementById('score').textContent = `Player: ${playerScore} | Bot: ${botScore}`;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = ballSpeed * (Math.random() > 0.5 ? 1 : -1); // Ensure ball moves in random direction
    ball.dy = ballSpeed * (Math.random() > 0.5 ? 1 : -1); // Ensure ball moves in random direction
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(playerPaddle);
    drawPaddle(botPaddle);
    drawBall();
    update();
    requestAnimationFrame(draw);
}

function setupEventListeners() {
    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowUp') {
            playerPaddle.dy = -paddleSpeed;
        } else if (e.code === 'ArrowDown') {
            playerPaddle.dy = paddleSpeed;
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
            playerPaddle.dy = 0;
        }
    });

    // Mobile controls
    document.getElementById('up').addEventListener('touchstart', () => playerPaddle.dy = -paddleSpeed);
    document.getElementById('down').addEventListener('touchstart', () => playerPaddle.dy = paddleSpeed);
    document.getElementById('up').addEventListener('touchend', () => playerPaddle.dy = 0);
    document.getElementById('down').addEventListener('touchend', () => playerPaddle.dy = 0);

    document.getElementById('up').addEventListener('click', () => playerPaddle.dy = -paddleSpeed);
    document.getElementById('down').addEventListener('click', () => playerPaddle.dy = paddleSpeed);
    document.getElementById('up').addEventListener('mouseup', () => playerPaddle.dy = 0);
    document.getElementById('down').addEventListener('mouseup', () => playerPaddle.dy = 0);
}

setupEventListeners();
draw();
