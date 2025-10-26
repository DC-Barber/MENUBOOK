// loading.js - Fast loading with background image preloading

// Configuration
const LOADING_CONFIG = {
    // Animation elements
    progressBar: true,
    typingEffect: true,
    floatingAnimation: true,
    
    // Content
    typingTexts: [
        "စိန်သရဖူ_ဆံသ",
        "ဆံပင်ပုံစံများ ပြင်ဆင်နေသည်...",
        "ကျေးဇူးပြု၍ စောင့်ပေးပါ..."
    ],
    
    // Timing - No minimum time, complete when ready
    minDisplayTime: 8000,
    typingSpeed: 80,
    textPause: 600,
    
    // Storage keys
    cacheKey: 'hairstyle_data_cached',
    animationShownKey: 'loading_animation_shown',
    
    // Performance settings - More aggressive for speed
    batchSize: 15,
    parallelLoads: 8,
    lowPriorityDelay: 50
};

// DOM Elements
let loadingOverlay, progressBar, progressText, typingContainer;
let progressInterval;
let currentProgress = 0;
let actualProgress = 0;
let totalImages = 0;
let loadedImages = 0;
let criticalImagesLoaded = false;

// Initialize loading animation
function initializeLoadingAnimation() {
    // Check if we should show loading animation
    if (shouldSkipLoading()) {
        console.log('✅ Skipping loading animation - data already cached');
        return;
    }
    
    console.log('🚀 Starting fast loading animation');
    createLoadingOverlay();
    startLoadingSequence();
}

// Check if we should skip loading animation
function shouldSkipLoading() {
    const isDataCached = localStorage.getItem(LOADING_CONFIG.cacheKey) === 'true';
    const animationShown = sessionStorage.getItem(LOADING_CONFIG.animationShownKey) === 'true';
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
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(5px);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: 'HWA Myanmar', 'Pyidaungsu', 'Myanmar3', 'Noto Sans Myanmar', sans-serif;
    `;
    
    // Create loading container
    const loadingContainer = document.createElement('div');
    loadingContainer.style.cssText = `
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    `;
    
    // Create logo image
    const logo = document.createElement('img');
    logo.src = 'images/logo.jpg';
    logo.alt = 'Diamond Crown Barber';
    logo.style.cssText = `
        width: 70px;
        height: 70px;
        object-fit: contain;
        animation: float 1.5s ease-in-out infinite;
        border-radius: 50%;
        border: 2px solid #d4af37;
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
        height: 4px;
        background: rgba(212, 175, 55, 0.2);
        border-radius: 2px;
        overflow: hidden;
    `;
    
    const progressFill = document.createElement('div');
    progressFill.id = 'progress-fill';
    progressFill.style.cssText = `
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #d4af37, #f4d03f);
        border-radius: 2px;
        transition: width 0.2s ease;
    `;
    
    progressBar.appendChild(progressFill);
    
    // Create progress text
    progressText = document.createElement('div');
    progressText.id = 'progress-text';
    progressText.style.cssText = `
        font-size: 0.9rem;
        color: #d4af37;
        text-align: center;
        font-weight: bold;
    `;
    progressText.textContent = 'Loading images...';
    
    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(progressText);
    
    // Create typing container
    typingContainer = document.createElement('div');
    typingContainer.id = 'typing-container';
    typingContainer.style.cssText = `
        height: 24px;
        font-size: 1rem;
        color: #d4af37;
        text-align: center;
        font-weight: bold;
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
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
        }
        
        #loading-overlay {
            animation: fadeIn 0.2s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .typing-cursor {
            display: inline-block;
            width: 2px;
            height: 1em;
            background: #d4af37;
            margin-left: 2px;
            animation: blink 0.6s infinite;
            vertical-align: middle;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Start the loading sequence
function startLoadingSequence() {
    console.log('🚀 Starting aggressive image preloading...');
    
    // Start ultra-fast loading strategy
    startUltraFastLoading();
    
    // Start typing effect
    if (LOADING_CONFIG.typingEffect) {
        startTypingEffect();
    }
    
    // Monitor completion
    const completionCheck = setInterval(() => {
        if (isDataReady()) {
            clearInterval(completionCheck);
            if (progressInterval) {
                clearInterval(progressInterval);
            }
            completeLoading();
        }
    }, 50);
    
    // Fallback timeout - very short since we want speed
    setTimeout(() => {
        clearInterval(completionCheck);
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        if (loadingOverlay && loadingOverlay.parentNode) {
            console.log('⚡ Force completing loading for speed');
            completeLoading();
        }
    }, 3000); // Only 3 seconds max
}

// Ultra-fast loading strategy
function startUltraFastLoading() {
    if (!LOADING_CONFIG.progressBar) return;
    
    // Get all image URLs
    const allImages = getAllImageUrls();
    totalImages = allImages.length;
    
    console.log(`📦 Total images to load: ${totalImages}`);
    
    if (totalImages === 0) {
        actualProgress = 100;
        criticalImagesLoaded = true;
        return;
    }
    
    // Load ALL images in parallel with aggressive settings
    loadAllImagesAggressive(allImages);
    
    // Fast progress monitoring
    progressInterval = setInterval(() => {
        updateProgressBar();
    }, 50);
}

// Get all image URLs
function getAllImageUrls() {
    const urls = new Set();
    
    try {
        // Add logo
        urls.add('images/logo.jpg');
        
        // Add all hairstyle images
        if (typeof hairstyles !== 'undefined' && Array.isArray(hairstyles)) {
            hairstyles.forEach(hairstyle => {
                if (hairstyle.images && Array.isArray(hairstyle.images)) {
                    hairstyle.images.forEach(imgPath => {
                        if (imgPath) {
                            urls.add(imgPath);
                        }
                    });
                }
            });
        }
        
    } catch (error) {
        console.error('Error getting image URLs:', error);
    }
    
    return Array.from(urls);
}

// Load all images aggressively in parallel
function loadAllImagesAggressive(imageUrls) {
    const batchSize = LOADING_CONFIG.batchSize;
    const parallelLoads = LOADING_CONFIG.parallelLoads;
    
    // Load in large batches for maximum speed
    for (let i = 0; i < imageUrls.length; i += batchSize) {
        const batch = imageUrls.slice(i, i + batchSize);
        
        // Load each batch with maximum parallelism
        for (let j = 0; j < batch.length; j += parallelLoads) {
            const parallelBatch = batch.slice(j, j + parallelLoads);
            
            // Load all images in this parallel batch
            parallelBatch.forEach(url => {
                preloadImageFast(url).then(() => {
                    loadedImages++;
                    // Update progress immediately
                    actualProgress = Math.min(99, Math.round((loadedImages / totalImages) * 100));
                });
            });
        }
    }
}

// Ultra-fast image preloading
function preloadImageFast(src) {
    return new Promise((resolve) => {
        const img = new Image();
        
        // Very short timeout for speed
        const timeout = setTimeout(() => {
            console.log(`⚡ Fast timeout: ${src}`);
            loadedImages++; // Count timeout as loaded to keep progress moving
            resolve();
        }, 2000); // Only 2 seconds per image
        
        img.onload = () => {
            clearTimeout(timeout);
            resolve();
        };
        
        img.onerror = () => {
            clearTimeout(timeout);
            console.log(`⚠️ Fast failed: ${src}`);
            loadedImages++; // Count errors as loaded to keep progress moving
            resolve();
        };
        
        // Start loading immediately
        img.src = src;
        
        // For GitHub hosting, add cache-busting if needed
        if (src.includes('github.io') || src.includes('githubusercontent')) {
            img.src = src + '?t=' + Date.now();
        }
    });
}

// Update progress bar
function updateProgressBar() {
    if (currentProgress < actualProgress) {
        currentProgress = Math.min(currentProgress + 3, actualProgress); // Very fast progression
        
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.style.width = `${currentProgress}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${Math.round(currentProgress)}%`;
            
            // Update text based on progress
            if (currentProgress < 30) {
                progressText.textContent = 'Loading images...';
            } else if (currentProgress < 70) {
                progressText.textContent = `Loading... ${Math.round(currentProgress)}%`;
            } else {
                progressText.textContent = `Almost ready... ${Math.round(currentProgress)}%`;
            }
        }
    }
}

