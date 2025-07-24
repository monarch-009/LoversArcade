/* ===== ENHANCED MUSIC SYSTEM ===== */
/* Advanced music player with emotional categories and controls */

// Music System Variables
let currentAudio = null;
let currentCategory = null;
let isPlaying = false;
let isMuted = false;
let isLooping = false;
let currentVolume = 50;
let previousVolume = 50;
let progressUpdateInterval = null;

// Emotional category configurations
const instrumentConfig = {
    romantic: {
        name: 'Romantic',
        description: 'Love & Passion',
        audioId: 'romanticAudio',
        icon: '💕'
    },
    peaceful: {
        name: 'Peaceful',
        description: 'Calm & Serene',
        audioId: 'peacefulAudio',
        icon: '�'
    },
    joyful: {
        name: 'Joyful',
        description: 'Happy & Uplifting',
        audioId: 'joyfulAudio',
        icon: '😊'
    },
    dreamy: {
        name: 'Dreamy',
        description: 'Soft & Ethereal',
        audioId: 'dreamyAudio',
        icon: '�'
    },
    intimate: {
        name: 'Intimate',
        description: 'Close & Personal',
        audioId: 'intimateAudio',
        icon: '🕯️'
    }
};

// Initialize music system
function initMusicSystem() {
    console.log('Initializing music system...');
    
    // Set up event listeners for all audio elements
    Object.keys(instrumentConfig).forEach(instrument => {
        const audio = document.getElementById(instrumentConfig[instrument].audioId);
        if (audio) {
            console.log(`Found audio element: ${instrumentConfig[instrument].audioId}`);
            console.log(`Audio source: ${audio.src}`);
            
            audio.addEventListener('loadedmetadata', updateTotalTime);
            audio.addEventListener('timeupdate', updateProgress);
            audio.addEventListener('ended', handleTrackEnd);
            audio.addEventListener('error', handleAudioError);
            
            // Set initial volume
            audio.volume = currentVolume / 100;
            
            // Test if audio can be loaded
            audio.addEventListener('canplay', () => {
                console.log(`Audio ${instrumentConfig[instrument].name} is ready to play`);
            });
            
            audio.addEventListener('loadstart', () => {
                console.log(`Loading ${instrumentConfig[instrument].name} audio...`);
            });
        } else {
            console.error(`Audio element not found: ${instrumentConfig[instrument].audioId}`);
        }
    });
    
    // Set up category card listeners
    document.querySelectorAll('.instrument-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.instrument;
            console.log(`Selected category: ${category}`);
            selectCategory(category);
        });
    });
    
    // Initialize volume slider
    const volumeSlider = document.getElementById('volumeSlider');
    if (volumeSlider) {
        volumeSlider.value = currentVolume;
        updateVolumeDisplay();
        updateVolumeSliderVisual();
        console.log(`Volume initialized to: ${currentVolume}%`);
    }
    
    // Set up progress bar clicking
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.addEventListener('click', seekToPosition);
    }
    
    console.log('Music system initialization complete');
}

// Toggle music panel visibility
function toggleMusicPanel() {
    const panel = document.getElementById('musicPanel');
    const btn = document.getElementById('musicBtn');
    
    if (!panel || !btn) return;
    
    if (panel.classList.contains('active')) {
        closeMusicPanel();
    } else {
        openMusicPanel();
    }
}

