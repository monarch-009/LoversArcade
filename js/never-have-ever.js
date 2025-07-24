/* ===== NEVER HAVE I EVER GAME ===== */
/* Never Have I Ever game functionality */

// Game state for Never Have I Ever
let neverHaveState = {
    currentStatements: [],
    currentIndex: 0,
    player1Score: 0,
    player2Score: 0,
    maxStatements: 10
};

function getNeverHaveIEverContent() {
    return `
        <div class="never-have-container">
            <div class="never-have-header">
                <h2 style="color: #8b5a83; font-size: 2.2rem; margin-bottom: 1rem; font-weight: 600; text-align: center;">
                    <span style="font-size: 2rem;">🙋‍♀️</span> Never Have I Ever <span style="font-size: 2rem;">🙋‍♂️</span>
                </h2>
                <p style="text-align: center; color: #666; font-size: 1.1rem; margin-bottom: 2rem; line-height: 1.5;">
                    Discover surprising secrets about each other with our romantic twist on the classic game!
                </p>
            </div>

            <!-- Clean Scoreboard -->
            <div style="display: flex; gap: 1rem; margin: 2rem 0; background: white; 
                        border-radius: 15px; padding: 2rem; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                        border: 1px solid #f0f0f0;">
                <div style="text-align: center; flex: 1;">
                    <div style="color: #8b5a83; font-size: 0.9rem; margin-bottom: 0.5rem;">Player 1</div>
                    <div style="font-size: 2.5rem; font-weight: 700; color: #333;" id="player1Score">0</div>
                    <div style="color: #999; font-size: 0.8rem;">experiences</div>
                </div>
                <div style="display: flex; align-items: center; justify-content: center; min-width: 60px;">
                    <div style="width: 2px; height: 60px; background: linear-gradient(to bottom, #8b5a83, #ff6b9d); border-radius: 1px;"></div>
                </div>
                <div style="text-align: center; flex: 1;">
                    <div style="color: #8b5a83; font-size: 0.9rem; margin-bottom: 0.5rem;">Player 2</div>
                    <div style="font-size: 2.5rem; font-weight: 700; color: #333;" id="player2Score">0</div>
                    <div style="color: #999; font-size: 0.8rem;">experiences</div>
                </div>
            </div>

            <div id="neverHaveContainer">
                <!-- Clean Statement Card -->
                <div id="currentStatement" style="background: white; border-radius: 15px; padding: 2.5rem; 
                                                 text-align: center; margin: 2rem 0; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                                                 border: 1px solid #f0f0f0;">
                    <div style="color: #8b5a83; font-size: 0.9rem; margin-bottom: 1rem; font-weight: 500;" id="currentRound">Round 1 of 10</div>
                    <h3 id="statementText" style="font-size: 1.4rem; margin: 0; color: #333; font-weight: 500; line-height: 1.4;">
                        Click "Start Game" to begin!
                    </h3>
                </div>

                <div id="gameControls" style="text-align: center; margin: 2rem 0;">
                    <button class="game-button" onclick="startNeverHaveGame()" id="startBtn" 
                            style="background: linear-gradient(135deg, #8b5a83, #ff6b9d); color: white; 
                                   border: none; border-radius: 12px; padding: 1.5rem 2.5rem; 
                                   font-size: 1.1rem; cursor: pointer; font-weight: 500;
                                   box-shadow: 0 4px 15px rgba(139, 90, 131, 0.3);">
                        Start Game! 🎯
                    </button>
                    <div id="responseButtons" class="hidden" style="margin-top: 2rem;">
                        <!-- Clean Player Response Grid -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                            
                            <!-- Player 1 Responses -->
                            <div style="background: white; border-radius: 15px; padding: 1.5rem; 
                                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #f0f0f0;">
                                <div style="color: #8b5a83; font-size: 0.9rem; margin-bottom: 1rem; font-weight: 500; text-align: center;">
                                    Player 1
                                </div>
                                <div style="display: flex; gap: 0.5rem;">
                                    <button onclick="playerResponse(1, true)" 
                                            style="flex: 1; background: #4caf50; color: white; border: none; 
                                                   border-radius: 8px; padding: 0.8rem; font-size: 0.9rem; 
                                                   cursor: pointer; font-weight: 500;">
                                        I HAVE! ✋
                                    </button>
                                    <button onclick="playerResponse(1, false)" 
                                            style="flex: 1; background: #f44336; color: white; border: none; 
                                                   border-radius: 8px; padding: 0.8rem; font-size: 0.9rem; 
                                                   cursor: pointer; font-weight: 500;">
                                        Never! 🙅
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Player 2 Responses -->
                            <div style="background: white; border-radius: 15px; padding: 1.5rem; 
                                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #f0f0f0;">
                                <div style="color: #8b5a83; font-size: 0.9rem; margin-bottom: 1rem; font-weight: 500; text-align: center;">
                                    Player 2
                                </div>
                                <div style="display: flex; gap: 0.5rem;">
                                    <button onclick="playerResponse(2, true)" 
                                            style="flex: 1; background: #4caf50; color: white; border: none; 
                                                   border-radius: 8px; padding: 0.8rem; font-size: 0.9rem; 
                                                   cursor: pointer; font-weight: 500;">
                                        I HAVE! ✋
                                    </button>
                                    <button onclick="playerResponse(2, false)" 
                                            style="flex: 1; background: #f44336; color: white; border: none; 
                                                   border-radius: 8px; padding: 0.8rem; font-size: 0.9rem; 
                                                   cursor: pointer; font-weight: 500;">
                                        Never! 🙅
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Next Button -->
                        <div style="text-align: center;">
                            <button onclick="nextNeverHaveStatement()" 
                                    style="background: linear-gradient(135deg, #ff6b9d, #8b5a83); color: white; 
                                           border: none; border-radius: 12px; padding: 1rem 2rem; 
                                           font-size: 1rem; cursor: pointer; font-weight: 500;
                                           box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);">
                                Next Statement ➡️
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="neverHaveResult" class="hidden">
                <!-- Clean Results Card -->
                <div style="background: white; border-radius: 15px; padding: 2.5rem; text-align: center;
                            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #f0f0f0;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
                    <h3 style="color: #8b5a83; font-size: 1.8rem; margin-bottom: 1rem; font-weight: 600;">Game Complete!</h3>
                    
                    <div id="finalScores" style="margin: 2rem 0;"></div>
                    <div id="winner" style="font-size: 1.3rem; color: #ff6b9d; margin: 1.5rem 0; font-weight: 500;"></div>
                    
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">
                        <p style="color: #666; font-style: italic; margin: 0; line-height: 1.5;">
                            "The best relationships are built on knowing each other's stories. 
                            Every 'I have' and 'Never' brings you closer together!" 💕
                        </p>
                    </div>
                    
                    <button onclick="resetNeverHaveGame()" 
                            style="background: linear-gradient(135deg, #8b5a83, #ff6b9d); color: white; 
                                   border: none; border-radius: 12px; padding: 1rem 2rem; 
                                   font-size: 1rem; cursor: pointer; font-weight: 500;
                                   box-shadow: 0 4px 15px rgba(139, 90, 131, 0.3);">
                        Play Again! 🔄
                    </button>
                </div>
            </div>
        </div>
    `;
}

