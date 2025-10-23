// js/redirect.js - Auto Redirect to Gemini Nano Banana App/Web after Prompt Copy (FIXED VERSION)

// Gemini Nano Banana URLs
const GEMINI_NANO_BANANA_URLS = {
    web: 'https://gemini.google.com/app',
    mobile: 'https://gemini.google.com/app'
};

// Check if device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Redirect to Gemini Nano Banana - FIXED VERSION
function redirectToGeminiNanoBanana() {
    const url = isMobileDevice() ? GEMINI_NANO_BANANA_URLS.mobile : GEMINI_NANO_BANANA_URLS.web;
    
    console.log('🚀 Redirecting to Gemini Nano Banana:', url);
    
    // Show redirect notification
    if (window.showPromptAlert) {
        window.showPromptAlert('info', '🔄 Gemini Nano Banana သို့ ချက်ချင်းသွားမည်...');
    } else {
        // Fallback alert
        alert('🔄 Gemini Nano Banana သို့ ချက်ချင်းသွားမည်...');
    }
    
    // Use multiple redirect methods for better compatibility
    setTimeout(() => {
        console.log('📍 Attempting redirect to:', url);
        
        // Method 1: Standard redirect
        try {
            window.location.href = url;
        } catch (error) {
            console.error('❌ Standard redirect failed:', error);
            
            // Method 2: Replace location
            try {
                window.location.replace(url);
            } catch (error2) {
                console.error('❌ Replace redirect failed:', error2);
                
                // Method 3: Assign location
                try {
                    window.location.assign(url);
                } catch (error3) {
                    console.error('❌ Assign redirect failed:', error3);
                    
                    // Method 4: Create link and click
                    const link = document.createElement('a');
                    link.href = url;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        }
    }, 1000); // Reduced to 1 second
}

// Enhanced integration with existing prompt system
function integrateRedirectWithPrompt() {
    console.log('🔗 Integrating redirect with prompt system...');
    
    // Store original function
    const originalCopyPromptWithTracking = window.copyPromptWithTracking;
    
    if (originalCopyPromptWithTracking) {
        // Replace the global function
        window.copyPromptWithTracking = async function(hairstyleId, hairstyleName) {
            const copyButton = document.getElementById('generatePromptBtn');
            if (!copyButton) return;

            try {
                // Set button to loading state
                copyButton.disabled = true;
                copyButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating_prompt';
                copyButton.style.background = '#94a3b8';
                
                // Generate prompt
                const prompt = window.PromptSystem ? 
                    window.PromptSystem.generatePrompt(hairstyleId) : 
                    window.generatePrompt(hairstyleId);
                
                if (!prompt) {
                    throw new Error('Failed to generate prompt');
                }

                // Copy to clipboard
                let success = false;
                if (window.PromptSystem && window.PromptSystem.copyToClipboard) {
                    success = await window.PromptSystem.copyToClipboard(prompt);
                } else if (window.copyToClipboard) {
                    success = await window.copyToClipboard(prompt);
                } else {
                    // Fallback copy method
                    const textArea = document.createElement('textarea');
                    textArea.value = prompt;
                    textArea.style.position = 'fixed';
                    textArea.style.opacity = '0';
                    document.body.appendChild(textArea);
                    textArea.select();
                    success = document.execCommand('copy');
                    document.body.removeChild(textArea);
                }
                
                if (success) {
                    // Track the copy
                    if (window.trackPromptCopy) {
                        await window.trackPromptCopy(hairstyleId, hairstyleName);
                    }
                    
                    // Update button to success state
                    copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    copyButton.style.background = '#10b981';
                    
                    // Show success message
                    const countKey = `hairstyle_${hairstyleId}`;
                    const promptCopyCounts = JSON.parse(localStorage.getItem('promptCopyCounts')) || {};
                    const copyCount = promptCopyCounts[countKey] || 1;
                    
                    if (window.showPromptAlert) {
                        window.showPromptAlert('success', `✅ Prompt copied! Gemini Nano Banana သို့ သွားမည်...`);
                    } else {
                        console.log('✅ Prompt copied! Redirecting to Gemini Nano Banana...');
                    }
                    
                    // Auto redirect after copy - IMMEDIATE
                    setTimeout(() => {
                        redirectToGeminiNanoBanana();
                    }, 500); // Reduced to 0.5 seconds
                    
                    // Reset button after 2 seconds
                    setTimeout(() => {
                        copyButton.disabled = false;
                        copyButton.innerHTML = '<i class="fas fa-copy"></i> Prompt Copy';
                        copyButton.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    }, 2000);
                    
                } else {
                    throw new Error('Clipboard copy failed');
                }
                
            } catch (error) {
                console.error('Copy process error:', error);
                
                // Update button to error state
                copyButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed';
                copyButton.style.background = '#ef4444';
                
                if (window.showPromptAlert) {
                    window.showPromptAlert('error', '❌ Failed to copy prompt. Please try again.');
                }
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    copyButton.disabled = false;
                    copyButton.innerHTML = '<i class="fas fa-copy"></i> Prompt Copy';
                    copyButton.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                }, 3000);
            }
        };
        
        console.log('✅ Successfully integrated redirect with prompt system');
    } else {
        console.error('❌ Original copyPromptWithTracking function not found');
        
        // Alternative integration method
        setTimeout(() => {
            monitorPromptButtonClicks();
        }, 1000);
    }
}

