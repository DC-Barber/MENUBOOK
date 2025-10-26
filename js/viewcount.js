// js/viewcount.js - Delayed Page View Tracker (20s after UI ready)

const VISITOR_TRACKING_URL = 'https://script.google.com/macros/s/AKfycbxEt4VZThQlZewWK8vSVYtS7Q8Qym-440hWzraRMnYo0JZa2LOgCbkFg3nv8JsQvqbr/exec';

class DelayedViewTracker {
    constructor() {
        this.isInitialized = false;
        this.trackingStarted = false;
        this.delayTime = 20000; // 20 seconds
        this.init();
    }

    init() {
        console.log('📍 Delayed View Tracker loaded - Waiting for UI readiness');
        
        // Wait for DOM to be ready first
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.waitForUIReady());
        } else {
            this.waitForUIReady();
        }
    }

    waitForUIReady() {
        console.log('✅ DOM Ready - Waiting for full UI initialization');
        
        // Check if critical UI components are loaded
        this.checkUIComponents().then(() => {
            console.log('🎯 All UI components verified');
            this.scheduleTracking();
        }).catch(() => {
            // Fallback: Use window load event
            console.log('⏳ Using window load fallback');
            window.addEventListener('load', () => {
                console.log('🏁 Window fully loaded');
                this.scheduleTracking();
            });
        });
    }

    checkUIComponents() {
        return new Promise((resolve, reject) => {
            const maxChecks = 50; // Maximum 5 seconds of checking
            let checks = 0;
            
            const checkInterval = setInterval(() => {
                checks++;
                
                // Check if main UI elements exist
                const mainContent = document.getElementById('mainContent');
                const hairstyleGrid = document.getElementById('hairstyleGrid');
                const fabButton = document.getElementById('fabButton');
                
                const uiReady = mainContent && hairstyleGrid && fabButton;
                
                if (uiReady) {
                    clearInterval(checkInterval);
                    console.log('🎊 UI Components confirmed ready');
                    resolve();
                } else if (checks >= maxChecks) {
                    clearInterval(checkInterval);
                    console.log('⚠️ UI check timeout, proceeding anyway');
                    resolve(); // Proceed anyway
                }
                
                console.log(`🔍 UI Check ${checks}/${maxChecks}: ${uiReady ? 'READY' : 'waiting...'}`);
            }, 100);
        });
    }

    scheduleTracking() {
        if (this.trackingStarted) return;
        
        this.trackingStarted = true;
        console.log(`⏰ Scheduling view tracking in ${this.delayTime/1000} seconds`);
        
        // Show countdown in console
        this.showCountdown();
        
        setTimeout(() => {
            console.log('🚀 STARTING VIEW TRACKING NOW');
            this.initializeTracking();
        }, this.delayTime);
    }

    showCountdown() {
        let secondsRemaining = this.delayTime / 1000;
        console.log(`⏳ View tracking starts in: ${secondsRemaining}s`);
        
        const countdownInterval = setInterval(() => {
            secondsRemaining--;
            if (secondsRemaining > 0) {
                console.log(`⏳ View tracking starts in: ${secondsRemaining}s`);
            } else {
                clearInterval(countdownInterval);
                console.log('🎯 VIEW TRACKING COUNTDOWN COMPLETE');
            }
        }, 1000);
    }

    initializeTracking() {
        if (this.isInitialized) return;
        
        this.isInitialized = true;
        console.log('🎬 Initializing page view tracking system');
        
        // Start initial tracking
        this.trackPageView();
        
        // Setup visibility change tracking
        this.setupVisibilityTracking();
        
        // Setup periodic tracking (optional)
        this.setupPeriodicTracking();
    }

    // Get device type
    getDeviceType() {
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
    async getVisitorIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json', {
                timeout: 5000
            });
            
            if (!response.ok) {
                return ''; // Return empty if failed
            }
            
            const data = await response.json();
            return data.ip || ''; // Return empty if no IP
            
        } catch (error) {
            console.log('🌐 IP detection failed, returning empty');
            return ''; // Return empty on error
        }
    }

    // Get separate date and time in English
    getSeparateDateTime() {
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

    // Track page view
    async trackPageView() {
        try {
            console.log('📊 Starting page view tracking...');
            
            const ip = await this.getVisitorIP();
            const deviceType = this.getDeviceType();
            const dateTime = this.getSeparateDateTime();
            
            const pageViewData = {
                action: 'trackVisitor',
                ip: ip, // Will be empty if IP detection fails
                date: dateTime.date,
                time: dateTime.time,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                deviceType: deviceType,
                url: window.location.href,
                userAgent: navigator.userAgent.substring(0, 100) // First 100 chars only
            };
            
            console.log('📊 Tracking page view:', pageViewData);
            
            // Send to Google Sheets with timeout
            await this.sendTrackingData(pageViewData);
            
        } catch (error) {
            console.error('❌ Tracking failed:', error);
        }
    }

    // Send tracking data with timeout
    async sendTrackingData(pageViewData) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        try {
            const params = new URLSearchParams(pageViewData);
            
            const response = await fetch(`${VISITOR_TRACKING_URL}?${params}`, {
                method: 'GET',
                mode: 'no-cors',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            console.log('✅ Page view tracked successfully');
            
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                console.log('⚠️ Tracking request timeout');
            } else {
                console.log('⚠️ Tracking sent (no-cors mode)');
            }
        }
    }

    // Track when page becomes visible again
    setupVisibilityTracking() {
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                console.log('👀 Page became visible, tracking...');
                setTimeout(() => this.trackPageView(), 1500);
            }
        });
    }

    // Optional: Periodic tracking every 30 minutes
    setupPeriodicTracking() {
        setInterval(() => {
            console.log('🔄 Periodic tracking');
            this.trackPageView();
        }, 30 * 60 * 1000); // 30 minutes
    }

    // Manual tracking trigger
    manualTrack() {
        console.log('👤 Manual tracking triggered');
        this.trackPageView();
    }

    // Get tracking status
    getStatus() {
        return {
            initialized: this.isInitialized,
            trackingStarted: this.trackingStarted,
            delayTime: this.delayTime
        };
    }
}

// Initialize the tracker
window.delayedViewTracker = new DelayedViewTracker();

// Export for use in other scripts
window.DelayedViewTracker = {
    trackPageView: () => window.delayedViewTracker.manualTrack(),
    getStatus: () => window.delayedViewTracker.getStatus(),
    getDeviceType: () => window.delayedViewTracker.getDeviceType(),
    getVisitorIP: () => window.delayedViewTracker.getVisitorIP(),
    getSeparateDateTime: () => window.delayedViewTracker.getSeparateDateTime()
};

console.log('📍 Delayed View Count Tracker initialized - 20s delay after UI ready');