// js/redirect.js - Fixed Version with Alternative Approach

// Gemini URLs
const GEMINI_URLS = {
    mobileWeb: 'https://gemini.google.com',
    desktopWeb: 'https://gemini.google.com'
};

// Check if device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Show instruction modal instead of iframe
function showGeminiInstructions() {
    console.log('📋 Showing Gemini instructions...');
    
    // Create instruction overlay
    const instructionOverlay = document.createElement('div');
    instructionOverlay.id = 'gemini-instruction-overlay';
    instructionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Pyidaungsu', 'Myanmar3', 'Noto Sans Myanmar', sans-serif;
    `;
    
    const instructionBox = document.createElement('div');
    instructionBox.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    instructionBox.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 20px;">✨</div>
        <h2 style="color: #333; margin-bottom: 15px;">Google Gemini သို့သွားရန်</h2>
        
        <div style="text-align: left; background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4285f4;">
            <p style="margin: 0 0 10px 0; color: #333; font-weight: bold;">📝 ကျေးဇူးပြု၍ အောက်ပါအဆင့်များကိုလိုက်နာပါ:</p>
            <ol style="margin: 0; padding-left: 20px; color: #555;">
                <li style="margin-bottom: 8px;">"Gemini ဖွင့်ရန်" ခလုတ်ကိုနှိပ်ပါ</li>
                <li style="margin-bottom: 8px;">Gemini website တွင်သွားပါ</li>
                <li style="margin-bottom: 8px;">ကူးယူထားသော Prompt ကို Paste လုပ်ပါ</li>
                <li>AI image များကိုထုတ်လုပ်ပါ</li>
            </ol>
        </div>
        
        <p style="color: #666; margin-bottom: 25px; font-size: 14px;">
            <strong>Prompt ကူးယူပြီးပါပြီ!</strong> ကျေးဇူးပြု၍ အောက်ပါခလုတ်ကိုနှိပ်ပြီး Gemini သို့သွားပါ။
        </p>
        
        <div style="display: flex; gap: 10px; justify-content: center;">
            <button id="open-gemini-btn" style="
                background: linear-gradient(135deg, #4285f4, #34a853);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 8px;
            ">
                <span>🚀</span> Gemini ဖွင့်ရန်
            </button>
            
            <button id="close-instruction-btn" style="
                background: #6c757d;
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
            ">
                ✕ နောက်မှ
            </button>
        </div>
        
        <div style="margin-top: 20px; padding: 10px; background: #fff3cd; border-radius: 5px; border: 1px solid #ffeaa7;">
            <p style="margin: 0; color: #856404; font-size: 12px;">
                💡 <strong>အကြံပြုချက်:</strong> Gemini app ထဲတွင် Prompt ကို Paste လုပ်ပြီး AI images များထုတ်လုပ်နိုင်ပါသည်။
            </p>
        </div>
    `;
    
    instructionOverlay.appendChild(instructionBox);
    document.body.appendChild(instructionOverlay);
    
    // Add button functionality
    document.getElementById('open-gemini-btn').addEventListener('click', () => {
        window.open(GEMINI_URLS.desktopWeb, '_blank');
        document.body.removeChild(instructionOverlay);
    });
    
    document.getElementById('close-instruction-btn').addEventListener('click', () => {
        document.body.removeChild(instructionOverlay);
    });
    
    // Close on overlay click
    instructionOverlay.addEventListener('click', (e) => {
        if (e.target === instructionOverlay) {
            document.body.removeChild(instructionOverlay);
        }
    });
}

// Redirect to Gemini - UPDATED VERSION
function redirectToGemini() {
    console.log('🚀 Starting Gemini redirect...');
    
    if (isMobileDevice()) {
        console.log('📱 Mobile device - opening in new tab');
        
        // Show loading message
        if (window.showPromptAlert) {
            window.showPromptAlert('info', '🌐 Gemini ကိုဖွင့်နေသည်...');
        }
        
        // Open in new tab for mobile
        setTimeout(() => {
            window.open(GEMINI_URLS.mobileWeb, '_blank');
        }, 500);
        
    } else {
        console.log('💻 Desktop device - showing instructions');
        
        // Desktop - show instructions modal
        if (window.showPromptAlert) {
            window.showPromptAlert('success', '✅ Prompt ကူးယူပြီး Gemini ညွှန်ကြားချက်များကိုပြသထားသည်');
        }
        
        setTimeout(() => {
            showGeminiInstructions();
        }, 800);
    }
}

// Simple integration with prompt system
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
                        window.showPromptAlert('success', `✅ Prompt copied! Gemini ညွှန်ကြားချက်များကိုပြသထားသည်`);
                    }
                    
                    // Auto show instructions after copy
                    setTimeout(() => {
                        redirectToGemini();
                    }, 800);
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        copyButton.disabled = false;
                        copyButton.innerHTML = '<i class="fas fa-copy"></i> Prompt Copy';
                        copyButton.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    }, 3000);
                    
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
        console.log('⏳ Using fallback button monitoring...');
        monitorPromptButtonClicks();
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
            
            promptButton.addEventListener('click', async function() {
                if (window.currentHairstyle) {
                    // Wait a bit for copy to complete then redirect
                    setTimeout(() => {
                        redirectToGemini();
                    }, 1500);
                }
            });
            
            clearInterval(monitoringInterval);
        }
    }, 500);
}

// Initialize redirect system
function initializeRedirectSystem() {
    console.log('🚀 Initializing Gemini redirect system');
    
    // Wait for prompt system to be available
    setTimeout(() => {
        integrateRedirectWithPrompt();
    }, 1000);
}

// Start the system
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeRedirectSystem);
} else {
    initializeRedirectSystem();
}

// Export for global access
window.RedirectSystem = {
    redirectToGemini,
    showGeminiInstructions
};

console.log('📍 Gemini redirect system loaded successfully');