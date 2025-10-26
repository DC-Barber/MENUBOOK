// loading.js - Smart loading with fixed display time and background preloading

// Configuration
const LOADING_CONFIG = {
    // Animation elements
    progressBar: true,
    typingEffect: true,
    floatingAnimation: true,
    
    // Content
    typingTexts: [
        "စိန်သရဖူ_ဆံသ",
        "ဆံပင်ပုံစံများ ြပင်ဆင်‌ေ နသည်...",
        "please_wait...",
        "Almost ready..."
    ],
    
    // Timing - Fixed display time 10-15 seconds
    minDisplayTime: 10000, // 10 seconds minimum
    maxDisplayTime: 15000, // 15 seconds maximum
    typingSpeed: 60,
    textPause: 800,
    
    // Storage keys
    cacheKey: 'hairstyle_data_cached',
    animationShownKey: 'loading_animation_shown',
    
    // Performance settings - Maximum speed for background loading
    batchSize: 20,
    parallelLoads: 10,
    lowPriorityDelay: 30
};

// DOM Elements
let loadingOverlay, progressBar, progressText, typingContainer;
let progressInterval;
let currentProgress = 0;
let actualProgress = 0;
let totalImages = 0;
let loadedImages = 0;
let startTime = 0;
let allImagesPreloaded = false;

// Initialize loading animation
function initializeLoadingAnimation() {
    // Check if we should show loading animation
    if (shouldSkipLoading()) {
        console.log('✅ Skipping loading animation - data already cached');
        return;
    }
    
    console.log('🚀 Starting smart loading animation (10-15s display)');
    startTime = Date.now();
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
        backdrop-filter: blur(8px);
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
        animation: float 2s ease-in-out infinite;
        border-radius: 50%;
        border: 2px solid #d4af37;
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
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
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        animation: shimmer 2s infinite;
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
    progressText.textContent = 'ဆံပင်ပုံစံများ ဖွင့်နေသည်...';
    
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
    
    // Create image counter
    const imageCounter = document.createElement('div');
    imageCounter.id = 'image-counter';
    imageCounter.style.cssText = `
        font-size: 0.8rem;
        color: #888;
        text-align: center;
        margin-top: 5px;
    `;
    imageCounter.textContent = '188 images loading in background...';
    
    // Assemble the loading screen
    loadingContainer.appendChild(logo);
    
    if (LOADING_CONFIG.progressBar) {
        loadingContainer.appendChild(progressContainer);
    }
    
    if (LOADING_CONFIG.typingEffect) {
        loadingContainer.appendChild(typingContainer);
    }
    
    loadingContainer.appendChild(imageCounter);
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
            50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        @keyframes goldGlow {
            0%, 100% { box-shadow: 0 0 15px rgba(212, 175, 55, 0.5); }
            50% { box-shadow: 0 0 25px rgba(212, 175, 55, 0.8); }
        }
        
        #loading-overlay {
            animation: fadeIn 0.5s ease;
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
    console.log('🚀 Starting background image preloading...');
    
    // Start ultra-fast background loading IMMEDIATELY
    startBackgroundPreloading();
    
    // Start typing effect
    if (LOADING_CONFIG.typingEffect) {
        startTypingEffect();
    }
    
    // Start progress simulation (for visual feedback during fixed display time)
    startProgressSimulation();
    
    // Monitor completion with fixed timing
    const completionCheck = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        
        // Check if we should complete based on time AND data readiness
        const shouldComplete = (elapsedTime >= LOADING_CONFIG.minDisplayTime && allImagesPreloaded) || 
                              (elapsedTime >= LOADING_CONFIG.maxDisplayTime);
        
        if (shouldComplete) {
            clearInterval(completionCheck);
            if (progressInterval) {
                clearInterval(progressInterval);
            }
            console.log(`✅ Completed after ${elapsedTime}ms`);
            completeLoading();
        }
    }, 100);
}

