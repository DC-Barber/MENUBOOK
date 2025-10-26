// loading-animation.js - Loading animation with progress bar and typing effect

// Configuration
const LOADING_CONFIG = {
    // Animation elements
    progressBar: true,
    typingEffect: true,
    floatingAnimation: true,
    
    // Content
    typingTexts: [
        "ဆံပင်ပုံစံများ ပြင်ဆင်နေသည်...",
        "ကျေးဇူးပြု၍ စောင့်ပေးပါ...",
        "Almost ready..."
    ],
    
    // Timing
    minDisplayTime: 10000, // Minimum time to show loading (ms)
    typingSpeed: 10,      // Characters per second
    textPause: 1000,      // Pause between texts (ms)
    
    // Storage keys
    cacheKey: 'hairstyle_data_cached',
    animationShownKey: 'loading_animation_shown'
};

// DOM Elements
let loadingOverlay, progressBar, progressText, typingContainer;

// Initialize loading animation
function initializeLoadingAnimation() {
    // Check if we should show loading animation
    if (shouldSkipLoading()) {
        console.log('✅ Skipping loading animation - data already cached');
        return;
    }
    
    console.log('🔄 Starting loading animation');
    createLoadingOverlay();
    startLoadingSequence();
}

// Check if we should skip loading animation
function shouldSkipLoading() {
    // Check if data is already cached in localStorage
    const isDataCached = localStorage.getItem(LOADING_CONFIG.cacheKey) === 'true';
    const animationShown = sessionStorage.getItem(LOADING_CONFIG.animationShownKey) === 'true';
    
    // Skip if data is cached AND animation was shown in this session
    return isDataCached && animationShown;
}

// Create loading overlay
function createLoadingOverlay() {
    // Create overlay
    loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(10px);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: 'HWA Myanmar', 'Pyidaungsu', 'Myanmar3', 'Noto Sans Myanmar', sans-serif;
    `;
    
    // Create loading container (no background, no padding)
    const loadingContainer = document.createElement('div');
    loadingContainer.style.cssText = `
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 25px;
    `;
    
    // Create logo image
    const logo = document.createElement('img');
    logo.src = 'logo.jpg';
    logo.alt = 'Diamond Crown Barber';
    logo.style.cssText = `
        width: 80px;
        height: 80px;
        object-fit: contain;
        animation: float 3s ease-in-out infinite;
        border-radius: 50%;
        box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
    `;
    
    // Create progress bar container
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
        width: 250px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    `;
    
    // Create progress bar
    progressBar = document.createElement('div');
    progressBar.style.cssText = `
        width: 100%;
        height: 6px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
        overflow: hidden;
    `;
    
    const progressFill = document.createElement('div');
    progressFill.id = 'progress-fill';
    progressFill.style.cssText = `
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #ff0000, #ff6b6b);
        border-radius: 3px;
        transition: width 0.3s ease;
        box-shadow: 0 0 10px #ff0000;
    `;
    
    progressBar.appendChild(progressFill);
    
    // Create progress text
    progressText = document.createElement('div');
    progressText.id = 'progress-text';
    progressText.style.cssText = `
        font-size: 0.9rem;
        color: #ff6b6b;
        text-align: center;
        font-weight: bold;
        text-shadow: 0 0 8px rgba(255, 0, 0, 0.8);
    `;
    progressText.textContent = '0%';
    
    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(progressText);
    
    // Create typing container
    typingContainer = document.createElement('div');
    typingContainer.id = 'typing-container';
    typingContainer.style.cssText = `
        height: 28px;
        font-size: 1rem;
        color: #ff4444;
        text-align: center;
        font-weight: bold;
        text-shadow: 0 0 10px rgba(255, 0, 0, 0.9);
        letter-spacing: 0.5px;
    `;
    
    // Assemble the loading screen
    loadingContainer.appendChild(logo);
    
    if (LOADING_CONFIG.progressBar) {
        loadingContainer.appendChild(progressContainer);
    }
    
    if (LOADING_CONFIG.typingEffect) {
        loadingContainer.appendChild(typingContainer);
    }
    
    loadingOverlay.appendChild(loadingContainer);
    document.body.appendChild(loadingOverlay);
    
    // Add floating animation styles
    if (LOADING_CONFIG.floatingAnimation) {
        addFloatingAnimationStyles();
    }
}