function startNeverHaveGame() {
    if (!neverHaveIEverData || neverHaveIEverData.length === 0) {
        console.error('Never Have I Ever data not available');
        return;
    }
    
    // Reset game state
    neverHaveState.currentStatements = [...neverHaveIEverData].sort(() => 0.5 - Math.random()).slice(0, neverHaveState.maxStatements);
    neverHaveState.currentIndex = 0;
    neverHaveState.player1Score = 0;
    neverHaveState.player2Score = 0;
    
    // Update UI
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('responseButtons').classList.remove('hidden');
    document.getElementById('neverHaveResult').classList.add('hidden');
    
    // Reset scores display
    document.getElementById('player1Score').textContent = '0';
    document.getElementById('player2Score').textContent = '0';
    
    // Show first statement
    showCurrentStatement();
}

function showCurrentStatement() {
    if (neverHaveState.currentIndex >= neverHaveState.currentStatements.length) {
        showNeverHaveResults();
        return;
    }
    
    const statement = neverHaveState.currentStatements[neverHaveState.currentIndex];
    const roundNumber = neverHaveState.currentIndex + 1;
    
    document.getElementById('currentRound').textContent = `Round ${roundNumber} of ${neverHaveState.maxStatements}`;
    document.getElementById('statementText').textContent = `Never have I ever ${statement}`;
}

function playerResponse(player, hasExperience) {
    if (hasExperience) {
        if (player === 1) {
            neverHaveState.player1Score++;
            document.getElementById('player1Score').textContent = neverHaveState.player1Score;
        } else {
            neverHaveState.player2Score++;
            document.getElementById('player2Score').textContent = neverHaveState.player2Score;
        }
    }
}

function nextNeverHaveStatement() {
    neverHaveState.currentIndex++;
    showCurrentStatement();
}

function showNeverHaveResults() {
    document.getElementById('neverHaveContainer').classList.add('hidden');
    document.getElementById('neverHaveResult').classList.remove('hidden');
    
    const finalScores = document.getElementById('finalScores');
    const winner = document.getElementById('winner');
    
    finalScores.innerHTML = `
        <div style="display: flex; justify-content: space-around; margin-bottom: 2rem;">
            <div>
                <div style="font-size: 1.5rem; font-weight: 600; color: #8b5a83;">Player 1</div>
                <div style="font-size: 2rem; font-weight: 700; color: #333;">${neverHaveState.player1Score} experiences</div>
            </div>
            <div>
                <div style="font-size: 1.5rem; font-weight: 600; color: #8b5a83;">Player 2</div>
                <div style="font-size: 2rem; font-weight: 700; color: #333;">${neverHaveState.player2Score} experiences</div>
            </div>
        </div>
    `;
    
    if (neverHaveState.player1Score > neverHaveState.player2Score) {
        winner.textContent = "Player 1 is the Experience Champion! 👑";
    } else if (neverHaveState.player2Score > neverHaveState.player1Score) {
        winner.textContent = "Player 2 is the Experience Champion! 👑";
    } else {
        winner.textContent = "It's a tie! You're both adventurous souls! 🤝";
    }
    
    // Create confetti
    createConfetti();
}

function resetNeverHaveGame() {
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('responseButtons').classList.add('hidden');
    document.getElementById('neverHaveResult').classList.add('hidden');
    document.getElementById('neverHaveContainer').classList.remove('hidden');
    
    document.getElementById('currentRound').textContent = 'Round 1 of 10';
    document.getElementById('statementText').textContent = 'Click "Start Game" to begin!';
    document.getElementById('player1Score').textContent = '0';
    document.getElementById('player2Score').textContent = '0';
}