// Start typing effect
function startTypingEffect() {
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function type() {
        if (!typingContainer) return;
        
        const currentText = LOADING_CONFIG.typingTexts[currentTextIndex];
        
        if (isDeleting) {
            currentCharIndex--;
            if (currentCharIndex <= 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % LOADING_CONFIG.typingTexts.length;
                setTimeout(type, 300);
                return;
            }
        } else {
            currentCharIndex++;
            if (currentCharIndex > currentText.length) {
                isDeleting = true;
                setTimeout(type, LOADING_CONFIG.textPause);
                return;
            }
        }
        
        const displayText = currentText.substring(0, currentCharIndex);
        typingContainer.innerHTML = `${displayText}<span class="typing-cursor"></span>`;
        
        const typeSpeed = isDeleting ? LOADING_CONFIG.typingSpeed / 2 : LOADING_CONFIG.typingSpeed;
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Check if data is ready - Very lenient for speed
function isDataReady() {
    try {
        // Basic checks only
        if (typeof hairstyles === 'undefined') {
            return false;
        }
        
        // Consider ready when most images are loaded
        if (totalImages > 0 && loadedImages >= totalImages * 0.8) {
            return true;
        }
        
        // Or if critical progress reached
        if (currentProgress >= 85) {
            return true;
        }
        
        return false;
        
    } catch (error) {
        console.error('Error checking data readiness:', error);
        return true; // Always return true on error to keep things moving
    }
}

// Complete loading immediately
function completeLoading() {
    console.log('⚡ Loading complete - showing content immediately');
    
    // Mark as cached
    localStorage.setItem(LOADING_CONFIG.cacheKey, 'true');
    sessionStorage.setItem(LOADING_CONFIG.animationShownKey, 'true');
    
    // Hide loading immediately with fast animation
    if (loadingOverlay) {
        loadingOverlay.style.animation = 'fadeOut 0.3s ease forwards';
        
        setTimeout(() => {
            if (loadingOverlay && loadingOverlay.parentNode) {
                loadingOverlay.parentNode.removeChild(loadingOverlay);
                console.log('🎉 Fast loading completed');
            }
        }, 300);
    }
}

// Manual control functions
window.LoadingAnimation = {
    show: function() {
        if (loadingOverlay && loadingOverlay.parentNode) return;
        createLoadingOverlay();
    },
    
    hide: function() {
        completeLoading();
    },
    
    getStats: function() {
        return {
            imagesLoaded: loadedImages,
            totalImages: totalImages,
            progress: currentProgress
        };
    }
};

// Initialize immediately - don't wait for DOMContentLoaded
initializeLoadingAnimation();

// Also start on window load as backup
window.addEventListener('load', function() {
    console.log('🏁 Window loaded - final speed check');
    
    // Force complete if still loading after window load
    setTimeout(() => {
        if (loadingOverlay && loadingOverlay.parentNode) {
            console.log('⚡ Window loaded - forcing completion');
            completeLoading();
        }
    }, 500);
});