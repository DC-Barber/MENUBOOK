// loading.js - Optimized loading animation for GitHub hosting

// Configuration
const LOADING_CONFIG = {
    // Animation elements
    progressBar: true,
    typingEffect: true,
    floatingAnimation: true,
    
    // Content
    typingTexts: [
        "စိန်သရဖူ_ဆံသ",
        "ဆံပင်ပုံစံများ ဖွင့်နေသည်...",
        "ကျေးဇူးပြု၍ စောင့်ပေးပါ...",
        "Almost ready..."
    ],
    
    // Timing
    minDisplayTime: 3000, // Reduced minimum time
    typingSpeed: 60,      // Faster typing
    textPause: 800,       // Shorter pause
    
    // Storage keys
    cacheKey: 'hairstyle_data_cached',
    animationShownKey: 'loading_animation_shown',
    
    // Performance settings
    batchSize: 10,        // Load images in batches
    parallelLoads: 5,     // Number of parallel image loads
    lowPriorityDelay: 100 // Delay for low priority images
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
    
    console.log('🔄 Starting optimized loading animation');
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

// Create loading overlay (same as before, but with performance messaging)
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
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
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
        gap: 25px;
    `;
    
    // Create logo image
    const logo = document.createElement('img');
    logo.src = 'images/logo.jpg';
    logo.alt = 'Diamond Crown Barber';
    logo.style.cssText = `
        width: 80px;
        height: 80px;
        object-fit: contain;
        animation: float 2s ease-in-out infinite, goldGlow 1.5s ease-in-out infinite;
        border-radius: 50%;
        border: 2px solid #d4af37;
    `;
    
    // Create progress bar container
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
        width: 280px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    `;
    
    // Create progress bar
    progressBar = document.createElement('div');
    progressBar.style.cssText = `
        width: 100%;
        height: 6px;
        background: rgba(212, 175, 55, 0.2);
        border-radius: 3px;
        overflow: hidden;
        border: 1px solid rgba(212, 175, 55, 0.3);
    `;
    
    const progressFill = document.createElement('div');
    progressFill.id = 'progress-fill';
    progressFill.style.cssText = `
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #d4af37, #f4d03f, #d4af37);
        border-radius: 3px;
        transition: width 0.3s ease;
        box-shadow: 0 0 15px rgba(212, 175, 55, 0.6);
        position: relative;
        overflow: hidden;
    `;
    
    // Add shimmer effect
    const progressShimmer = document.createElement('div');
    progressShimmer.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        animation: shimmer 1.5s infinite;
    `;
    
    progressFill.appendChild(progressShimmer);
    progressBar.appendChild(progressFill);
    
    // Create progress text
    progressText = document.createElement('div');
    progressText.id = 'progress-text';
    progressText.style.cssText = `
        font-size: 1rem;
        color: #d4af37;
        text-align: center;
        font-weight: bold;
        text-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
    `;
    progressText.textContent = 'Preparing...';
    
    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(progressText);
    
    // Create typing container
    typingContainer = document.createElement('div');
    typingContainer.id = 'typing-container';
    typingContainer.style.cssText = `
        height: 28px;
        font-size: 1.1rem;
        color: #d4af37;
        text-align: center;
        font-weight: bold;
        text-shadow: 0 0 8px rgba(212, 175, 55, 0.7);
        letter-spacing: 0.5px;
    `;
    
    // Create performance note
    const performanceNote = document.createElement('div');
    performanceNote.style.cssText = `
        font-size: 0.8rem;
        color: #888;
        text-align: center;
        margin-top: 10px;
        font-style: italic;
    `;
    performanceNote.textContent = '188 images (8MB) loading...';
    
    // Assemble the loading screen
    loadingContainer.appendChild(logo);
    
    if (LOADING_CONFIG.progressBar) {
        loadingContainer.appendChild(progressContainer);
    }
    
    if (LOADING_CONFIG.typingEffect) {
        loadingContainer.appendChild(typingContainer);
    }
    
    loadingContainer.appendChild(performanceNote);
    loadingOverlay.appendChild(loadingContainer);
    document.body.appendChild(loadingOverlay);
    
    // Add floating animation styles
    if (LOADING_CONFIG.floatingAnimation) {
        addFloatingAnimationStyles();
    }
}

// Add CSS for floating animation (optimized)
function addFloatingAnimationStyles() {
    const style = document.createElement('style');
    style.id = 'loading-animation-styles';
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes goldGlow {
            0%, 100% { box-shadow: 0 0 15px rgba(212, 175, 55, 0.5); }
            50% { box-shadow: 0 0 25px rgba(212, 175, 55, 0.8); }
        }
        
        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        #loading-overlay {
            animation: fadeIn 0.3s ease;
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
            width: 3px;
            height: 1.2em;
            background: #d4af37;
            margin-left: 2px;
            animation: blink 0.7s infinite;
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
    const startTime = Date.now();
    
    // Start progressive loading strategy
    startProgressiveLoading();
    
    // Start typing effect
    if (LOADING_CONFIG.typingEffect) {
        startTypingEffect();
    }
    
    // Update progress text
    if (progressText) {
        progressText.textContent = 'Loading critical images...';
    }
    
    // Check when to hide loading
    const checkLoadingComplete = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        
        // More lenient completion criteria for GitHub hosting
        const canComplete = elapsedTime >= LOADING_CONFIG.minDisplayTime && 
                           (criticalImagesLoaded || isDataReady());
        
        if (canComplete) {
            clearInterval(checkLoadingComplete);
            if (progressInterval) {
                clearInterval(progressInterval);
            }
            completeLoading();
        }
    }, 100);
    
    // More generous fallback timeout
    setTimeout(() => {
        clearInterval(checkLoadingComplete);
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        if (loadingOverlay && loadingOverlay.parentNode) {
            console.log('⏰ GitHub hosting timeout - completing anyway');
            completeLoading();
        }
    }, 10000); // 10 seconds max for GitHub
}

// Progressive loading strategy for GitHub
function startProgressiveLoading() {
    if (!LOADING_CONFIG.progressBar) return;
    
    console.log('🚀 Starting progressive loading for GitHub...');
    
    // Get all image URLs with priorities
    const { criticalImages, normalImages } = categorizeImagesByPriority();
    totalImages = criticalImages.length + normalImages.length;
    
    console.log(`📊 Images: ${criticalImages.length} critical + ${normalImages.length} normal = ${totalImages} total`);
    
    if (totalImages === 0) {
        actualProgress = 100;
        criticalImagesLoaded = true;
        return;
    }
    
    // Phase 1: Load critical images first
    loadImageBatch(criticalImages, 0, 70, 'critical').then(() => {
        console.log('✅ Critical images loaded');
        criticalImagesLoaded = true;
        
        // Update progress text
        if (progressText) {
            progressText.textContent = 'Loading remaining images...';
        }
        
        // Phase 2: Load normal images in background
        if (normalImages.length > 0) {
            loadImageBatch(normalImages, 70, 30, 'normal');
        } else {
            actualProgress = 100;
        }
    });
    
    // Progress monitoring
    progressInterval = setInterval(() => {
        updateProgressBar();
        
        // Auto-complete if critical images are loaded and minimum time passed
        if (criticalImagesLoaded && currentProgress >= 85) {
            actualProgress = 100;
            updateProgressBar();
        }
    }, 150);
}

// Categorize images by priority
function categorizeImagesByPriority() {
    const criticalImages = [];
    const normalImages = [];
    
    try {
        // Critical: Logo and first few hairstyle images
        criticalImages.push('images/logo.jpg');
        
        // Critical: First 10 hairstyle images for initial display
        if (typeof hairstyles !== 'undefined' && Array.isArray(hairstyles)) {
            const firstHairstyles = hairstyles.slice(0, 10);
            firstHairstyles.forEach(hairstyle => {
                if (hairstyle.images && Array.isArray(hairstyle.images)) {
                    // Take first image from each of first 10 hairstyles
                    if (hairstyle.images[0]) {
                        criticalImages.push(hairstyle.images[0]);
                    }
                }
            });
        }
        
        // Normal: All other images
        if (typeof hairstyles !== 'undefined' && Array.isArray(hairstyles)) {
            hairstyles.forEach((hairstyle, index) => {
                if (hairstyle.images && Array.isArray(hairstyle.images)) {
                    hairstyle.images.forEach((imgPath, imgIndex) => {
                        // Skip first image of first 10 hairstyles (already in critical)
                        if (!(index < 10 && imgIndex === 0)) {
                            normalImages.push(imgPath);
                        }
                    });
                }
                
                // Add gifs to normal priority
                if (hairstyle.gif) {
                    normalImages.push(hairstyle.gif);
                }
            });
        }
        
    } catch (error) {
        console.error('Error categorizing images:', error);
    }
    
    return { criticalImages, normalImages };
}

// Load images in batches with progress tracking
async function loadImageBatch(imageUrls, startProgress, progressRange, priority) {
    const batchSize = LOADING_CONFIG.batchSize;
    const parallelLoads = LOADING_CONFIG.parallelLoads;
    
    for (let i = 0; i < imageUrls.length; i += batchSize) {
        const batch = imageUrls.slice(i, i + batchSize);
        const batchProgress = (i / imageUrls.length) * progressRange;
        
        // Load batch in parallel
        const promises = [];
        for (let j = 0; j < batch.length; j += parallelLoads) {
            const parallelBatch = batch.slice(j, j + parallelLoads);
            
            const batchPromises = parallelBatch.map(url => 
                preloadImage(url).then(() => {
                    loadedImages++;
                    // Update progress based on batch completion
                    const currentBatchProgress = ((i + j) / imageUrls.length) * progressRange;
                    actualProgress = Math.min(95, startProgress + currentBatchProgress);
                })
            );
            
            promises.push(...batchPromises);
            
            // Small delay between parallel batches to avoid overwhelming GitHub
            if (priority === 'normal') {
                await new Promise(resolve => setTimeout(resolve, LOADING_CONFIG.lowPriorityDelay));
            }
        }
        
        await Promise.allSettled(promises);
        
        console.log(`✅ ${priority} batch ${Math.floor(i/batchSize) + 1} loaded: ${loadedImages}/${totalImages}`);
    }
    
    // Mark this phase as complete
    actualProgress = startProgress + progressRange;
}

// Optimized image preloading
function preloadImage(src) {
    return new Promise((resolve) => {
        const img = new Image();
        
        // Set timeout for GitHub hosting (8 seconds max per image)
        const timeout = setTimeout(() => {
            console.log(`⏰ Timeout: ${src}`);
            resolve();
        }, 8000);
        
        img.onload = () => {
            clearTimeout(timeout);
            resolve();
        };
        
        img.onerror = () => {
            clearTimeout(timeout);
            console.log(`⚠️ Failed: ${src}`);
            resolve(); // Continue even if some images fail
        };
        
        // Start loading
        img.src = src;
    });
}

// Update progress bar
function updateProgressBar() {
    if (currentProgress < actualProgress) {
        currentProgress = Math.min(currentProgress + 2, actualProgress); // Faster progression
        
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.style.width = `${currentProgress}%`;
        }
        
        if (progressText && currentProgress > 0) {
            progressText.textContent = `${Math.round(currentProgress)}%`;
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
                setTimeout(type, 500);
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

// Check if data is ready (optimized for GitHub)
function isDataReady() {
    try {
        // Basic checks
        if (typeof hairstyles === 'undefined' || !Array.isArray(hairstyles)) {
            return false;
        }
        
        // Don't require all images to be loaded for GitHub
        // Just require critical images and basic DOM
        if (!criticalImagesLoaded) {
            return false;
        }
        
        // Basic DOM check
        if (document.readyState !== 'complete') {
            return false;
        }
        
        console.log('✅ Data ready for GitHub hosting');
        return true;
        
    } catch (error) {
        console.error('Error checking data readiness:', error);
        return false;
    }
}

// Complete loading
function completeLoading() {
    console.log('✅ GitHub loading complete');
    
    // Final progress update
    actualProgress = 100;
    currentProgress = 100;
    
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = '100%';
    }
    
    if (progressText) {
        progressText.textContent = '100% - Ready!';
    }
    
    if (typingContainer) {
        typingContainer.innerHTML = 'Welcome!<span class="typing-cursor"></span>';
    }
    
    // Cache for future visits
    localStorage.setItem(LOADING_CONFIG.cacheKey, 'true');
    sessionStorage.setItem(LOADING_CONFIG.animationShownKey, 'true');
    
    // Faster completion for GitHub
    setTimeout(() => {
        if (loadingOverlay) {
            loadingOverlay.style.animation = 'fadeOut 0.5s ease forwards';
            
            setTimeout(() => {
                if (loadingOverlay && loadingOverlay.parentNode) {
                    loadingOverlay.parentNode.removeChild(loadingOverlay);
                    console.log('🎉 Optimized loading completed');
                }
            }, 500);
        }
    }, 800);
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
            progress: currentProgress,
            criticalLoaded: criticalImagesLoaded
        };
    }
};

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLoadingAnimation);
} else {
    initializeLoadingAnimation();
}

// GitHub-optimized window load
window.addEventListener('load', function() {
    console.log('🏁 GitHub: Window loaded');
    
    setTimeout(() => {
        if (loadingOverlay && loadingOverlay.parentNode && criticalImagesLoaded) {
            console.log('✅ GitHub: Critical content ready');
            if (progressInterval) {
                clearInterval(progressInterval);
            }
            completeLoading();
        }
    }, 300);
});