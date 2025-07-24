/* ===== QUIZ GAME ===== */
/* Who Knows Me Better quiz game functionality */

// Enhanced quiz state management
let enhancedQuizState = {
    questionIndex: 0,
    player1Score: 0,
    player2Score: 0,
    currentPlayer: 1,
    currentQuestions: [],
    totalQuestions: 15,
    difficulty: 'mixed',
    timeLeft: 30,
    timer: null
};

function getWhoKnowsMeContent() {
    return `
        <div class="who-knows-container">
            <div class="who-knows-header">
                <h2 style="color: #8b5a83; font-size: 2.2rem; margin-bottom: 1rem; font-weight: 600; text-align: center;">
                    <span style="font-size: 2rem;">🧠</span> Who Knows Me Better? <span style="font-size: 2rem;">❤️</span>
                </h2>
                <p style="text-align: center; color: #666; font-size: 1.1rem; margin-bottom: 2rem; line-height: 1.5;">
                    Test how well you truly know each other with thoughtful questions designed for couples!
                </p>
            </div>

            <div id="questionPhase" style="text-align: center; margin: 2rem 0;">
                <div style="background: white; border-radius: 15px; padding: 2.5rem; margin: 2rem 0; 
                            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #f0f0f0;">
                    <h3 style="color: #8b5a83; margin-bottom: 2rem;">Choose Your Challenge Level</h3>
                    
                    <!-- Difficulty Selection -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
                                gap: 1rem; margin-bottom: 2rem;">
                        <button onclick="startEnhancedQuiz('easy')" 
                                style="background: #4caf50; color: white; border: none; padding: 1.5rem; 
                                       border-radius: 12px; cursor: pointer; font-size: 1rem; font-weight: 500;
                                       transition: all 0.3s ease;">
                            🌱 Easy<br><small style="font-size: 0.8rem; opacity: 0.9;">Basic preferences & favorites</small>
                        </button>
                        <button onclick="startEnhancedQuiz('medium')" 
                                style="background: #ff9800; color: white; border: none; padding: 1.5rem; 
                                       border-radius: 12px; cursor: pointer; font-size: 1rem; font-weight: 500;
                                       transition: all 0.3s ease;">
                            🔥 Medium<br><small style="font-size: 0.8rem; opacity: 0.9;">Personal thoughts & dreams</small>
                        </button>
                        <button onclick="startEnhancedQuiz('hard')" 
                                style="background: #f44336; color: white; border: none; padding: 1.5rem; 
                                       border-radius: 12px; cursor: pointer; font-size: 1rem; font-weight: 500;
                                       transition: all 0.3s ease;">
                            💪 Hard<br><small style="font-size: 0.8rem; opacity: 0.9;">Deep feelings & secrets</small>
                        </button>
                        <button onclick="startEnhancedQuiz('mixed')" 
                                style="background: linear-gradient(135deg, #8b5a83, #ff6b9d); color: white; border: none; 
                                       padding: 1.5rem; border-radius: 12px; cursor: pointer; font-size: 1rem; font-weight: 500;
                                       transition: all 0.3s ease;">
                            🎯 Mixed<br><small style="font-size: 0.8rem; opacity: 0.9;">All difficulty levels</small>
                        </button>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 12px; margin-top: 2rem;">
                        <h4 style="color: #8b5a83; margin-bottom: 1rem;">How to Play:</h4>
                        <div style="text-align: left; color: #666; line-height: 1.6;">
                            <p>• Players take turns answering questions about each other</p>
                            <p>• Get points for correct guesses</p>
                            <p>• Hard questions have time limits and bonus points</p>
                            <p>• The player with the most points wins!</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="quizContent">
                <!-- Quiz questions will appear here -->
            </div>
        </div>
    `;
}

function startEnhancedQuiz(difficulty) {
    enhancedQuizState.difficulty = difficulty;
    enhancedQuizState.questionIndex = 0;
    enhancedQuizState.player1Score = 0;
    enhancedQuizState.player2Score = 0;
    enhancedQuizState.currentPlayer = 1;
    
    // Create question pool based on difficulty
    let questionPool = [];
    if (difficulty === 'mixed') {
        questionPool = [...enhancedQuizQuestions.easy, ...enhancedQuizQuestions.medium, ...enhancedQuizQuestions.hard];
    } else {
        questionPool = [...enhancedQuizQuestions[difficulty]];
    }
    
    // Shuffle and select questions
    enhancedQuizState.currentQuestions = questionPool
        .sort(() => 0.5 - Math.random())
        .slice(0, enhancedQuizState.totalQuestions);
    
    document.getElementById('questionPhase').style.display = 'none';
    showEnhancedQuestion();
}