// Monitor prompt button clicks directly as fallback
function monitorPromptButtonClicks() {
    console.log('👀 Monitoring prompt button clicks...');
    
    let monitoringInterval = setInterval(() => {
        const promptButton = document.getElementById('generatePromptBtn');
        
        if (promptButton && !promptButton.hasAttribute('data-redirect-monitored')) {
            console.log('🎯 Found prompt button, adding redirect functionality...');
            
            promptButton.setAttribute('data-redirect-monitored', 'true');
            
            const originalOnClick = promptButton.onclick;
            
            promptButton.addEventListener('click', async function(e) {
                if (window.currentHairstyle) {
                    // Wait a bit for copy to complete then redirect
                    setTimeout(() => {
                        redirectToGeminiNanoBanana();
                    }, 1500);
                }
            });
            
            // Stop monitoring once set up
            clearInterval(monitoringInterval);
        }
    }, 500);
}

// Test redirect function
function testRedirect() {
    console.log('🧪 Testing redirect function...');
    redirectToGeminiNanoBanana();
}

// Initialize redirect system
function initializeRedirectSystem() {
    console.log('🚀 Initializing auto redirect system for Gemini Nano Banana');
    
    // Add test button for debugging (remove in production)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const testBtn = document.createElement('button');
        testBtn.innerHTML = '🧪 Test Redirect';
        testBtn.style.position = 'fixed';
        testBtn.style.bottom = '200px';
        testBtn.style.right = '20px';
        testBtn.style.zIndex = '10000';
        testBtn.style.padding = '10px';
        testBtn.style.background = '#ff6b6b';
        testBtn.style.color = 'white';
        testBtn.style.border = 'none';
        testBtn.style.borderRadius = '5px';
        testBtn.style.cursor = 'pointer';
        testBtn.onclick = testRedirect;
        document.body.appendChild(testBtn);
    }
    
    // Wait for prompt system to be available
    if (window.PromptSystem || window.copyPromptWithTracking) {
        setTimeout(() => {
            integrateRedirectWithPrompt();
        }, 1000);
    } else {
        // Start monitoring if prompt system not available
        console.log('⏳ Prompt system not ready, starting monitoring...');
        setTimeout(() => {
            integrateRedirectWithPrompt();
        }, 2000);
    }
}

// Enhanced auto-initialization
function startRedirectSystem() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeRedirectSystem);
    } else {
        initializeRedirectSystem();
    }
}

// Start the system
startRedirectSystem();

// Export for global access
window.RedirectSystem = {
    redirectToGeminiNanoBanana,
    integrateRedirectWithPrompt,
    initializeRedirectSystem,
    testRedirect
};

console.log('📍 Redirect system loaded successfully');