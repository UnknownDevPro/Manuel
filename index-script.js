document.getElementById('startGame').addEventListener('click', () => {
    document.getElementById('gameContainer').classList.remove('hidden');
    document.getElementById('startGame').classList.add('hidden');
});

// Snake Game initialization (assuming you have the game logic in snake-game.js)
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 500; // Adjust the width of the canvas
    canvas.height = 500; // Adjust the height of the canvas

    // Initialize Snake Game
    // Your snake game initialization code should go here
    
});
