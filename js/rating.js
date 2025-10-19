// rating.js - Client-Side IP Protection with FAST RATING SYSTEM
// Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxwUXy_eATpGqqBSXF0kceDU7cr2vbDJWWVP0Sk7d0B4QE40ruJLNVccHtPNbUDlOzGSw/exec';

// Visitor data storage
let visitorIP = null;
let visitorRatedHairstyles = new Set();

// Calculate average rating
function calculateAverageRating(ratings) {
    if (!ratings || !Array.isArray(ratings) || ratings.length === 0) return 0;
    const validRatings = ratings.filter(r => !isNaN(parseFloat(r)));
    if (validRatings.length === 0) return 0;
    
    const sum = validRatings.reduce((total, rating) => total + parseFloat(rating), 0);
    return (sum / validRatings.length).toFixed(1);
}

// Generate star display
function generateStarRating(rating) {
    const numericRating = parseFloat(rating) || 0;
    const fullStars = Math.floor(numericRating);
    const halfStar = numericRating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '★';
        } else if (i === fullStars && halfStar) {
            stars += '½';
        } else {
            stars += '☆';
        }
    }
    
    return stars;
}

// Get visitor IP address - FAST VERSION
async function getVisitorIP() {
    if (visitorIP) return visitorIP;
    
    try {
        // Create session ID immediately for new visitors
        if (!sessionStorage.getItem('visitorSessionId')) {
            const sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('visitorSessionId', sessionId);
            localStorage.setItem('visitorIP', sessionId); // Fallback to localStorage
        }
        
        visitorIP = sessionStorage.getItem('visitorSessionId');
        console.log('📡 Visitor Session ID:', visitorIP);
        
        // Try to get real IP in background (non-blocking)
        setTimeout(async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                if (data && data.ip) {
                    visitorIP = data.ip;
                    localStorage.setItem('visitorIP', visitorIP);
                    console.log('📡 Real IP detected:', visitorIP);
                }
            } catch (error) {
                console.log('📡 Using session ID instead of real IP');
            }
        }, 1000);
        
        return visitorIP;
    } catch (error) {
        console.warn('⚠️ Could not get IP, using session-based ID');
        const fallbackId = 'fallback-' + Date.now();
        visitorIP = fallbackId;
        return visitorIP;
    }
}

