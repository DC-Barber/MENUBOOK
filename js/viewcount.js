// js/visitorTracker.js - Page View Tracker (Separate Date & Time, Real IP Only)

const VISITOR_TRACKING_URL = 'https://script.google.com/macros/s/AKfycbxEt4VZThQlZewWK8vSVYtS7Q8Qym-440hWzraRMnYo0JZa2LOgCbkFg3nv8JsQvqbr/exec';


// Get device type
function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/mobile|android|iphone|ipod|blackberry|opera mini/i.test(userAgent)) {
        return 'Mobile';
    } else if (/tablet|ipad/i.test(userAgent)) {
        return 'Tablet';
    } else {
        return 'Desktop';
    }
}

// Get visitor IP - NO FALLBACK, EMPTY IF FAILED
async function getVisitorIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) {
            return ''; // Return empty if failed
        }
        const data = await response.json();
        return data.ip || ''; // Return empty if no IP
    } catch (error) {
        console.log('IP detection failed, returning empty');
        return ''; // Return empty on error
    }
}

// Get separate date and time in English
function getSeparateDateTime() {
    const now = new Date();
    
    // Date: MM/DD/YYYY
    const date = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    
    // Time: HH:MM:SS AM/PM
    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    
    return {
        date: date,
        time: time
    };
}

// Track page view - EVERY TIME
async function trackPageView() {
    try {
        const ip = await getVisitorIP();
        const deviceType = getDeviceType();
        const dateTime = getSeparateDateTime();
        
        const pageViewData = {
            action: 'trackVisitor',
            ip: ip, // Will be empty if IP detection fails
            date: dateTime.date,
            time: dateTime.time,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            deviceType: deviceType
        };
        
        console.log('📊 Tracking page view:', pageViewData);
        
        // Send to Google Sheets
        const params = new URLSearchParams(pageViewData);
        
        fetch(`${VISITOR_TRACKING_URL}?${params}`, {
            method: 'GET',
            mode: 'no-cors'
        }).then(() => {
            console.log('✅ Page view tracked');
        }).catch(error => {
            console.log('⚠️ Tracking sent');
        });
        
    } catch (error) {
        console.error('❌ Tracking failed:', error);
    }
}

// Track when page loads
function trackInitialPageView() {
    console.log('🚀 Tracking page view...');
    setTimeout(trackPageView, 1000);
}

// Track when page becomes visible again
function setupVisibilityTracking() {
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            setTimeout(trackPageView, 1500);
        }
    });
}

// Initialize tracking
function initializePageViewTracking() {
    console.log('🎬 Starting page view tracking...');
    
    trackInitialPageView();
    setupVisibilityTracking();
}

// Start tracking
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePageViewTracking);
} else {
    initializePageViewTracking();
}

// Export for manual tracking
window.PageViewTracker = {
    trackPageView,
    getDeviceType,
    getVisitorIP,
    getSeparateDateTime
};

console.log('📍 Page view tracker loaded - No Fallback System');