// Open music panel
function openMusicPanel() {
    const panel = document.getElementById('musicPanel');
    const btn = document.getElementById('musicBtn');
    
    if (panel && btn) {
        panel.classList.add('active');
        btn.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

// Close music panel
function closeMusicPanel() {
    const panel = document.getElementById('musicPanel');
    const btn = document.getElementById('musicBtn');
    
    if (panel && btn) {
        panel.classList.remove('active');
        btn.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Select emotional category
function selectCategory(category) {
    if (!instrumentConfig[category]) return;
    
    // Stop current audio if playing
    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
    }
    
    // Update visual selection
    document.querySelectorAll('.instrument-card').forEach(card => {
        card.classList.remove('active');
    });
    
    const selectedCard = document.querySelector(`[data-instrument="${category}"]`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }
    
    // Set new current audio
    currentCategory = category;
    currentAudio = document.getElementById(instrumentConfig[category].audioId);
    
    if (currentAudio) {
        currentAudio.volume = currentVolume / 100;
        currentAudio.loop = isLooping;
        
        // Update now playing display
        updateNowPlaying();
        
        // Auto-play if available (only works with user interaction)
        if (currentAudio.readyState >= 2) { // HAVE_CURRENT_DATA
            playSelectedMusic();
        } else {
            // Wait for audio to load
            currentAudio.addEventListener('canplay', playSelectedMusic, { once: true });
        }
    }
}

// Play selected music
function playSelectedMusic() {
    if (currentAudio) {
        // Log for debugging
        console.log('Attempting to play:', currentAudio.src);
        console.log('Audio ready state:', currentAudio.readyState);
        console.log('Audio volume:', currentAudio.volume);
        
        currentAudio.play().then(() => {
            isPlaying = true;
            updatePlayButton();
            startProgressUpdate();
            console.log('Audio playing successfully');
        }).catch(error => {
            console.log('Play failed:', error);
            // Show user-friendly message
            alert('Unable to play audio. Please check if the audio file exists and try clicking play manually.');
        });
    }
}

// Toggle playback
function togglePlayback() {
    if (!currentAudio) {
        alert('Please select a mood first!');
        return;
    }
    
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

// Play music
function playMusic() {
    if (currentAudio) {
        // Check if audio source exists
        console.log('Playing audio:', currentAudio.src);
        console.log('Audio duration:', currentAudio.duration);
        console.log('Audio volume:', currentAudio.volume);
        
        currentAudio.play().then(() => {
            isPlaying = true;
            updatePlayButton();
            startProgressUpdate();
            console.log('Music started successfully');
        }).catch(error => {
            console.error('Play failed:', error);
            alert('Unable to play audio. Please check your volume and ensure the audio file is available.');
        });
    } else {
        alert('No audio selected. Please select a mood first!');
    }
}

// Pause music
function pauseMusic() {
    if (currentAudio) {
        currentAudio.pause();
        isPlaying = false;
        updatePlayButton();
        stopProgressUpdate();
    }
}

// Stop music
function stopMusic() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        isPlaying = false;
        updatePlayButton();
        stopProgressUpdate();
        updateProgress(); // Reset progress display
    }
}

// Seek forward 10 seconds


// Toggle mute
function toggleMute() {
    const muteBtn = document.getElementById('muteBtn');
    const muteIcon = muteBtn?.querySelector('.mute-icon');
    
    if (isMuted) {
        // Unmute
        currentVolume = previousVolume;
        isMuted = false;
        if (muteIcon) muteIcon.textContent = '🔇';
    } else {
        // Mute
        previousVolume = currentVolume;
        currentVolume = 0;
        isMuted = true;
        if (muteIcon) muteIcon.textContent = '🔊';
    }
    
    // Apply volume to all audio elements
    Object.keys(instrumentConfig).forEach(instrument => {
        const audio = document.getElementById(instrumentConfig[instrument].audioId);
        if (audio) {
            audio.volume = currentVolume / 100;
        }
    });
    
    // Update volume slider and display
    const volumeSlider = document.getElementById('volumeSlider');
    if (volumeSlider) {
        volumeSlider.value = currentVolume;
    }
    updateVolumeDisplay();
}



// Set volume
function setVolume(value) {
    currentVolume = parseInt(value);
    isMuted = false;
    
    // Apply volume to all audio elements
    Object.keys(instrumentConfig).forEach(instrument => {
        const audio = document.getElementById(instrumentConfig[instrument].audioId);
        if (audio) {
            audio.volume = currentVolume / 100;
        }
    });
    
    // Update volume slider visual
    updateVolumeSliderVisual();
    updateVolumeDisplay();
    
    // Update mute button
    const muteBtn = document.getElementById('muteBtn');
    const muteIcon = muteBtn?.querySelector('.mute-icon');
    if (muteIcon) muteIcon.textContent = '🔇';
}

// Update volume slider visual appearance
function updateVolumeSliderVisual() {
    const volumeSlider = document.getElementById('volumeSlider');
    if (volumeSlider) {
        const percentage = currentVolume;
        volumeSlider.style.background = `linear-gradient(to right, 
            #667eea 0%, 
            #764ba2 ${percentage}%, 
            #e0e0e0 ${percentage}%, 
            #e0e0e0 100%)`;
    }
}

// Adjust volume
function adjustVolume(change) {
    const newVolume = Math.max(0, Math.min(100, currentVolume + change));
    const volumeSlider = document.getElementById('volumeSlider');
    
    if (volumeSlider) {
        volumeSlider.value = newVolume;
        setVolume(newVolume);
    }
}

// Update volume display
function updateVolumeDisplay() {
    const volumeDisplay = document.getElementById('volumeDisplay');
    if (volumeDisplay) {
        volumeDisplay.textContent = `${currentVolume}%`;
    }
}

// Update now playing display
function updateNowPlaying() {
    const currentTrack = document.getElementById('currentTrack');
    if (currentTrack && currentCategory) {
        const config = instrumentConfig[currentCategory];
        currentTrack.textContent = `${config.icon} ${config.name} - ${config.description}`;
    }
}

// Update play button
function updatePlayButton() {
    const playBtn = document.getElementById('playBtn');
    const playIcon = playBtn?.querySelector('.play-icon');
    const btnText = playBtn?.querySelector('.btn-text');
    
    if (playIcon && btnText) {
        if (isPlaying) {
            playIcon.textContent = '⏸️';
            btnText.textContent = 'Pause';
            playBtn.classList.add('active');
        } else {
            playIcon.textContent = '▶️';
            btnText.textContent = 'Play';
            playBtn.classList.remove('active');
        }
    }
}

// Update progress bar and time
function updateProgress() {
    if (!currentAudio) return;
    
    const progressFill = document.getElementById('progressFill');
    const currentTimeSpan = document.getElementById('currentTime');
    
    if (progressFill) {
        const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
        progressFill.style.width = `${progress || 0}%`;
        
        // Add smooth animation for progress updates
        progressFill.style.transition = currentAudio.paused ? 'none' : 'width 0.3s ease';
    }
    
    if (currentTimeSpan) {
        currentTimeSpan.textContent = formatTime(currentAudio.currentTime || 0);
    }
}

// Enhanced format time with better formatting
function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Update total time
function updateTotalTime() {
    const totalTimeSpan = document.getElementById('totalTime');
    if (totalTimeSpan && currentAudio) {
        totalTimeSpan.textContent = formatTime(currentAudio.duration || 0);
    }
}

// Seek to position with enhanced feedback
function seekToPosition(event) {
    if (!currentAudio || !currentAudio.duration) return;
    
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * currentAudio.duration;
    
    currentAudio.currentTime = newTime;
    updateProgress();
    
    // Visual feedback for seek
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.transform = 'scaleY(1.2)';
        setTimeout(() => {
            progressFill.style.transform = '';
        }, 200);
    }
}

// Start progress update interval
function startProgressUpdate() {
    stopProgressUpdate(); // Clear any existing interval
    progressUpdateInterval = setInterval(updateProgress, 1000);
}

// Stop progress update interval
function stopProgressUpdate() {
    if (progressUpdateInterval) {
        clearInterval(progressUpdateInterval);
        progressUpdateInterval = null;
    }
}

// Handle track end
function handleTrackEnd() {
    if (!isLooping) {
        isPlaying = false;
        updatePlayButton();
        stopProgressUpdate();
    }
}

// Handle audio error
function handleAudioError(event) {
    console.error('Audio error:', event);
    const audio = event.target;
    const category = Object.keys(instrumentConfig).find(key => 
        instrumentConfig[key].audioId === audio.id
    );
    
    if (category) {
        console.log(`Failed to load ${instrumentConfig[category].name} audio`);
        console.log('Audio source:', audio.src);
        console.log('Error details:', audio.error);
        
        // Show user-friendly error message
        alert(`Failed to load ${instrumentConfig[category].name} audio. Please check if the audio file exists at: ${audio.src}`);
    }
}

// Close panel when clicking outside
document.addEventListener('click', (event) => {
    const panel = document.getElementById('musicPanel');
    const btn = document.getElementById('musicBtn');
    
    if (panel && panel.classList.contains('active')) {
        if (!panel.contains(event.target) && event.target !== btn) {
            closeMusicPanel();
        }
    }
});

// Close panel with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const panel = document.getElementById('musicPanel');
        if (panel && panel.classList.contains('active')) {
            closeMusicPanel();
        }
    }
});

// Initialize music system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Delay initialization to ensure all elements are ready
    setTimeout(initMusicSystem, 100);
});
