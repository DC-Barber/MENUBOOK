// prompt.js - No Animation, Button Only Version
// Google Apps Script Web App URL for Prompt Tracking
const PROMPT_TRACKING_URL = 'https://script.google.com/macros/s/AKfycbxxbSyLPAyj6fcCWEoEFNsmt5gFIMU8o28X1hDAhmFM5Z511RGkHDhV9g3HTkEmGMnq/exec';

// Track prompt copy counts locally
let promptCopyCounts = JSON.parse(localStorage.getItem('promptCopyCounts')) || {};

// AI Image Generation Prompt Template
const PROMPT_TEMPLATE = `Generate exactly four ultra-realistic portrait images in a strict horizontal 2×2 grid layout. The four panels must show the same person from four different angles:
· Panel 1: Original image.
· Panel 1: Front-facing view (direct camera view)
· Panel 2: Side profile view (90° left or right)
· Panel 3: Back view (rear of the head and neck)

Critical Consistency: The person's facial identity, skin tone, face structure, age, and neutral expression must be perfectly identical across all four panels.

Hairstyle Application:

HAIRSTYLE: [HAIRSTYLE_NAME]
DETAILS:[HAIRSTYLE_DETAILS]

Apply this hairstyle with hyper-realistic detail. It must look naturally grown and consistent in length, volume, and texture across all views.

Style & Lighting: Soft, diffused natural studio lighting. Photorealistic quality, showcasing the hairstyle clearly from each angle.

Output: A single image containing exactly four panels in a 2×2 grid. Do not generate more than four views.
Do not generate more than four objects.`;

// Generate Prompt
function generatePrompt(hairstyleId) {
    const hairstyle = window.hairstylesDetails[hairstyleId];
    if (!hairstyle) return null;

    return PROMPT_TEMPLATE
        .replace(/\[HAIRSTYLE_NAME\]/g, hairstyle.name)
        .replace('[HAIRSTYLE_DETAILS]', hairstyle.details);
}

// Check if current hairstyle is rated
function isCurrentHairstyleRated() {
    return true;
}

// Mark hairstyle as rated in session
function markHairstyleAsRated(hairstyleId) {
    console.log('✅ Prompt copy always enabled for hairstyle:', hairstyleId);
}

