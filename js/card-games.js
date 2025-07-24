/* ===== CARD GAMES ===== */
/* Enhanced card game functionality with navigation and favorites */

// Enhanced Card Game Functions
let currentCardGame = null;
let currentCards = [];
let currentCardIndex = 0;
let favoriteCards = new Set();
let cardProgress = {};

const cardGameTitles = {
    emotionalIntimacy: '💞 Emotional Intimacy Cards',
    sexualIntimacy: '🔥 Sexual Intimacy Cards',
    afterDark: '🌙 After Dark Cards',
    affectionRomance: '💗 Affection & Romance Cards',
    communicationTrust: '🗣️ Communication & Trust Cards',
    relationshipGoals: '🚀 Relationship Goals Cards',
    flirtyDares: '💃 Flirty Dares Cards',
    funSilly: '🎉 Fun & Silly Cards',
    sexualPositions: '🔥 Sexual Positions Cards'
};

const cardGameSubtitles = {
    emotionalIntimacy: 'Deepen your emotional connection',
    sexualIntimacy: 'Explore intimate desires together',
    afterDark: 'Late night conversations & activities',
    affectionRomance: 'Sweet romantic moments',
    communicationTrust: 'Build stronger communication',
    relationshipGoals: 'Plan your future together',
    flirtyDares: 'Playful challenges for couples',
    funSilly: 'Laugh and be silly together',
    sexualPositions: 'Explore new dimensions of intimacy'
};

