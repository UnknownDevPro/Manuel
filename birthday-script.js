document.getElementById('surpriseButton').addEventListener('click', () => {
    const surpriseMessage = document.getElementById('surpriseMessage');
    surpriseMessage.classList.toggle('hidden');

    // Animate the surprise message
    surpriseMessage.style.opacity = '0';
    surpriseMessage.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        surpriseMessage.style.opacity = '1';
        surpriseMessage.style.transform = 'translateY(0)';
        surpriseMessage.style.transition = 'opacity 0.5s, transform 0.5s';
    }, 100);
});

// Play again button
document.getElementById('playAgain').addEventListener('click', () => {
    const surpriseMessage = document.getElementById('surpriseMessage');
    surpriseMessage.classList.toggle('hidden');
});
