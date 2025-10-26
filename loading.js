// loading.js - Loading animation with progress bar and typing effect

// Configuration
const LOADING_CONFIG = {
    // Animation elements
    progressBar: true,
    typingEffect: true,
    floatingAnimation: true,
    
    // Content
    typingTexts: [
        "စိန်သရဖူ_ဆံသ",
        "loading_image_data...",
        "please_wait...",
        "Almost ready..."
    ],
    
    // Timing
    minDisplayTime: 5000, // Minimum time to show loading (ms)
    typingSpeed: 50,      // Characters per second
    textPause: 1000,      // Pause between texts (ms)
    
    // Storage keys
    cacheKey: 'hairstyle_data_cached',
    animationShownKey: 'loading_animation_shown'
};

// DOM Elements
let loadingOverlay, progressBar, progressText, typingContainer;
let progressInterval;
let currentProgress = 0;
let actualProgress = 0;

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
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(15px);
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
        gap: 30px;
    `;
    
    // Create logo image
    const logo = document.createElement('img');
    logo.src = 'images/logo.jpg';
    logo.alt = 'Diamond Crown Barber';
    logo.style.cssText = `
        width: 100px;
        height: 100px;
        object-fit: contain;
        animation: float 3s ease-in-out infinite, goldGlow 2s ease-in-out infinite;
        border-radius: 50%;
        border: 2px solid #d4af37;
    `;
    
    // Create progress bar container
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
    `;
    
    // Create progress bar
    progressBar = document.createElement('div');
    progressBar.style.cssText = `
        width: 100%;
        height: 8px;
        background: rgba(212, 175, 55, 0.2);
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid rgba(212, 175, 55, 0.3);
    `;
    
    const progressFill = document.createElement('div');
    progressFill.id = 'progress-fill';
    progressFill.style.cssText = `
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #d4af37, #f4d03f, #d4af37);
        border-radius: 4px;
        transition: width 0.5s ease;
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
        position: relative;
        overflow: hidden;
    `;
    
    // Add shimmer effect to progress bar
    const progressShimmer = document.createElement('div');
    progressShimmer.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        animation: shimmer 2s infinite;
    `;
    
    progressFill.appendChild(progressShimmer);
    progressBar.appendChild(progressFill);
    
    // Create progress text
    progressText = document.createElement('div');
    progressText.id = 'progress-text';
    progressText.style.cssText = `
        font-size: 1.1rem;
        color: #d4af37;
        text-align: center;
        font-weight: bold;
        text-shadow: 0 0 15px rgba(212, 175, 55, 0.8);
        animation: textGlow 2s ease-in-out infinite;
    `;
    progressText.textContent = '0%';
    
    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(progressText);
    
    // Create typing container
    typingContainer = document.createElement('div');
    typingContainer.id = 'typing-container';
    typingContainer.style.cssText = `
        height: 32px;
        font-size: 1.2rem;
        color: #d4af37;
        text-align: center;
        font-weight: bold;
        text-shadow: 0 0 12px rgba(212, 175, 55, 0.7);
        letter-spacing: 0.5px;
        animation: textGrow 0.3s ease-out;
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
        
        @keyframes goldGlow {
            0% {
                box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
            }
            50% {
                box-shadow: 0 0 40px rgba(212, 175, 55, 0.8), 0 0 60px rgba(212, 175, 55, 0.4);
            }
            100% {
                box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
            }
        }
        
        @keyframes textGlow {
            0% {
                text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
            }
            50% {
                text-shadow: 0 0 20px rgba(212, 175, 55, 1), 0 0 30px rgba(212, 175, 55, 0.8);
            }
            100% {
                text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
            }
        }
        
        @keyframes textGrow {
            0% {
                transform: scale(0.8);
                opacity: 0;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @keyframes shimmer {
            0% {
                left: -100%;
            }
            100% {
                left: 100%;
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
            height: 1.3em;
            background: #d4af37;
            margin-left: 3px;
            animation: blink 0.8s infinite, goldGlow 2s infinite;
            border-radius: 1px;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
            vertical-align: middle;
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
    
    // Start real progress monitoring
    startRealProgressMonitoring();
    
    // Start typing effect
    if (LOADING_CONFIG.typingEffect) {
        startTypingEffect();
    }
    
    // Check when to hide loading
    const checkLoadingComplete = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        
        // Check if minimum display time has passed AND data is ready
        const dataReady = isDataReady();
        
        if (elapsedTime >= LOADING_CONFIG.minDisplayTime && dataReady) {
            clearInterval(checkLoadingComplete);
            if (progressInterval) {
                clearInterval(progressInterval);
            }
            completeLoading();
        }
    }, 100);
    
    // Fallback: Hide loading after 8 seconds max
    setTimeout(() => {
        clearInterval(checkLoadingComplete);
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        if (loadingOverlay && loadingOverlay.parentNode) {
            completeLoading();
        }
    }, 8000);
}

// Start real progress monitoring based on actual resource loading
function startRealProgressMonitoring() {
    if (!LOADING_CONFIG.progressBar) return;
    
    let resourcesLoaded = 0;
    let totalResources = 0;
    
    // Count total images and resources
    function countResources() {
        const images = document.querySelectorAll('img');
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        const scripts = document.querySelectorAll('script[src]');
        
        totalResources = images.length + stylesheets.length + scripts.length;
        
        // If no resources found, set a minimum
        if (totalResources === 0) {
            totalResources = 10; // Fallback minimum
        }
        
        console.log(`📊 Total resources to load: ${totalResources}`);
    }
    
    // Check resource loading progress
    function checkResourceProgress() {
        let loaded = 0;
        
        // Check images
        document.querySelectorAll('img').forEach(img => {
            if (img.complete && img.naturalHeight !== 0) {
                loaded++;
            }
        });
        
        // Check stylesheets (assume they load quickly)
        loaded += document.querySelectorAll('link[rel="stylesheet"]').length;
        
        // Check scripts (assume they load quickly)
        loaded += document.querySelectorAll('script[src]').length;
        
        resourcesLoaded = loaded;
        actualProgress = Math.min(95, Math.round((resourcesLoaded / totalResources) * 100));
        
        console.log(`📈 Progress: ${actualProgress}% (${resourcesLoaded}/${totalResources} resources)`);
        
        updateProgressBar();
        
        // If all resources are loaded and data is ready, we can complete
        if (actualProgress >= 95 && isDataReady()) {
            actualProgress = 100;
            updateProgressBar();
        }
    }
    
    // Update progress bar with smooth animation
    function updateProgressBar() {
        if (currentProgress < actualProgress) {
            currentProgress = Math.min(currentProgress + 1, actualProgress);
            
            const progressFill = document.getElementById('progress-fill');
            if (progressFill) {
                progressFill.style.width = `${currentProgress}%`;
            }
            
            if (progressText) {
                progressText.textContent = `${currentProgress}%`;
                
                // Add grow effect when progress updates
                progressText.style.animation = 'none';
                setTimeout(() => {
                    progressText.style.animation = 'textGrow 0.3s ease-out, textGlow 2s ease-in-out infinite';
                }, 10);
            }
        }
    }
    
    // Initial count
    countResources();
    
    // Start monitoring
    progressInterval = setInterval(() => {
        checkResourceProgress();
        
        // If data is ready and we're at high progress, complete
        if (isDataReady() && currentProgress >= 95) {
            actualProgress = 100;
            updateProgressBar();
            setTimeout(() => {
                if (progressInterval) {
                    clearInterval(progressInterval);
                }
            }, 1000);
        }
    }, 200);
    
    // Also check on window load
    window.addEventListener('load', () => {
        setTimeout(() => {
            countResources();
            checkResourceProgress();
        }, 100);
    });
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
        
        // Update display with grow effect
        if (typingContainer) {
            const displayText = currentText.substring(0, currentCharIndex);
            typingContainer.innerHTML = `${displayText}<span class="typing-cursor"></span>`;
            typingContainer.style.animation = 'none';
            setTimeout(() => {
                typingContainer.style.animation = 'textGrow 0.3s ease-out';
            }, 10);
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
    try {
        // Check if hairstyles data is loaded and valid
        if (typeof hairstyles === 'undefined' || !hairstyles) {
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
        
        // Check if we have valid hairstyles data
        if (!Array.isArray(hairstyles) || hairstyles.length === 0) {
            return false;
        }
        
        // Check if critical images are loaded (first few hairstyles)
        const criticalHairstyles = hairstyles.slice(0, 3);
        const allCriticalImagesLoaded = criticalHairstyles.every(hairstyle => {
            return hairstyle.images && 
                   Array.isArray(hairstyle.images) && 
                   hairstyle.images.length > 0;
        });
        
        if (!allCriticalImagesLoaded) {
            return false;
        }
        
        // Additional check: see if images are actually in DOM and loaded
        const visibleImages = document.querySelectorAll('#hairstyleGrid img');
        if (visibleImages.length > 0) {
            const loadedImages = Array.from(visibleImages).filter(img => 
                img.complete && img.naturalHeight !== 0
            ).length;
            
            // Require at least 50% of visible images to be loaded
            if (loadedImages < Math.floor(visibleImages.length * 0.5)) {
                return false;
            }
        }
        
        console.log('✅ All data ready:', {
            hairstylesCount: hairstyles.length,
            domReady: document.readyState,
            mainElements: !!mainContent && !!hairstyleGrid,
            criticalData: allCriticalImagesLoaded
        });
        
        return true;
        
    } catch (error) {
        console.error('❌ Error checking data readiness:', error);
        return false;
    }
}

// Complete loading and hide animation
function completeLoading() {
    console.log('✅ Loading complete, hiding animation');
    
    // Ensure progress shows 100%
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = '100%';
    }
    
    if (progressText) {
        progressText.textContent = '100%';
        progressText.style.animation = 'textGrow 0.5s ease-out, textGlow 2s ease-in-out infinite';
    }
    
    // Mark data as cached for future visits
    localStorage.setItem(LOADING_CONFIG.cacheKey, 'true');
    sessionStorage.setItem(LOADING_CONFIG.animationShownKey, 'true');
    
    // Final completion with delay to show 100%
    setTimeout(() => {
        // Fade out animation
        if (loadingOverlay) {
            loadingOverlay.style.animation = 'fadeOut 0.8s ease forwards';
            
            // Remove from DOM after animation
            setTimeout(() => {
                if (loadingOverlay && loadingOverlay.parentNode) {
                    loadingOverlay.parentNode.removeChild(loadingOverlay);
                    console.log('🎉 Loading animation completed successfully');
                }
            }, 800);
        }
    }, 500);
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
        actualProgress = Math.min(100, Math.max(0, percent));
        updateProgressBar();
    },
    
    updateText: function(text) {
        if (typingContainer) {
            typingContainer.innerHTML = `${text}<span class="typing-cursor"></span>`;
            typingContainer.style.animation = 'none';
            setTimeout(() => {
                typingContainer.style.animation = 'textGrow 0.3s ease-out';
            }, 10);
        }
    },
    
    // Force check data readiness
    checkDataReady: function() {
        return isDataReady();
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLoadingAnimation);
} else {
    // DOM already loaded, start immediately
    initializeLoadingAnimation();
}

// Enhanced window load event
window.addEventListener('load', function() {
    console.log('🏁 Window fully loaded, checking final readiness');
    
    // Final check after window load
    setTimeout(() => {
        if (loadingOverlay && loadingOverlay.parentNode && isDataReady()) {
            console.log('✅ Window loaded and data ready, completing loading');
            if (progressInterval) {
                clearInterval(progressInterval);
            }
            completeLoading();
        }
    }, 500);
});