// Add CSS for floating animation
function addFloatingAnimationStyles() {
    const style = document.createElement('style');
    style.id = 'loading-animation-styles';
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-15px);
            }
            100% {
                transform: translateY(0px);
            }
        }
        
        @keyframes glow {
            0% {
                filter: drop-shadow(0 0 5px #ff0000);
            }
            50% {
                filter: drop-shadow(0 0 15px #ff0000) drop-shadow(0 0 25px #ff4444);
            }
            100% {
                filter: drop-shadow(0 0 5px #ff0000);
            }
        }
        
        #loading-overlay {
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        
        .typing-cursor {
            display: inline-block;
            width: 4px;
            height: 1.2em;
            background: #ff0000;
            margin-left: 3px;
            animation: blink 0.8s infinite, glow 1.5s infinite;
            border-radius: 1px;
            box-shadow: 0 0 8px #ff0000;
        }
        
        @keyframes blink {
            0%, 50% {
                opacity: 1;
            }
            51%, 100% {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Start the loading sequence
function startLoadingSequence() {
    const startTime = Date.now();
    
    // Start progress simulation
    if (LOADING_CONFIG.progressBar) {
        simulateProgress();
    }
    
    // Start typing effect
    if (LOADING_CONFIG.typingEffect) {
        startTypingEffect();
    }
    
    // Check when to hide loading
    const checkLoadingComplete = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        
        // Check if minimum display time has passed AND data is ready
        if (elapsedTime >= LOADING_CONFIG.minDisplayTime && isDataReady()) {
            clearInterval(checkLoadingComplete);
            completeLoading();
        }
    }, 100);
    
    // Fallback: Hide loading after 5 seconds max
    setTimeout(() => {
        clearInterval(checkLoadingComplete);
        if (loadingOverlay && loadingOverlay.parentNode) {
            completeLoading();
        }
    }, 5000);
}

// Simulate progress bar
function simulateProgress() {
    let progress = 0;
    const progressFill = document.getElementById('progress-fill');
    
    const progressInterval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(progressInterval);
            return;
        }
        
        // Slow down as we approach 100%
        const increment = progress < 80 ? 2 : 0.5;
        progress = Math.min(progress + increment, 100);
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${Math.round(progress)}%`;
        }
        
        // Stop at 95% until data is actually ready
        if (progress >= 95 && !isDataReady()) {
            clearInterval(progressInterval);
        }
    }, 50);
}

// Start typing effect
function startTypingEffect() {
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = LOADING_CONFIG.typingTexts[currentTextIndex];
        
        if (isDeleting) {
            // Deleting text
            currentCharIndex--;
            if (currentCharIndex <= 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % LOADING_CONFIG.typingTexts.length;
                setTimeout(type, 500);
                return;
            }
        } else {
            // Typing text
            currentCharIndex++;
            if (currentCharIndex > currentText.length) {
                isDeleting = true;
                setTimeout(type, LOADING_CONFIG.textPause);
                return;
            }
        }
        
        // Update display
        if (typingContainer) {
            const displayText = currentText.substring(0, currentCharIndex);
            typingContainer.innerHTML = `${displayText}<span class="typing-cursor"></span>`;
        }
        
        // Schedule next character
        const typeSpeed = isDeleting ? LOADING_CONFIG.typingSpeed / 2 : LOADING_CONFIG.typingSpeed;
        setTimeout(type, typeSpeed);
    }
    
    // Start typing
    type();
}

// Check if data is ready
function isDataReady() {
    // Check if hairstyles data is loaded
    if (typeof hairstyles === 'undefined') {
        return false;
    }
    
    // Check if DOM is ready
    if (document.readyState !== 'complete') {
        return false;
    }
    
    // Check if main content elements exist
    const mainContent = document.getElementById('mainContent');
    const hairstyleGrid = document.getElementById('hairstyleGrid');
    
    if (!mainContent || !hairstyleGrid) {
        return false;
    }
    
    // Additional checks for critical data
    try {
        // Check if we have at least some hairstyles
        if (!hairstyles || hairstyles.length === 0) {
            return false;
        }
        
        // Check if images are likely loaded (first few images)
        const firstHairstyle = hairstyles[0];
        if (!firstHairstyle.images || firstHairstyle.images.length === 0) {
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error checking data readiness:', error);
        return false;
    }
}

// Complete loading and hide animation
function completeLoading() {
    console.log('✅ Loading complete, hiding animation');
    
    // Mark data as cached for future visits
    localStorage.setItem(LOADING_CONFIG.cacheKey, 'true');
    sessionStorage.setItem(LOADING_CONFIG.animationShownKey, 'true');
    
    // Update progress to 100% if needed
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = '100%';
    }
    
    if (progressText) {
        progressText.textContent = '100%';
    }
    
    // Fade out animation
    if (loadingOverlay) {
        loadingOverlay.style.animation = 'fadeOut 0.5s ease forwards';
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (loadingOverlay && loadingOverlay.parentNode) {
                loadingOverlay.parentNode.removeChild(loadingOverlay);
            }
        }, 500);
    }
}

// Manual control functions (for external use)
window.LoadingAnimation = {
    show: function() {
        if (loadingOverlay && loadingOverlay.parentNode) {
            return; // Already showing
        }
        createLoadingOverlay();
    },
    
    hide: function() {
        completeLoading();
    },
    
    setProgress: function(percent) {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        if (progressFill) {
            progressFill.style.width = `${percent}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${percent}%`;
        }
    },
    
    updateText: function(text) {
        if (typingContainer) {
            typingContainer.innerHTML = `${text}<span class="typing-cursor"></span>`;
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLoadingAnimation);
} else {
    // DOM already loaded, start immediately
    initializeLoadingAnimation();
}

// Also check when window fully loads
window.addEventListener('load', function() {
    // If loading animation is still showing after window load,
    // force completion after a short delay
    setTimeout(() => {
        if (loadingOverlay && loadingOverlay.parentNode && !isDataReady()) {
            console.log('🔄 Window loaded but data not ready, completing loading anyway');
            completeLoading();
        }
    }, 1000);
});