// Track prompt copy to Google Sheets
async function trackPromptCopy(hairstyleId, hairstyleName) {
    try {
        const countKey = `hairstyle_${hairstyleId}`;
        promptCopyCounts[countKey] = (promptCopyCounts[countKey] || 0) + 1;
        localStorage.setItem('promptCopyCounts', JSON.stringify(promptCopyCounts));
        
        console.log(`📊 Prompt copied for "${hairstyleName}" (ID: ${hairstyleId}). Total copies: ${promptCopyCounts[countKey]}`);

        const params = new URLSearchParams({
            action: 'trackPromptCopy',
            hairstyleId: hairstyleId,
            hairstyleName: hairstyleName,
            timestamp: new Date().toISOString(),
            copyCount: promptCopyCounts[countKey]
        });

        const response = await fetch(`${PROMPT_TRACKING_URL}?${params}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        return result.success;
    } catch (error) {
        console.error('Tracking error:', error);
        return false;
    }
}

// Show alert messages
function showPromptAlert(type, message) {
    const existingAlert = document.querySelector('.prompt-alert');
    if (existingAlert) existingAlert.remove();

    const alert = document.createElement('div');
    alert.className = `prompt-alert prompt-alert-${type}`;
    
    const icons = { success: '✓', error: '✗', warning: '!', info: 'i' };
    
    alert.innerHTML = `
        <div class="alert-content">
            <span class="alert-icon">${icons[type] || 'i'}</span>
            <span class="alert-message">${message}</span>
            <button class="alert-close">×</button>
        </div>
    `;

    alert.querySelector('.alert-close').addEventListener('click', () => alert.remove());
    document.body.appendChild(alert);

    setTimeout(() => {
        if (alert.parentNode) alert.remove();
    }, 3000);
}

// Clipboard copy function without permission prompt
function copyToClipboard(text) {
    return new Promise((resolve) => {
        // Try modern clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                resolve(true);
            }).catch(() => {
                // Fallback to execCommand
                fallbackCopyTextToClipboard(text, resolve);
            });
        } else {
            // Use fallback method
            fallbackCopyTextToClipboard(text, resolve);
        }
    });
}

// Fallback copy method using execCommand (no permission required)
function fallbackCopyTextToClipboard(text, resolve) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    textArea.style.pointerEvents = 'none';
    textArea.style.zIndex = '-1';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        resolve(successful);
    } catch (err) {
        document.body.removeChild(textArea);
        resolve(false);
    }
}

// Simple copy function with button state update
async function copyPromptWithTracking(hairstyleId, hairstyleName) {
    const copyButton = document.getElementById('generatePromptBtn');
    if (!copyButton) return;

    try {
        // Set button to loading state
        copyButton.disabled = true;
        copyButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating_prompt';
        copyButton.style.background = '#94a3b8';
        
        const prompt = generatePrompt(hairstyleId);
        if (!prompt) {
            throw new Error('Failed to generate prompt');
        }

        // Copy to clipboard without permission prompt
        const success = await copyToClipboard(prompt);
        
        if (success) {
            // Track the copy
            await trackPromptCopy(hairstyleId, hairstyleName);
            
            // Update button to success state
            copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyButton.style.background = '#10b981';
            
            // Show success message
            const countKey = `hairstyle_${hairstyleId}`;
            const copyCount = promptCopyCounts[countKey] || 1;
            showPromptAlert('success', `✅ Prompt copied! (Used ${copyCount} times)`);
            
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
        
        showPromptAlert('error', '❌ Failed to copy prompt. Please try again.');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            copyButton.disabled = false;
            copyButton.innerHTML = '<i class="fas fa-copy"></i> Prompt Copy';
            copyButton.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 3000);
    }
}

// Update copy button state
function updateCopyButtonState() {
    const copyButton = document.getElementById('generatePromptBtn');
    if (!copyButton || !window.currentHairstyle) return;

    copyButton.disabled = false;
    copyButton.style.opacity = '1';
    copyButton.style.cursor = 'pointer';
    copyButton.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    copyButton.title = 'Click to copy AI prompt';
    copyButton.innerHTML = '<i class="fas fa-copy"></i> Prompt Copy';
}

// Monitor rating submissions
function monitorRatingSubmissions() {
    console.log('✅ Prompt copy is always enabled now');
}

// Add Prompt Button to Modal
function addPromptButtonToModal() {
    setTimeout(() => {
        const ratingSection = document.querySelector('.rating-section');
        if (!ratingSection || document.getElementById('generatePromptBtn')) return;

        const promptButton = document.createElement('button');
        promptButton.id = 'generatePromptBtn';
        promptButton.className = 'btn prompt-copy-btn';
        promptButton.innerHTML = '<i class="fas fa-copy"></i> Prompt Copy';
        promptButton.disabled = false;
        
        promptButton.addEventListener('click', async () => {
            if (window.currentHairstyle) {
                await copyPromptWithTracking(window.currentHairstyle.id, window.currentHairstyle.name);
            } else {
                showPromptAlert('error', '❌ No hairstyle selected.');
            }
        });

        let buttonContainer = ratingSection.querySelector('.horizontal-button-container');
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.className = 'horizontal-button-container';
            buttonContainer.style.display = 'flex';
            buttonContainer.style.flexDirection = 'row';
            buttonContainer.style.justifyContent = 'space-between';
            buttonContainer.style.alignItems = 'center';
            buttonContainer.style.gap = '10px';
            buttonContainer.style.width = '100%';
            buttonContainer.style.marginTop = '15px';
            
            const submitRatingBtn = document.getElementById('submitRating');
            if (submitRatingBtn) {
                buttonContainer.appendChild(submitRatingBtn);
            }
            
            ratingSection.appendChild(buttonContainer);
        }

        buttonContainer.appendChild(promptButton);
        updateCopyButtonState();

    }, 100);
}

// Monitor modal openings
function monitorModalOpenings() {
    const originalOpen = window.openHairstyleModal;
    
    if (!originalOpen) {
        setTimeout(monitorModalOpenings, 1000);
        return;
    }
    
    window.openHairstyleModal = function(hairstyle) {
        originalOpen(hairstyle);
        
        setTimeout(() => {
            addPromptButtonToModal();
            updateCopyButtonState();
        }, 50);
    };
}

// Add CSS styles
function addPromptStyles() {
    if (document.querySelector('#prompt-styles')) return;

    const style = document.createElement('style');
    style.id = 'prompt-styles';
    style.textContent = `
        .horizontal-button-container {
            display: flex;
            gap: 10px;
            margin-top: 15px;
            width: 100%;
        }
        
        .horizontal-button-container .btn {
            flex: 1;
            padding: 12px 15px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border: none;
            min-height: 44px;
            font-family: 'Pyidaungsu', 'Myanmar3', 'Noto Sans Myanmar', sans-serif;
        }
        
        /* Rating Button */
        #submitRating {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
        }
        
        #submitRating:hover:not(:disabled) {
            background: linear-gradient(135deg, #218838 0%, #1e9e8a 100%);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
        }
        
        /* Prompt Button */
        .prompt-copy-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            transition: all 0.3s ease;
        }
        
        .prompt-copy-btn:hover:not(:disabled) {
            background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        
        .prompt-copy-btn:disabled {
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        
        /* Spinner Animation */
        .fa-spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Alert Styles */
        .prompt-alert {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            padding: 12px 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border-left: 4px solid #ddd;
            z-index: 10000;
            max-width: 350px;
            animation: slideInRight 0.3s ease;
            font-family: 'Pyidaungsu', 'Myanmar3', 'Noto Sans Myanmar', sans-serif;
        }
        
        .prompt-alert-success { border-left-color: #10b981; background: #10b981; color: white; }
        .prompt-alert-error { border-left-color: #ef4444; background: #ef4444; color: white; }
        .prompt-alert-warning { border-left-color: #f59e0b; background: #f59e0b; color: white; }
        .prompt-alert-info { border-left-color: #3b82f6; background: #3b82f6; color: white; }
        
        .alert-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
        }
        
        .alert-icon { 
            font-weight: bold; 
            font-size: 16px;
            min-width: 18px;
        }
        
        .alert-message { 
            flex: 1; 
            font-size: 13px;
            line-height: 1.4;
        }
        
        .alert-close {
            background: none;
            border: none;
            color: inherit;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.8;
        }
        
        .alert-close:hover { opacity: 1; }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .horizontal-button-container {
                flex-direction: column;
            }
            
            .horizontal-button-container .btn {
                width: 100%;
            }
            
            .prompt-alert {
                top: 10px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize Prompt System
function initPromptSystem() {
    addPromptStyles();
    monitorRatingSubmissions();
    monitorModalOpenings();
    
    console.log('✅ Prompt system initialized - No animation, button only');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPromptSystem);
} else {
    initPromptSystem();
}

// Export for global access
window.PromptSystem = {
    generatePrompt,
    copyPromptWithTracking,
    updateCopyButtonState,
    isCurrentHairstyleRated,
    markHairstyleAsRated,
    initPromptSystem
};
