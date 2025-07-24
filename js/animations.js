/* ===== ANIMATIONS & VISUAL EFFECTS ===== */
/* Floating hearts, confetti, and other visual animations */

// Create floating hearts animation
function createFloatingHearts() {
    const container = document.getElementById('hearts-container');
    if (!container) {
        console.warn('Hearts container not found');
        return;
    }
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = Math.random() > 0.5 ? '💕' : '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        container.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, 6000);
    }, 800);
}

// Confetti celebration effect
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            try {
                const confetti = document.createElement('div');
                confetti.innerHTML = ['🎉', '🎊', '✨', '💖', '💕'][Math.floor(Math.random() * 5)];
                confetti.style.cssText = `
                    position: fixed;
                    top: -10px;
                    left: ${Math.random() * 100}%;
                    z-index: 10000;
                    font-size: ${Math.random() * 20 + 15}px;
                    animation: confettiFall 3s linear forwards;
                    pointer-events: none;
                `;
                confetti.style.animationDelay = Math.random() * 2 + 's';
                document.body.appendChild(confetti);

                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.remove();
                    }
                }, 3000);
            } catch (error) {
                console.warn('Failed to create confetti:', error);
            }
        }, i * 50);
    }
}

// Card animation when navigating
function animateCard() {
    const card = document.querySelector('.modern-card');
    if (card) {
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0.8';
        
        setTimeout(() => {
            card.style.transform = 'scale(1)';
            card.style.opacity = '1';
        }, 150);
    }
}

// Utility function for shuffle array animation
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Show custom modal with animation
function showCustomModal(title, content) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 2rem;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 16px; max-width: 500px; width: 100%; max-height: 80vh; overflow: hidden;">
            <div style="padding: 1.5rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0; color: #2d3748;">${title}</h3>
                <button onclick="this.closest('.custom-modal').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #718096;">×</button>
            </div>
            <div>${content}</div>
        </div>
    `;
    
    modal.className = 'custom-modal';
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    document.body.appendChild(modal);
}