function showEnhancedQuestion() {
    if (enhancedQuizState.questionIndex >= enhancedQuizState.currentQuestions.length) {
        showEnhancedQuizResults();
        return;
    }

    const currentQ = enhancedQuizState.currentQuestions[enhancedQuizState.questionIndex];
    const progress = ((enhancedQuizState.questionIndex + 1) / enhancedQuizState.currentQuestions.length) * 100;
    
    // Start 30-second timer for harder questions
    if (enhancedQuizState.difficulty === 'hard' || enhancedQuizState.difficulty === 'mixed') {
        enhancedQuizState.timeLeft = 30;
        startQuestionTimer();
    }

    document.getElementById('quizContent').innerHTML = `
        <div style="background: white; border-radius: 15px; padding: 2rem; 
                    box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin: 2rem 0; border: 1px solid #f0f0f0;">
            
            <!-- Simple Progress Bar -->
            <div style="background: #f8f9fa; height: 6px; border-radius: 3px; margin-bottom: 2rem; overflow: hidden;">
                <div style="background: linear-gradient(90deg, #8b5a83, #ff6b9d); height: 100%; width: ${progress}%; 
                            transition: width 0.5s ease; border-radius: 3px;"></div>
            </div>
            
            <!-- Question Info -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
                <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                    <span style="background: #8b5a83; color: white; padding: 0.5rem 1rem; border-radius: 20px; 
                                 font-size: 0.9rem; font-weight: 500;">
                        Question ${enhancedQuizState.questionIndex + 1}/${enhancedQuizState.currentQuestions.length}
                    </span>
                    <span style="background: #f0f8ff; color: #666; padding: 0.5rem 1rem; border-radius: 20px; 
                                 font-size: 0.85rem;">${currentQ.category}</span>
                    <span style="background: #fff8e1; color: #f57c00; padding: 0.5rem 1rem; border-radius: 20px; 
                                 font-size: 0.85rem; font-weight: 500;">
                        ${currentQ.points} ${currentQ.points === 1 ? 'point' : 'points'}
                    </span>
                </div>
                ${(enhancedQuizState.difficulty === 'hard' || enhancedQuizState.difficulty === 'mixed') ? 
                    `<div id="questionTimer" style="background: #ff6b9d; color: white; padding: 0.5rem 1rem; 
                                                   border-radius: 20px; font-weight: 600; font-size: 0.9rem;">
                        ⏰ ${enhancedQuizState.timeLeft}s
                    </div>` : ''
                }
            </div>

            <!-- Player Turn -->
            <div style="text-align: center; margin: 2rem 0;">
                <div style="background: linear-gradient(135deg, #8b5a83, #ff6b9d); color: white; 
                            padding: 1.5rem 2rem; border-radius: 12px; display: inline-block;
                            font-size: 1.1rem; font-weight: 500;">
                    Player ${enhancedQuizState.currentPlayer}'s Turn
                </div>
            </div>

            <!-- Question -->
            <div style="text-align: center; margin: 2rem 0;">
                <h3 style="color: #333; font-size: 1.3rem; font-weight: 500; line-height: 1.5; margin-bottom: 2rem;">
                    ${currentQ.question}
                </h3>
                
                <!-- Answer Buttons -->
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button onclick="submitQuizAnswer(true)" 
                            style="background: #4caf50; color: white; border: none; padding: 1rem 2rem; 
                                   border-radius: 12px; font-size: 1rem; cursor: pointer; 
                                   transition: all 0.3s ease; min-width: 120px;">
                        ✓ Correct
                    </button>
                    <button onclick="submitQuizAnswer(false)" 
                            style="background: #f44336; color: white; border: none; padding: 1rem 2rem; 
                                   border-radius: 12px; font-size: 1rem; cursor: pointer; 
                                   transition: all 0.3s ease; min-width: 120px;">
                        ✗ Wrong
                    </button>
                </div>
            </div>

            <!-- Current Scores -->
            <div style="display: flex; justify-content: space-around; background: #f8f9fa; 
                        padding: 1.5rem; border-radius: 12px; margin-top: 2rem;">
                <div style="text-align: center;">
                    <div style="color: #8b5a83; font-size: 0.9rem; margin-bottom: 0.5rem;">Player 1</div>
                    <div style="font-size: 1.8rem; font-weight: 700; color: #333;" id="currentP1Score">${enhancedQuizState.player1Score}</div>
                </div>
                <div style="text-align: center;">
                    <div style="color: #8b5a83; font-size: 0.9rem; margin-bottom: 0.5rem;">Player 2</div>
                    <div style="font-size: 1.8rem; font-weight: 700; color: #333;" id="currentP2Score">${enhancedQuizState.player2Score}</div>
                </div>
            </div>
        </div>
    `;
}