function openCardGame(gameType) {
    try {
        // Validate game type
        if (!cardGameData[gameType]) {
            console.error('Invalid game type:', gameType);
            return;
        }
        
        currentCardGame = gameType;
        currentCards = [...cardGameData[gameType]]; // Create a copy
        currentCardIndex = cardProgress[gameType] || 0;
        
        // Ensure index is within bounds
        if (currentCardIndex >= currentCards.length) {
            currentCardIndex = 0;
        }
        
        // Set title and subtitle
        const titleElement = document.getElementById('cardGameTitle');
        const subtitleElement = document.getElementById('cardSubtitle');
        
        if (titleElement) titleElement.textContent = cardGameTitles[gameType] || 'Card Game';
        if (subtitleElement) subtitleElement.textContent = cardGameSubtitles[gameType] || 'Explore together';
        
        // Add theme class to modal container
        const modalContainer = document.querySelector('.card-modal-container');
        if (modalContainer) {
            modalContainer.className = 'card-modal-container ' + gameType + '-theme';
        }
        
        // Add theme class to the card
        const gameCard = document.getElementById('gameCard');
        if (gameCard) {
            gameCard.className = 'modern-card ' + gameType + '-card-theme';
        }
        
        // Display current card
        displayCard();
        updateFavoriteCount();
        updateDots();
        
        // Show modal
        const modal = document.getElementById('cardGameModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add entrance animation
            const modalContainer = document.querySelector('.card-modal-container');
            if (modalContainer) {
                modalContainer.style.animation = 'none';
                setTimeout(() => {
                    modalContainer.style.animation = 'modalSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                }, 10);
            }
        }
    } catch (error) {
        console.error('Error opening card game:', error);
    }
}

function closeCardGame() {
    document.getElementById('cardGameModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Save progress
    if (currentCardGame) {
        cardProgress[currentCardGame] = currentCardIndex;
    }
    
    currentCardGame = null;
    currentCards = [];
    currentCardIndex = 0;
}

function displayCard() {
    if (currentCards.length === 0) return;
    
    const card = currentCards[currentCardIndex];
    const cardKey = `${currentCardGame}-${currentCardIndex}`;
    
    try {
        // Update card content
        const cardTextElement = document.getElementById('cardText');
        const cardNumberElement = document.getElementById('cardNumber');
        const progressTextElement = document.getElementById('progressText');
        const progressFillElement = document.getElementById('progressFill');
        
        if (cardTextElement) cardTextElement.textContent = card;
        if (cardNumberElement) cardNumberElement.textContent = `${currentCardIndex + 1}/${currentCards.length}`;
        if (progressTextElement) progressTextElement.textContent = `Card ${currentCardIndex + 1} of ${currentCards.length}`;
        
        // Update progress bar
        if (progressFillElement) {
            const progressPercent = ((currentCardIndex + 1) / currentCards.length) * 100;
            progressFillElement.style.width = progressPercent + '%';
        }
        
        // Update button states
        const prevCardBtn = document.getElementById('prevCard');
        const nextCardBtn = document.getElementById('nextCard');
        if (prevCardBtn) prevCardBtn.disabled = currentCardIndex === 0;
        if (nextCardBtn) nextCardBtn.disabled = currentCardIndex === currentCards.length - 1;
        
        // Update favorite button state
        const favoriteBtn = document.getElementById('favoriteBtn');
        if (favoriteBtn) {
            if (favoriteCards.has(cardKey)) {
                favoriteBtn.classList.add('favorited');
                favoriteBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                `;
            } else {
                favoriteBtn.classList.remove('favorited');
                favoriteBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
            }
        }
        
        updateDots();
    } catch (error) {
        console.error('Error displaying card:', error);
    }
}

function nextCard() {
    if (currentCardIndex < currentCards.length - 1) {
        currentCardIndex++;
        displayCard();
        animateCard();
    }
}

function previousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        displayCard();
        animateCard();
    }
}

function shuffleCards() {
    shuffleArray(currentCards);
    currentCardIndex = 0;
    displayCard();
    animateCard();
    
    // Show shuffle feedback
    const shuffleBtn = document.querySelector('.shuffle-btn');
    if (shuffleBtn) {
        shuffleBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            shuffleBtn.style.transform = 'rotate(0deg)';
        }, 500);
    }
}

function toggleFavorite() {
    const cardKey = `${currentCardGame}-${currentCardIndex}`;
    
    if (favoriteCards.has(cardKey)) {
        favoriteCards.delete(cardKey);
    } else {
        favoriteCards.add(cardKey);
    }
    
    displayCard();
    updateFavoriteCount();
    
    // Animation feedback
    const favoriteBtn = document.getElementById('favoriteBtn');
    favoriteBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        favoriteBtn.style.transform = 'scale(1)';
    }, 200);
}

function updateFavoriteCount() {
    const count = favoriteCards.size;
    const favoritesCountElement = document.getElementById('favoritesCount');
    if (favoritesCountElement) {
        favoritesCountElement.textContent = `${count} ♥ saved`;
    }
}

function updateDots() {
    // This would be used if we had dot indicators
    // Currently not implemented in the HTML
}

function showFavorites() {
    if (favoriteCards.size === 0) {
        showCustomModal('No Favorites Yet', `
            <div style="padding: 2rem; text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">💔</div>
                <p style="color: #666; margin-bottom: 1rem;">You haven't saved any favorite cards yet!</p>
                <p style="color: #999; font-size: 0.9rem;">Click the heart icon on any card to save it to your favorites.</p>
            </div>
        `);
        return;
    }
    
    let favoritesHTML = `
        <div style="padding: 1rem;">
            <div style="max-height: 60vh; overflow-y: auto;">
    `;
    
    favoriteCards.forEach(cardKey => {
        const [gameType, cardIndex] = cardKey.split('-');
        const card = cardGameData[gameType][parseInt(cardIndex)];
        
        favoritesHTML += `
            <div style="background: #f8f9fa; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; border-left: 4px solid #ff6b9d;">
                <div style="font-size: 0.8rem; color: #8b5a83; margin-bottom: 0.5rem; font-weight: 500;">
                    ${cardGameTitles[gameType]}
                </div>
                <div style="color: #333; line-height: 1.4;">${card}</div>
            </div>
        `;
    });
    
    favoritesHTML += `
            </div>
            <div style="text-align: center; padding: 1rem; border-top: 1px solid #e2e8f0; margin-top: 1rem;">
                <button onclick="clearAllFavorites()" style="background: #f44336; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;">
                    Clear All Favorites
                </button>
            </div>
        </div>
    `;
    
    showCustomModal(`❤️ Your Favorite Cards (${favoriteCards.size})`, favoritesHTML);
}

function clearAllFavorites() {
    favoriteCards.clear();
    updateFavoriteCount();
    displayCard();
    document.querySelector('.custom-modal').remove();
}

function resetProgress() {
    if (confirm('Are you sure you want to reset your progress? This will take you back to the first card.')) {
        currentCardIndex = 0;
        cardProgress[currentCardGame] = 0;
        displayCard();
        animateCard();
    }
}

function shareCard() {
    const currentCard = currentCards[currentCardIndex];
    const gameTitle = cardGameTitles[currentCardGame];
    
    if (navigator.share) {
        navigator.share({
            title: gameTitle,
            text: currentCard,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = `${gameTitle}\n\n"${currentCard}"\n\nFrom LovePlay - Couple Games`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Card copied to clipboard!');
            }).catch(() => {
                fallbackShare(shareText);
            });
        } else {
            fallbackShare(shareText);
        }
    }
}

function fallbackShare(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        alert('Card copied to clipboard!');
    } catch (err) {
        alert('Unable to copy. Please manually copy the text from the modal.');
        showCustomModal('Share Card', `
            <div style="padding: 1rem;">
                <textarea readonly style="width: 100%; height: 150px; padding: 1rem; border: 1px solid #ddd; border-radius: 6px; font-family: inherit; resize: vertical;">${text}</textarea>
                <div style="margin-top: 1rem; color: #666; font-size: 0.9rem;">
                    Copy the text above to share this card!
                </div>
            </div>
        `);
    }
    
    document.body.removeChild(textarea);
}

// Keyboard navigation for cards
document.addEventListener('keydown', function(event) {
    if (document.getElementById('cardGameModal').style.display === 'block') {
        switch(event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                previousCard();
                break;
            case 'ArrowRight':
                event.preventDefault();
                nextCard();
                break;
            case 'Escape':
                event.preventDefault();
                closeCardGame();
                break;
            case ' ':
                event.preventDefault();
                shuffleCards();
                break;
        }
    }
});

// Close card modal when clicking outside
document.getElementById('cardGameModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeCardGame();
    }
});
