// js/redirect.js - Complete Solution with All Steps

// Gemini URLs
const GEMINI_URLS = {
    mobileWeb: 'https://gemini.google.com',
    desktopWeb: 'https://gemini.google.com'
};

// Check if device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Show step-by-step instructions
function showGeminiInstructions() {
    console.log('📋 Showing complete Gemini instructions...');
    
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
        padding: 20px;
    `;
    
    const instructionBox = document.createElement('div');
    instructionBox.style.cssText = `
        background: white;
        padding: 25px;
        border-radius: 15px;
        max-width: 500px;
        width: 100%;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        max-height: 90vh;
        overflow-y: auto;
    `;
    
    instructionBox.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 15px;">✨</div>
        <h2 style="color: #333; margin-bottom: 20px; font-size: 18px;">Prompt ကူးယူပြီးပါပြီ! ကျေးဇူးပြု၍ အောက်ပါအဆင့်များအတိုင်းလုပ်ဆောင်ပါ</h2>
        
        <!-- Step 1 -->
        <div style="text-align: left; background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #28a745;">
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <div style="background: #28a745; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 10px;">1</div>
                <h3 style="margin: 0; color: #155724; font-size: 16px;">Gemini ကိုဖွင့်ပါ</h3>
            </div>
            <p style="margin: 0; color: #155724; font-size: 14px; padding-left: 34px;">
                အောက်ပါ "Gemini ဖွင့်ရန်" ခလုတ်ကိုနှိပ်ပြီး Google Gemini website ကိုဖွင့်ပါ
            </p>
        </div>
        
        <!-- Step 2 -->
        <div style="text-align: left; background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #1976d2;">
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <div style="background: #1976d2; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 10px;">2</div>
                <h3 style="margin: 0; color: #0d47a1; font-size: 16px;">Prompt ကိုကူးထည့်ပါ</h3>
            </div>
            <p style="margin: 0; color: #0d47a1; font-size: 14px; padding-left: 34px;">
                Gemini chat box ထဲတွင် <strong>Ctrl+V</strong> (သို့) <strong>ကြာရှည်နှိပ်၍ Paste</strong> လုပ်ပါ
            </p>
        </div>
        
        <!-- Step 3 -->
        <div style="text-align: left; background: #fff3e0; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f57c00;">
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <div style="background: #f57c00; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 10px;">3</div>
                <h3 style="margin: 0; color: #e65100; font-size: 16px;">AI ပုံများထုတ်လုပ်ပါ</h3>
            </div>
            <p style="margin: 0; color: #e65100; font-size: 14px; padding-left: 34px;">
                Enter နှိပ်ပြီး AI ကပုံ ၄ပုံထုတ်ပေးသည်ကိုစောင့်ပါ
            </p>
        </div>
        
        <!-- Step 4 -->
        <div style="text-align: left; background: #fce4ec; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #c2185b;">
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <div style="background: #c2185b; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 10px;">4</div>
                <h3 style="margin: 0; color: #880e4f; font-size: 16px;">ပုံများကိုသိမ်းဆည်းပါ</h3>
            </div>
            <p style="margin: 0; color: #880e4f; font-size: 14px; padding-left: 34px;">
                ထွက်လာသောပုံများကို download ချပြီး သိမ်းဆည်းပါ
            </p>
        </div>
        
        <!-- Action Buttons -->
        <div style="display: flex; gap: 10px; justify-content: center; margin: 25px 0 15px 0;">
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
                flex: 1;
                justify-content: center;
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
                min-width: 100px;
            ">
                ✕ ပိတ်ရန်
            </button>
        </div>
        
        <!-- Quick Tips -->
        <div style="margin-top: 15px; padding: 12px; background: #e8f5e8; border-radius: 8px; border: 1px solid #28a745;">
            <p style="margin: 0; color: #155724; font-size: 13px; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 16px;">💡</span>
                <strong>မှတ်ချက်:</strong> Prompt ကို clipboard ထဲသို့ကူးထားပြီးဖြစ်သည်။ Paste လုပ်ရန်သာလိုအပ်ပါသည်။
            </p>
        </div>
        
        <!-- Copy Status -->
        <div style="margin-top: 10px; padding: 8px; background: #d1ecf1; border-radius: 5px;">
            <p style="margin: 0; color: #0c5460; font-size: 12px; display: flex; align-items: center; gap: 5px; justify-content: center;">
                <span style="color: #28a745;">✓</span>
                <strong>Status:</strong> Prompt ကူးယူပြီးပါပြီ
            </p>
        </div>
    `;
    
    instructionOverlay.appendChild(instructionBox);
    document.body.appendChild(instructionOverlay);
    
    // Add button functionality
    document.getElementById('open-gemini-btn').addEventListener('click', () => {
        // Open Gemini in new tab
        window.open(GEMINI_URLS.desktopWeb, '_blank');
        
        // Show confirmation message
        if (window.showPromptAlert) {
            window.showPromptAlert('success', '🚀 Gemini ကိုဖွင့်လိုက်ပါပြီ! ကျေးဇူးပြု၍ Prompt ကို Paste လုပ်ပါ။');
        }
        
        // Close instruction after a delay
        setTimeout(() => {
            document.body.removeChild(instructionOverlay);
        }, 1000);
    });
    
    document.getElementById('close-instruction-btn').addEventListener('click', () => {
        document.body.removeChild(instructionOverlay);
        if (window.showPromptAlert) {
            window.showPromptAlert('info', '📝 နောက်မှ Gemini သုံးရန်အတွက် Prompt ကို clipboard ထဲတွင်သိမ်းထားပါသည်။');
        }
    });
    
    // Close on overlay click
    instructionOverlay.addEventListener('click', (e) => {
        if (e.target === instructionOverlay) {
            document.body.removeChild(instructionOverlay);
        }
    });
}

// Redirect to Gemini - COMPLETE VERSION
function redirectToGemini() {
    console.log('🚀 Starting complete Gemini redirect...');
    
    if (isMobileDevice()) {
        console.log('📱 Mobile device - showing instructions with direct link');
        
        // Show loading message
        if (window.showPromptAlert) {
            window.showPromptAlert('success', '✅ Prompt ကူးယူပြီး! ကျေးဇူးပြု၍ ညွှန်ကြားချက်များကိုလိုက်နာပါ။');
        }
        
        // Show instructions for mobile
        setTimeout(() => {
            showGeminiInstructions();
        }, 800);
        
    } else {
        console.log('💻 Desktop device - showing complete instructions');
        
        // Desktop - show complete instructions
        if (window.showPromptAlert) {
            window.showPromptAlert('success', '✅ Prompt ကူးယူပြီး! ကျေးဇူးပြု၍ ၄ဆင့်ညွှန်ကြားချက်များကိုလိုက်နာပါ။');
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
                        window.showPromptAlert('success', `✅ Prompt ကူးယူပြီး! ကျေးဇူးပြု၍ ၄ဆင့်ညွှန်ကြားချက်များကိုလိုက်နာပါ။`);
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
    console.log('🚀 Initializing complete Gemini redirect system');
    
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

console.log('📍 Complete Gemini redirect system loaded successfully');