// Start ultra-fast background preloading
function startBackgroundPreloading() {
    // Get all image URLs
    const allImages = getAllImageUrls();
    totalImages = allImages.length;
    
    console.log(`📦 Preloading ${totalImages} images in background...`);
    
    if (totalImages === 0) {
        allImagesPreloaded = true;
        return;
    }
    
    // Start aggressive background loading
    loadAllImagesAggressive(allImages);
    
    // Update image counter
    const imageCounter = document.getElementById('image-counter');
    if (imageCounter) {
        imageCounter.textContent = `Preloading ${totalImages} images...`;
    }
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

// Load all images aggressively in background
function loadAllImagesAggressive(imageUrls) {
    const batchSize = LOADING_CONFIG.batchSize;
    const parallelLoads = LOADING_CONFIG.parallelLoads;
    
    let completedBatches = 0;
    const totalBatches = Math.ceil(imageUrls.length / batchSize);
    
    // Load in large batches for maximum speed
    for (let i = 0; i < imageUrls.length; i += batchSize) {
        const batch = imageUrls.slice(i, i + batchSize);
        
        // Load each batch with maximum parallelism
        for (let j = 0; j < batch.length; j += parallelLoads) {
            const parallelBatch = batch.slice(j, j + parallelLoads);
            
            // Load all images in this parallel batch
            const batchPromises = parallelBatch.map(url => 
                preloadImageUltraFast(url).then(() => {
                    loadedImages++;
                    
                    // Update actual progress for real loading
                    actualProgress = Math.min(99, Math.round((loadedImages / totalImages) * 100));
                    
                    // Update image counter
                    const imageCounter = document.getElementById('image-counter');
                    if (imageCounter) {
                        imageCounter.textContent = `${loadedImages}/${totalImages} images loaded...`;
                    }
                    
                    // Check if all images are loaded
                    if (loadedImages >= totalImages) {
                        allImagesPreloaded = true;
                        console.log('✅ All images preloaded in background!');
                    }
                })
            );
            
            // Don't wait for batches - fire and forget for maximum speed
            Promise.allSettled(batchPromises).then(() => {
                completedBatches++;
                console.log(`✅ Batch ${completedBatches}/${totalBatches} completed`);
            });
        }
    }
}

// Ultra-fast image preloading with no delays
function preloadImageUltraFast(src) {
    return new Promise((resolve) => {
        const img = new Image();
        
        // Very short timeout for maximum speed
        const timeout = setTimeout(() => {
            console.log(`⚡ Fast load: ${src}`);
            resolve();
        }, 3000); // 3 seconds max per image
        
        img.onload = () => {
            clearTimeout(timeout);
            resolve();
        };
        
        img.onerror = () => {
            clearTimeout(timeout);
            console.log(`⚠️ Failed: ${src}`);
            resolve(); // Continue even if some fail
        };
        
        // Start loading immediately with cache busting for GitHub
        if (src.includes('github.io') || src.includes('githubusercontent')) {
            img.src = src + '?t=' + Date.now();
        } else {
            img.src = src;
        }
    });
}

// Progress simulation for visual feedback during fixed display time
function startProgressSimulation() {
    let simulatedProgress = 0;
    
    progressInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const timeProgress = Math.min(95, (elapsedTime / LOADING_CONFIG.maxDisplayTime) * 100);
        
        // Combine real progress with time-based progress for smooth visual
        const targetProgress = Math.max(actualProgress, timeProgress, simulatedProgress);
        
        if (currentProgress < targetProgress) {
            currentProgress = Math.min(currentProgress + 1.5, targetProgress);
            
            const progressFill = document.getElementById('progress-fill');
            if (progressFill) {
                progressFill.style.width = `${currentProgress}%`;
            }
            
            if (progressText) {
                progressText.textContent = `${Math.round(currentProgress)}%`;
                
                // Update status text based on progress
                if (currentProgress < 40) {
                    progressText.textContent = 'ဆံပင်ပုံစံများ ဖွင့်နေသည်...';
                } else if (currentProgress < 70) {
                    progressText.textContent = `ဆက်လက်ဖွင့်နေဆဲ... ${Math.round(currentProgress)}%`;
                } else if (currentProgress < 90) {
                    progressText.textContent = `မကြာမီပြီးဆုံးမည်... ${Math.round(currentProgress)}%`;
                } else {
                    progressText.textContent = `ပြီးဆုံးခါနီး... ${Math.round(currentProgress)}%`;
                }
            }
        }
        
        // Gradually increase simulated progress to ensure we reach 100%
        if (simulatedProgress < 95 && elapsedTime > LOADING_CONFIG.minDisplayTime * 0.7) {
            simulatedProgress += 0.3;
        }
        
    }, 100);
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

// Complete loading
function completeLoading() {
    console.log('🎉 Loading complete with background preloading');
    
    // Final progress update to 100%
    currentProgress = 100;
    actualProgress = 100;
    
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        progressFill.style.width = '100%';
    }
    
    if (progressText) {
        progressText.textContent = '100% - Ready!';
    }
    
    if (typingContainer) {
        typingContainer.innerHTML = 'Welcome to Diamond Crown!<span class="typing-cursor"></span>';
    }
    
    // Mark as cached for future visits
    localStorage.setItem(LOADING_CONFIG.cacheKey, 'true');
    sessionStorage.setItem(LOADING_CONFIG.animationShownKey, 'true');
    
    // Show completion for a moment before hiding
    setTimeout(() => {
        if (loadingOverlay) {
            loadingOverlay.style.animation = 'fadeOut 0.8s ease forwards';
            
            setTimeout(() => {
                if (loadingOverlay && loadingOverlay.parentNode) {
                    loadingOverlay.parentNode.removeChild(loadingOverlay);
                    console.log('✨ Loading animation hidden, website ready with preloaded images');
                }
            }, 800);
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
            allPreloaded: allImagesPreloaded,
            displayTime: Date.now() - startTime
        };
    }
};

// Initialize immediately
initializeLoadingAnimation();

// Backup completion on window load
window.addEventListener('load', function() {
    console.log('🏁 Window fully loaded - background preloading continues');
    
    // Ensure completion by max time even if images aren't all loaded
    setTimeout(() => {
        if (loadingOverlay && loadingOverlay.parentNode && !allImagesPreloaded) {
            console.log('⏰ Max time reached - completing with available images');
            allImagesPreloaded = true; // Force completion
        }
    }, LOADING_CONFIG.maxDisplayTime + 1000);
});