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
let totalImages = 0;
let loadedImages = 0;
let imagePromises = [];

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
    
    // Fallback: Hide loading after 15 seconds max
    setTimeout(() => {
        clearInterval(checkLoadingComplete);
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        if (loadingOverlay && loadingOverlay.parentNode) {
            console.log('⏰ Fallback: Maximum loading time reached');
            completeLoading();
        }
    }, 15000);
}

// Preload single image with promise
function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            loadedImages++;
            console.log(`✅ Loaded: ${src}`);
            resolve(src);
        };
        img.onerror = () => {
            console.log(`❌ Failed to load: ${src}`);
            resolve(src); // Still resolve to continue progress
        };
        img.src = src;
    });
}

// Get all image URLs from hairstyles data
function getAllImageUrls() {
    const urls = new Set();
    
    try {
        // Add logo
        urls.add('images/logo.jpg');
        
        // Add images from hairstyles data
        if (typeof hairstyles !== 'undefined' && Array.isArray(hairstyles)) {
            hairstyles.forEach(hairstyle => {
                if (hairstyle.images && Array.isArray(hairstyle.images)) {
                    hairstyle.images.forEach(imgPath => {
                        if (imgPath) {
                            urls.add(imgPath);
                        }
                    });
                }
                
                // Add gif if exists
                if (hairstyle.gif) {
                    urls.add(hairstyle.gif);
                }
            });
        }
        
        // Add images from DOM
        document.querySelectorAll('img').forEach(img => {
            if (img.src && !img.src.startsWith('data:')) {
                urls.add(img.src);
            }
        });
        
    } catch (error) {
        console.error('Error getting image URLs:', error);
    }
    
    return Array.from(urls);
}

// Start real progress monitoring based on actual image loading
function startRealProgressMonitoring() {
    if (!LOADING_CONFIG.progressBar) return;
    
    console.log('🔄 Starting real image preloading...');
    
    // Get all image URLs to preload
    const imageUrls = getAllImageUrls();
    totalImages = imageUrls.length;
    
    if (totalImages === 0) {
        console.log('ℹ️ No images found to preload');
        actualProgress = 100;
        return;
    }
    
    console.log(`📊 Total images to preload: ${totalImages}`);
    console.log('Image URLs:', imageUrls);
    
    // Preload all images
    imagePromises = imageUrls.map(url => preloadImage(url));
    
    // Monitor progress
    progressInterval = setInterval(() => {
        const progress = totalImages > 0 ? Math.min(95, Math.round((loadedImages / totalImages) * 100)) : 95;
        actualProgress = progress;
        
        console.log(`📈 Image loading progress: ${loadedImages}/${totalImages} (${actualProgress}%)`);
        
        updateProgressBar();
        
        // Check if all images are loaded
        if (loadedImages >= totalImages) {
            actualProgress = 100;
            updateProgressBar();
            console.log('✅ All images loaded successfully!');
            clearInterval(progressInterval);
        }
    }, 100);
    
    // Also wait for all promises to resolve
    Promise.allSettled(imagePromises).then(results => {
        const successful = results.filter(result => result.status === 'fulfilled').length;
        const failed = results.filter(result => result.status === 'rejected').length;
        
        console.log(`🎯 Image preloading completed: ${successful} successful, ${failed} failed`);
        
        // Even if some failed, we consider it complete for UX
        actualProgress = 100;
        updateProgressBar();
        
        if (progressInterval) {
            clearInterval(progressInterval);
        }
    });
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
        
        // Update typing text based on progress
        if (typingContainer && currentProgress >= 100) {
            typingContainer.innerHTML = `Ready!<span class="typing-cursor"></span>`;
        }
    }
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
            console.log('❌ hairstyles data not ready');
            return false;
        }
        
        // Check if DOM is ready
        if (document.readyState !== 'complete') {
            console.log('❌ DOM not ready');
            return false;
        }
        
        // Check if main content elements exist
        const mainContent = document.getElementById('mainContent');
        const hairstyleGrid = document.getElementById('hairstyleGrid');
        
        if (!mainContent || !hairstyleGrid) {
            console.log('❌ Main content elements not found');
            return false;
        }
        
        // Check if we have valid hairstyles data
        if (!Array.isArray(hairstyles) || hairstyles.length === 0) {
            console.log('❌ No hairstyles data');
            return false;
        }
        
        // Check if all images are loaded (both from preloading and DOM)
        if (loadedImages < totalImages) {
            console.log(`❌ Images still loading: ${loadedImages}/${totalImages}`);
            return false;
        }
        
        console.log('✅ All data ready:', {
            hairstylesCount: hairstyles.length,
            imagesLoaded: `${loadedImages}/${totalImages}`,
            domReady: document.readyState,
            mainElements: !!mainContent && !!hairstyleGrid
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
    
    if (typingContainer) {
        typingContainer.innerHTML = 'Ready!<span class="typing-cursor"></span>';
    }
    
    // Mark data as cached for future visits
    localStorage.setItem(LOADING_CONFIG.cacheKey, 'true');
    sessionStorage.setItem(LOADING_CONFIG.animationShownKey, 'true');
    
    // Cache all loaded images in localStorage for future visits
    cacheImagesInLocalStorage();
    
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
    }, 1000);
}

// Cache images in localStorage for faster loading next time
function cacheImagesInLocalStorage() {
    try {
        console.log('💾 Caching images in localStorage...');
        
        // Get all loaded images
        const images = document.querySelectorAll('img');
        let cachedCount = 0;
        
        images.forEach((img, index) => {
            if (img.src && !img.src.startsWith('data:') && img.complete) {
                try {
                    // Create canvas to convert image to base64
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    ctx.drawImage(img, 0, 0);
                    
                    const base64 = canvas.toDataURL('image/jpeg', 0.8);
                    const cacheKey = `cached_image_${index}_${img.src.split('/').pop()}`;
                    
                    // Store in localStorage (be mindful of size limits)
                    if (base64.length < 500000) { // ~500KB limit per image
                        localStorage.setItem(cacheKey, base64);
                        cachedCount++;
                    }
                } catch (error) {
                    console.log(`⚠️ Could not cache image: ${img.src}`);
                }
            }
        });
        
        console.log(`✅ Cached ${cachedCount} images in localStorage`);
        
    } catch (error) {
        console.error('Error caching images:', error);
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
    },
    
    // Get loading statistics
    getStats: function() {
        return {
            imagesLoaded: loadedImages,
            totalImages: totalImages,
            progress: currentProgress,
            dataReady: isDataReady()
        };
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