// Load ratings from Google Sheets - FAST VERSION with caching
async function loadRatingsFromSheet() {
    try {
        console.log('📥 Loading ratings from Google Sheets...');
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getRatings&timestamp=${Date.now()}`);
        
        if (!response.ok) {
            throw new Error('Network error');
        }
        
        const data = await response.json();
        console.log('📊 Raw data from sheet:', data);
        
        if (data.success && data.data && data.data.ratings) {
            // Update hairstyles data with ratings from sheet
            data.data.ratings.forEach(sheetRating => {
                const hairstyleId = parseInt(sheetRating.hairstyleId);
                const hairstyle = hairstyles.find(h => h.id === hairstyleId);
                
                if (hairstyle) {
                    // Convert ratings to numbers and filter valid ones
                    hairstyle.userRatings = sheetRating.ratings
                        .map(r => parseFloat(r))
                        .filter(r => !isNaN(r) && r >= 1 && r <= 5);
                    
                    console.log(`✅ Loaded ratings for hairstyle ${hairstyleId}:`, hairstyle.userRatings);
                } else {
                    console.warn(`⚠️ Hairstyle ${hairstyleId} not found in local data`);
                }
            });
            
            // Cache the updated ratings
            cacheRatingsToLocalStorage();
            
            console.log('✅ All ratings loaded successfully');
            return true;
        } else {
            console.error('❌ Failed to load ratings data:', data);
            throw new Error(data.error || 'Failed to load ratings data');
        }
    } catch (error) {
        console.error('❌ Error loading ratings:', error);
        return false;
    }
}

// Cache ratings to localStorage for immediate loading
function cacheRatingsToLocalStorage() {
    try {
        const ratingsData = hairstyles.map(hairstyle => ({
            id: hairstyle.id,
            ratings: hairstyle.userRatings || []
        }));
        
        localStorage.setItem('cachedHairstyleRatings', JSON.stringify(ratingsData));
        localStorage.setItem('cachedRatingsTimestamp', Date.now().toString());
        console.log('✅ Ratings cached to localStorage');
    } catch (error) {
        console.warn('⚠️ Could not cache ratings to localStorage');
    }
}

// Load cached ratings from localStorage
function loadCachedRatings() {
    try {
        const cachedRatings = localStorage.getItem('cachedHairstyleRatings');
        const cachedTimestamp = localStorage.getItem('cachedRatingsTimestamp');
        
        // Only use cache if it's less than 1 hour old
        if (cachedRatings && cachedTimestamp) {
            const cacheAge = Date.now() - parseInt(cachedTimestamp);
            const ONE_HOUR = 60 * 60 * 1000;
            
            if (cacheAge < ONE_HOUR) {
                const ratingsData = JSON.parse(cachedRatings);
                
                ratingsData.forEach(cachedRating => {
                    const hairstyle = hairstyles.find(h => h.id === cachedRating.id);
                    if (hairstyle) {
                        hairstyle.userRatings = cachedRating.ratings || [];
                    }
                });
                
                console.log('✅ Loaded cached ratings for immediate display');
                return true;
            } else {
                console.log('🕐 Cache expired, loading fresh data');
                localStorage.removeItem('cachedHairstyleRatings');
                localStorage.removeItem('cachedRatingsTimestamp');
            }
        }
    } catch (error) {
        console.warn('⚠️ Could not load cached ratings');
    }
    return false;
}

// Load visitor's rating history from localStorage
function loadVisitorRatingHistory() {
    try {
        const ip = visitorIP || 'unknown';
        const historyKey = `ratingHistory_${ip}`;
        const storedHistory = localStorage.getItem(historyKey);
        
        if (storedHistory) {
            visitorRatedHairstyles = new Set(JSON.parse(storedHistory));
            console.log('📊 Loaded visitor rating history:', Array.from(visitorRatedHairstyles));
        } else {
            console.log('🆕 New visitor, no rating history found');
            visitorRatedHairstyles = new Set();
        }
    } catch (error) {
        console.warn('⚠️ Could not load rating history:', error);
        visitorRatedHairstyles = new Set();
    }
}

// Save visitor's rating history to localStorage
function saveVisitorRatingHistory() {
    try {
        const ip = visitorIP || 'unknown';
        const historyKey = `ratingHistory_${ip}`;
        localStorage.setItem(historyKey, JSON.stringify(Array.from(visitorRatedHairstyles)));
        console.log('💾 Saved visitor rating history');
    } catch (error) {
        console.warn('⚠️ Could not save rating history:', error);
    }
}

// Check if visitor has already rated a hairstyle
function hasVisitorRated(hairstyleId) {
    return visitorRatedHairstyles.has(hairstyleId.toString());
}

// Submit rating to Google Sheets - FAST VERSION
async function submitRatingToSheet(hairstyleId, ratingValue) {
    try {
        console.log(`📤 Submitting rating: Hairstyle ${hairstyleId}, Rating ${ratingValue}`);
        
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=submitRating&hairstyleId=${hairstyleId}&rating=${ratingValue}&timestamp=${Date.now()}`);
        
        if (!response.ok) {
            throw new Error('Network error');
        }
        
        const result = await response.json();
        console.log('📊 Submission result:', result);
        
        if (result.success) {
            console.log('✅ Rating submitted successfully');
            
            // Add to visitor's rated hairstyles
            visitorRatedHairstyles.add(hairstyleId.toString());
            saveVisitorRatingHistory();
            
            // Immediately update local hairstyles data
            const hairstyle = hairstyles.find(h => h.id === hairstyleId);
            if (hairstyle) {
                if (!hairstyle.userRatings) {
                    hairstyle.userRatings = [];
                }
                hairstyle.userRatings.push(parseFloat(ratingValue));
                console.log(`✅ Updated local ratings for hairstyle ${hairstyleId}:`, hairstyle.userRatings);
                
                // Update cache
                cacheRatingsToLocalStorage();
            }
            
            return { 
                success: true, 
                message: '🌟 ကျေးဇူးတင်ပါသည်! သင်၏ အဆင့်သတ်မှတ်ချက်ကို မှတ်တမ်းတင်ပြီးပါပြီ။' 
            };
        } else {
            throw new Error(result.error || 'Server rejected the rating');
        }
    } catch (error) {
        console.error('❌ Error submitting rating:', error);
        return { 
            success: false, 
            message: '❌ အဆင့်သတ်မှတ်ချက် မှတ်တမ်းတင်ရာတွင် အမှားတစ်ခုဖြစ်နေပါသည်။' 
        };
    }
}