function startQuestionTimer() {
    if (enhancedQuizState.timer) {
        clearInterval(enhancedQuizState.timer);
    }
    
    enhancedQuizState.timer = setInterval(() => {
        enhancedQuizState.timeLeft--;
        const timerElement = document.getElementById('questionTimer');
        if (timerElement) {
            timerElement.textContent = `⏰ ${enhancedQuizState.timeLeft}s`;
            
            if (enhancedQuizState.timeLeft <= 5) {
                timerElement.style.background = '#f44336';
                timerElement.style.animation = 'pulse 0.5s infinite';
            }
        }
        
        if (enhancedQuizState.timeLeft <= 0) {
            clearInterval(enhancedQuizState.timer);
            submitQuizAnswer(false); // Auto-submit as wrong
        }
    }, 1000);
}

function submitQuizAnswer(correct) {
    if (enhancedQuizState.timer) {
        clearInterval(enhancedQuizState.timer);
    }
    
    const currentQ = enhancedQuizState.currentQuestions[enhancedQuizState.questionIndex];
    
    if (correct) {
        if (enhancedQuizState.currentPlayer === 1) {
            enhancedQuizState.player1Score += currentQ.points;
        } else {
            enhancedQuizState.player2Score += currentQ.points;
        }
    }
    
    // Update display
    document.getElementById('currentP1Score').textContent = enhancedQuizState.player1Score;
    document.getElementById('currentP2Score').textContent = enhancedQuizState.player2Score;
    
    // Switch players and move to next question
    enhancedQuizState.currentPlayer = enhancedQuizState.currentPlayer === 1 ? 2 : 1;
    enhancedQuizState.questionIndex++;
    
    setTimeout(() => {
        showEnhancedQuestion();
    }, 1000);
}

function showEnhancedQuizResults() {
    const winner = enhancedQuizState.player1Score > enhancedQuizState.player2Score ? 1 : 
                   enhancedQuizState.player2Score > enhancedQuizState.player1Score ? 2 : 'tie';
    
    document.getElementById('quizContent').innerHTML = `
        <div style="background: white; border-radius: 15px; padding: 2.5rem; text-align: center;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #f0f0f0;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🏆</div>
            <h3 style="color: #8b5a83; font-size: 1.8rem; margin-bottom: 1rem; font-weight: 600;">Quiz Complete!</h3>
            
            <div style="display: flex; justify-content: space-around; margin: 2rem 0; background: #f8f9fa; 
                        padding: 2rem; border-radius: 12px;">
                <div style="text-align: center;">
                    <div style="color: #8b5a83; font-size: 1rem; margin-bottom: 0.5rem;">Player 1</div>
                    <div style="font-size: 2.5rem; font-weight: 700; color: #333;">${enhancedQuizState.player1Score}</div>
                    <div style="color: #999; font-size: 0.9rem;">points</div>
                </div>
                <div style="text-align: center;">
                    <div style="color: #8b5a83; font-size: 1rem; margin-bottom: 0.5rem;">Player 2</div>
                    <div style="font-size: 2.5rem; font-weight: 700; color: #333;">${enhancedQuizState.player2Score}</div>
                    <div style="color: #999; font-size: 0.9rem;">points</div>
                </div>
            </div>
            
            <div style="font-size: 1.3rem; color: #ff6b9d; margin: 1.5rem 0; font-weight: 500;">
                ${winner === 'tie' ? "It's a tie! You both know each other perfectly! 🤝" : 
                  `Player ${winner} knows their partner best! 👑`}
            </div>
            
            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">
                <p style="color: #666; font-style: italic; margin: 0; line-height: 1.5;">
                    "True love is not about knowing everything about each other, 
                    but about continuing to discover new things every day!" 💕
                </p>
            </div>
            
            <button onclick="location.reload()" 
                    style="background: linear-gradient(135deg, #8b5a83, #ff6b9d); color: white; 
                           border: none; border-radius: 12px; padding: 1rem 2rem; 
                           font-size: 1rem; cursor: pointer; font-weight: 500;
                           box-shadow: 0 4px 15px rgba(139, 90, 131, 0.3);">
                Play Again! 🔄
            </button>
        </div>
    `;
    
    // Create confetti
    createConfetti();
}
