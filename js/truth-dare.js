/* ===== TRUTH OR DARE GAME ===== */
/* Enhanced Truth or Dare game functionality */

// Enhanced Truth or Dare game
function getTruthOrDareContent() {
    return `
        <div class="truth-dare-container">
            <div class="truth-dare-header">
                <h2 class="truth-dare-title">
                    <span class="sparkle">✨</span>
                    Truth or Dare
                    <span class="sparkle">✨</span>
                </h2>
                <p class="truth-dare-subtitle">Choose your adventure and discover new depths of your connection!</p>
            </div>
            
            <div class="truth-dare-buttons">
                <button class="truth-button enhanced-btn" onclick="playTruthOrDare('truth')">
                    <div class="btn-icon">💭</div>
                    <div class="btn-text">
                        <span class="btn-title">Truth</span>
                        <span class="btn-subtitle">Reveal your secrets</span>
                    </div>
                    <div class="btn-glow"></div>
                </button>
                
                <button class="dare-button enhanced-btn" onclick="playTruthOrDare('dare')">
                    <div class="btn-icon">💪</div>
                    <div class="btn-text">
                        <span class="btn-title">Dare</span>
                        <span class="btn-subtitle">Take the challenge</span>
                    </div>
                    <div class="btn-glow"></div>
                </button>
            </div>
            
            <div id="truthOrDareResult" class="truth-dare-result-container"></div>
            
            <div class="truth-dare-stats" id="todStats">
                <div class="stat-item">
                    <span class="stat-number" id="truthCount">0</span>
                    <span class="stat-label">Truths Revealed</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" id="dareCount">0</span>
                    <span class="stat-label">Dares Completed</span>
                </div>
            </div>
        </div>
    `;
}

function playTruthOrDare(type) {
    // Validate input and data
    if (!type || (type !== 'truth' && type !== 'dare')) {
        console.error('Invalid type for Truth or Dare');
        return;
    }
    
    if (!truthOrDareData || !truthOrDareData.truths || !truthOrDareData.dares) {
        console.error('Truth or Dare data not available');
        return;
    }
    
    const options = type === 'truth' ? truthOrDareData.truths : truthOrDareData.dares;
    if (!options || options.length === 0) {
        console.error(`No ${type} options available`);
        return;
    }
    
    const result = options[Math.floor(Math.random() * options.length)];
    
    // Update statistics
    updateTruthDareStats(type);
    
    // Create enhanced result display
    const resultContainer = document.getElementById('truthOrDareResult');
    if (!resultContainer) {
        console.error('Result container not found');
        return;
    }
    
    resultContainer.innerHTML = `
        <div class="truth-dare-card ${type}-card" style="opacity: 0; transform: translateY(30px);">
            <div class="card-header">
                <div class="card-icon">${type === 'truth' ? '💭' : '💪'}</div>
                <h3 class="card-title">${type === 'truth' ? 'Truth Moment' : 'Dare Challenge'}</h3>
                <div class="card-badge ${type}-badge">${type.toUpperCase()}</div>
            </div>
            
            <div class="card-content">
                <p class="card-text">${result}</p>
            </div>
            
            <div class="card-actions">
                <button class="action-btn secondary-btn" onclick="playTruthOrDare('${type}')">
                    <span class="btn-icon">🔄</span>
                    Another ${type}!
                </button>
                <button class="action-btn primary-btn" onclick="markTruthDareComplete('${type}')">
                    <span class="btn-icon">✅</span>
                    Completed!
                </button>
            </div>
            
            <div class="completion-indicator ${type}-completion" id="${type}CompletionIndicator">
                <div class="completion-sparkle">✨</div>
                <div class="completion-text">Amazing job!</div>
            </div>
        </div>
    `;
    
    // Animate the card in
    setTimeout(() => {
        const card = resultContainer.querySelector('.truth-dare-card');
        if (card) {
            card.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    }, 100);
}

function updateTruthDareStats(type) {
    const countElement = document.getElementById(type + 'Count');
    if (countElement) {
        const currentCount = parseInt(countElement.textContent) || 0;
        countElement.textContent = currentCount + 1;
        
        // Add pulse animation
        countElement.style.transform = 'scale(1.3)';
        countElement.style.color = type === 'truth' ? '#8b5a83' : '#ff6b9d';
        
        setTimeout(() => {
            countElement.style.transform = 'scale(1)';
            countElement.style.color = '#333';
        }, 300);
    }
}

function markTruthDareComplete(type) {
    const indicator = document.getElementById(type + 'CompletionIndicator');
    if (indicator) {
        indicator.style.display = 'flex';
        indicator.style.animation = 'completionPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        // Create confetti for completion
        createConfetti();
        
        setTimeout(() => {
            indicator.style.display = 'none';
        }, 2000);
    }
}
