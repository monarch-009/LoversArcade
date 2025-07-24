/* ===== CORE FUNCTIONS ===== */
/* Main initialization, navigation, and utility functions */

// Global variables
// gameData is now imported from data.js

// Initialize the website
function init() {
    createFloatingHearts();
    loadSavedData();
    
    // Set initial body class for homepage
    document.body.classList.add('homepage-visible');
    document.body.classList.remove('games-visible');
}

// Music toggle (replaced by enhanced music system)
/*
function toggleMusic() {
    const music = document.getElementById('backgroundMusic');
    const btn = document.getElementById('musicBtn');
    
    if (!music || !btn) return;

    if (music.paused) {
        // Try to play music (in a real implementation, you'd set music.src to an actual audio file)
        // music.play().catch(e => console.log('Audio play failed:', e));
        btn.innerHTML = '🔇';
        btn.title = 'Music Off';
    } else {
        music.pause();
        btn.innerHTML = '🎵';
        btn.title = 'Music On';
    }
}
*/

// Show games section
function showGames() {
    const homepage = document.getElementById('homepage');
    const gameSections = document.getElementById('game-sections');
    
    if (homepage) homepage.style.display = 'none';
    if (gameSections) gameSections.classList.remove('hidden');
    
    // Update body classes for footer visibility
    document.body.classList.remove('homepage-visible');
    document.body.classList.add('games-visible');
}

// Open specific game
function openGame(gameType) {
    const modal = document.getElementById('gameModal');
    const content = document.getElementById('gameContent');

    if (!modal || !content) {
        console.error('Game modal elements not found');
        return;
    }

    content.innerHTML = getGameContent(gameType);
    modal.style.display = 'block';
}

// Close game modal
function closeGame() {
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Get game content based on type
function getGameContent(gameType) {
    switch (gameType) {
        case 'truthOrDare':
            return getTruthOrDareContent();
        case 'neverHaveIEver':
            return getNeverHaveIEverContent();
        case 'whoKnowsMe':
            return getWhoKnowsMeContent();
        default:
            return '<p>Game coming soon! 💕</p>';
    }
}

// Save and load data (using variables instead of localStorage)
function loadSavedData() {
    // In a real implementation with localStorage support, you would load saved data here
    // For now, we'll use the initialized gameData object
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function () {
    init();
});

// Close modal when clicking outside
document.addEventListener('click', function (e) {
    const modal = document.getElementById('gameModal');
    if (e.target === modal) {
        closeGame();
    }
    
    const cardModal = document.getElementById('cardGameModal');
    if (e.target === cardModal) {
        closeCardGame();
    }
});