// Simple alert function
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.rating-alert');
    existingAlerts.forEach(alert => alert.remove());
    
    const alert = document.createElement('div');
    alert.className = `rating-alert rating-alert-${type}`;
    
    const icons = {
        success: '✓',
        error: '✗',
        warning: '!',
        info: 'i'
    };
    
    alert.innerHTML = `
        <div class="alert-content">
            <span class="alert-icon">${icons[type] || 'i'}</span>
            <span class="alert-message">${message}</span>
            <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 4000);
}

// Update submit button state
function updateSubmitButton(isLoading, isRated = false) {
    const submitBtn = document.getElementById('submitRating');
    if (!submitBtn) return;
    
    if (isLoading) {
        submitBtn.innerHTML = '⏳ မှတ်တမ်းတင်နေသည်...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
    } else if (isRated) {
        submitBtn.innerHTML = '✅ သတ်မှတ်ပြီးပြီ';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
    } else {
        submitBtn.innerHTML = '⭐ အဆင့်သတ်မှတ်ပါ';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
}

// Update rating display
function updateRatingDisplay(hairstyle) {
    if (!hairstyle) return;
    
    const avgRating = calculateAverageRating(hairstyle.userRatings);
    const starsContainer = document.querySelector('.stars');
    const ratingText = document.querySelector('.rating-text');
    
    if (starsContainer && ratingText) {
        starsContainer.textContent = generateStarRating(avgRating);
        ratingText.textContent = ` (${hairstyle.userRatings.length} ယောက်သတ်မှတ်ထားသည်)`;
    }
}

// Reset stars selection
function resetStarsSelection() {
    const stars = document.querySelectorAll('.user-rating .star');
    stars.forEach(star => {
        star.classList.remove('active');
    });
}

// Update UI based on rating status for SPECIFIC hairstyle - MODAL ONLY
function updateUIBasedOnRatingStatus(hairstyleId) {
    const stars = document.querySelectorAll('.user-rating .star');
    const submitBtn = document.getElementById('submitRating');
    
    if (!stars.length || !submitBtn) return;
    
    if (hasVisitorRated(hairstyleId)) {
        // Visitor has already rated THIS SPECIFIC hairstyle - MODAL ONLY
        stars.forEach(star => {
            star.style.opacity = '0.5';
            star.style.cursor = 'not-allowed';
            star.style.pointerEvents = 'none';
        });
        updateSubmitButton(false, true);
    } else {
        // Visitor can rate THIS SPECIFIC hairstyle - MODAL ONLY
        stars.forEach(star => {
            star.style.opacity = '1';
            star.style.cursor = 'pointer';
            star.style.pointerEvents = 'auto';
        });
        updateSubmitButton(false, false);
    }
}

// Update all hairstyle cards rating status - CARD RATING BUTTONS ONLY
function updateAllHairstyleCardsRatingStatus() {
    const hairstyleCards = document.querySelectorAll('.hairstyle-card');
    
    hairstyleCards.forEach(card => {
        const ratingBtn = card.querySelector('.rating-btn');
        const hairstyleId = ratingBtn ? ratingBtn.getAttribute('data-hairstyle-id') : null;
        
        if (hairstyleId && ratingBtn) {
            if (hasVisitorRated(parseInt(hairstyleId))) {
                // Disable only the rating button in card
                ratingBtn.disabled = true;
                ratingBtn.innerHTML = '✅ Rated';
                ratingBtn.style.opacity = '0.5';
                ratingBtn.style.cursor = 'not-allowed';
                ratingBtn.style.background = '#95a5a6';
            } else {
                // Enable rating button in card
                ratingBtn.disabled = false;
                ratingBtn.innerHTML = '⭐ Rate';
                ratingBtn.style.opacity = '1';
                ratingBtn.style.cursor = 'pointer';
                ratingBtn.style.background = 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)';
            }
        }
    });
}

// Initialize rating system - FAST VERSION
function initializeRatingSystem() {
    const stars = document.querySelectorAll('.user-rating .star');
    const submitBtn = document.getElementById('submitRating');
    
    if (!stars.length || !submitBtn) {
        console.log('⏳ Rating elements not found, retrying...');
        setTimeout(initializeRatingSystem, 500);
        return;
    }
    
    let selectedRating = 0;
    
    console.log('✅ Rating system elements found');
    
    // Reset stars to initial state
    resetStarsSelection();
    
    // Star click events
    stars.forEach(star => {
        star.addEventListener('click', function() {
            console.log('⭐ Star clicked, current hairstyle:', window.currentHairstyle);
            
            if (!window.currentHairstyle) {
                console.log('⚠️ No current hairstyle');
                return;
            }
            
            if (hasVisitorRated(window.currentHairstyle.id)) {
                console.log('⚠️ Already rated this hairstyle');
                return;
            }
            
            const rating = parseInt(this.getAttribute('data-value'));
            selectedRating = rating;
            
            console.log(`⭐ Star ${rating} selected for hairstyle ${window.currentHairstyle.id}`);
            
            // Update star display
            stars.forEach(s => {
                const sRating = parseInt(s.getAttribute('data-value'));
                if (sRating <= rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
            
            // Enable submit button
            updateSubmitButton(false, false);
        });
    });
    
    // Submit button click event
    submitBtn.addEventListener('click', async function() {
        console.log('📝 Submit button clicked, selected rating:', selectedRating);
        
        if (!window.currentHairstyle) {
            console.log('⚠️ No hairstyle selected');
            showAlert('❌ ဆံပင်ပုံစံရွေးချယ်မှုမရှိပါ။', 'error');
            return;
        }
        
        const currentHairstyleId = window.currentHairstyle.id;
        
        if (hasVisitorRated(currentHairstyleId)) {
            console.log('⚠️ Already rated this hairstyle');
            showAlert('⚠️ ဤဆံပင်ပုံစံကို သင်အဆင့်သတ်မှတ်ပြီးသားဖြစ်ပါသည်။', 'warning');
            return;
        }
        
        if (selectedRating === 0) {
            console.log('⚠️ No rating selected');
            showAlert('⭐ ကျေးဇူးပြု၍ အဆင့်သတ်မှတ်ချက်ကို ရွေးချယ်ပါ။', 'warning');
            return;
        }
        
        console.log(`🚀 Submitting rating ${selectedRating} for hairstyle ${currentHairstyleId}`);
        
        // Show loading
        updateSubmitButton(true);
        showAlert('📤 အဆင့်သတ်မှတ်ချက် မှတ်တမ်းတင်နေသည်...', 'info');
        
        try {
            const result = await submitRatingToSheet(currentHairstyleId, selectedRating);
            
            if (result.success) {
                console.log('✅ Rating submission successful');
                showAlert(result.message, 'success');
                
                // Update UI for THIS SPECIFIC hairstyle only - MODAL
                updateUIBasedOnRatingStatus(currentHairstyleId);
                
                // Update rating buttons in ALL cards
                updateAllHairstyleCardsRatingStatus();
                
                // Update display with new ratings immediately
                updateRatingDisplay(window.currentHairstyle);
                
                // Update grid to refresh all cards
                if (window.CoreApp && window.CoreApp.refreshDisplayWithUpdatedRatings) {
                    window.CoreApp.refreshDisplayWithUpdatedRatings();
                }
                
                // Reset selection
                selectedRating = 0;
                resetStarsSelection();
                
            } else {
                console.log('❌ Rating submission failed');
                showAlert(result.message, 'error');
                updateSubmitButton(false);
            }
        } catch (error) {
            console.error('💥 Error in rating submission:', error);
            showAlert('❌ မှတ်တမ်းတင်ရာတွင် အမှားတစ်ခုဖြစ်နေပါသည်။', 'error');
            updateSubmitButton(false);
        }
    });
    
    console.log('✅ Rating system initialized successfully');
}

// Monitor modal openings to update rating status for specific hairstyle
function monitorModalOpenings() {
    const originalOpenModal = window.openHairstyleModal;
    if (originalOpenModal) {
        window.openHairstyleModal = function(hairstyle) {
            originalOpenModal(hairstyle);
            
            // Update UI based on whether visitor has rated THIS SPECIFIC hairstyle
            setTimeout(() => {
                updateUIBasedOnRatingStatus(hairstyle.id);
            }, 100);
        };
    }
}

// Add styles
function addStyles() {
    if (!document.querySelector('#rating-styles')) {
        const style = document.createElement('style');
        style.id = 'rating-styles';
        style.textContent = `
            .rating-alert {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 8px;
                padding: 12px 16px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                border-left: 4px solid #ddd;
                z-index: 10000;
                max-width: 400px;
                animation: slideInRight 0.3s ease;
                font-family: 'Pyidaungsu', 'Myanmar3', 'Noto Sans Myanmar', sans-serif;
                font-size: 14px;
            }
            
            .rating-alert-success {
                border-left-color: #00b894;
                background: #00b894;
                color: white;
            }
            
            .rating-alert-error {
                border-left-color: #e17055;
                background: #e17055;
                color: white;
            }
            
            .rating-alert-warning {
                border-left-color: #fdcb6e;
                background: #fdcb6e;
                color: white;
            }
            
            .rating-alert-info {
                border-left-color: #74b9ff;
                background: #74b9ff;
                color: white;
            }
            
            .alert-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
            }
            
            .alert-icon {
                font-weight: bold;
                font-size: 16px;
            }
            
            .alert-message {
                flex: 1;
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
                opacity: 0.7;
            }
            
            .alert-close:hover {
                opacity: 1;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .user-rating .star {
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 24px;
                color: #ddd;
            }
            
            .user-rating .star.active {
                color: #ffc107;
                transform: scale(1.1);
            }
            
            .user-rating .star:not(.active):hover {
                color: #ffd54f;
                transform: scale(1.2);
            }
            
            .user-rating .star[style*="pointer-events: none"] {
                cursor: not-allowed;
                opacity: 0.5;
            }
            
            #submitRating {
                background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s;
                font-family: 'Pyidaungsu', 'Myanmar3', 'Noto Sans Myanmar', sans-serif;
            }
            
            #submitRating:hover:not(:disabled) {
                background: linear-gradient(135deg, #b8941f 0%, #9a7c18 100%);
                transform: translateY(-2px);
            }
            
            #submitRating:disabled {
                opacity: 0.7;
                cursor: not-allowed;
                transform: none;
            }
        `;
        document.head.appendChild(style);
        console.log('✅ Rating styles added');
    }
}

// Initialize - ULTRA FAST VERSION
async function initializeRatings() {
    console.log('🎬 Starting ULTRA FAST rating system initialization...');
    
    // Add styles first
    addStyles();
    
    // Get visitor IP and load history (non-blocking)
    setTimeout(async () => {
        await getVisitorIP();
        loadVisitorRatingHistory();
    }, 100);
    
    // Monitor modal openings
    monitorModalOpenings();
    
    // Initialize event listeners
    initializeRatingSystem();
    
    // Update all hairstyle cards based on rating status
    setTimeout(() => {
        updateAllHairstyleCardsRatingStatus();
    }, 500);
    
    console.log('✅ ULTRA FAST Rating system initialized');
}

// Export functions
window.RatingSystem = {
    calculateAverageRating,
    generateStarRating,
    loadRatingsFromSheet,
    submitRatingToSheet,
    hasVisitorRated,
    initializeRatingSystem,
    initializeRatings,
    updateRatingDisplay,
    updateAllHairstyleCardsRatingStatus,
    updateUIBasedOnRatingStatus,
    loadCachedRatings,
    cacheRatingsToLocalStorage
};

// Start when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeRatings);
} else {
    initializeRatings();
}