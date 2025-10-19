// fab.js - Complete version with GPS tracking

// GPS Tracking URL
const FAB_TRACKING_URL = 'https://script.google.com/macros/s/AKfycbxoQHqCjkwYHO4JTybCIs0stTmiMQQCiHmuv_4q_pbXFmFJaKQsAK_XWHogVTMz39Vi/exec';

// Get GPS coordinates
async function getGPSLocation() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve({ 
                success: false, 
                error: 'Geolocation not supported',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown'
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    success: true,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown'
                });
            },
            (error) => {
                let errorMessage = 'Unknown error';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Permission denied';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Position unavailable';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Request timeout';
                        break;
                }
                resolve({ 
                    success: false, 
                    error: errorMessage,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown'
                });
            },
            {
                enableHighAccuracy: false, // Changed to false for faster response
                timeout: 5000, // Shorter timeout
                maximumAge: 300000 // 5 minutes cache
            }
        );
    });
}

// Track FAB button click
async function trackFABClick(buttonName, locationData) {
    try {
        const params = new URLSearchParams({
            action: 'trackFABClick',
            buttonName: buttonName,
            timestamp: new Date().toISOString(),
            latitude: locationData.latitude || '',
            longitude: locationData.longitude || '',
            timezone: locationData.timezone || 'Unknown'
        });

        console.log(`📡 Sending FAB tracking data for: ${buttonName}`);
        
        const response = await fetch(`${FAB_TRACKING_URL}?${params}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log(`📊 FAB tracking response:`, result);
        return result.success;
        
    } catch (error) {
        console.error('FAB Tracking error:', error);
        return false;
    }
}

// Toggle FAB menu
function toggleFabMenu() {
    const fabMenu = document.getElementById('fabMenu');
    if (fabMenu) {
        fabMenu.classList.toggle('active');
    }
}

// Native Share Function
async function nativeShare() {
    const websiteUrl = window.location.href;
    const websiteTitle = "Diamond Crown Barber Shop - ဆံပင်ညှပ်ဆိုင်";
    const websiteDescription = "Diamond Crown ဆံပင်ညှပ်ဆိုင်သည် မျက်နှာအမျိုးအစားအားလုံးအတွက် လိုက်ဖတ်မည့် ဆံပင်ပုံစံများကို ကျွမ်းကျင်စွာ ပြုလုပ်ပေးနေပါသည်။";

    if (navigator.share) {
        try {
            await navigator.share({
                title: websiteTitle,
                text: websiteDescription,
                url: websiteUrl,
            });
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('မျှဝေရာတွင်အမှားတစ်ခုဖြစ်နေပါသည်:', error);
            }
        }
    } else {
        alert('မျှဝေခြင်းအတွက် ဤ browser ကိုအထောက်အပံ့မပေးပါ။\n\nလင့်ခ်: ' + websiteUrl);
    }
}

// Initialize FAB menu with GPS tracking
function initializeFABSystem() {
    const fabButton = document.getElementById('fabButton');
    const fabMenu = document.getElementById('fabMenu');
    
    // FAB menu buttons configuration
    const fabButtons = {
        'filterBtn': { 
            name: 'Filter Button',
            modal: 'filterModal'
        },
        'infoBtn': { 
            name: 'Shop Info Button',
            modal: 'infoModal' 
        },
        'mapBtn': { 
            name: 'Location Button',
            modal: 'mapModal'
        },
        'contactBtn': { 
            name: 'Contact Button',
            modal: 'contactModal'
        },
        'servicesBtn': { 
            name: 'Services Button',
            modal: 'servicesModal'
        },
        'nativeShareBtn': { 
            name: 'Share Button',
            action: 'share'
        }
    };

    // FAB menu toggle
    if (fabButton) {
        fabButton.addEventListener('click', toggleFabMenu);
    }

    // Add GPS tracking to all FAB buttons
    Object.entries(fabButtons).forEach(([btnId, btnConfig]) => {
        const btn = document.getElementById(btnId);
        
        if (btn) {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                
                // Close FAB menu first
                if (fabMenu) fabMenu.classList.remove('active');
                
                // Track GPS location (non-blocking)
                setTimeout(async () => {
                    try {
                        console.log(`📍 Tracking GPS for ${btnConfig.name}...`);
                        const locationData = await getGPSLocation();
                        
                        // Send tracking data (don't wait for response)
                        trackFABClick(btnConfig.name, locationData).then(success => {
                            if (success) {
                                console.log(`✅ ${btnConfig.name} click tracked successfully`);
                            } else {
                                console.log(`⚠️ ${btnConfig.name} tracking failed`);
                            }
                        });
                        
                    } catch (error) {
                        console.error(`❌ GPS tracking error for ${btnConfig.name}:`, error);
                    }
                }, 100);
                
                // Handle button specific actions immediately
                if (btnConfig.modal) {
                    const modal = document.getElementById(btnConfig.modal);
                    if (modal) {
                        modal.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    }
                } else if (btnConfig.action === 'share') {
                    await nativeShare();
                }
            });
        }
    });

    // Close FAB menu when clicking outside
    document.addEventListener('click', (e) => {
        if (fabButton && fabMenu && !fabButton.contains(e.target) && !fabMenu.contains(e.target)) {
            fabMenu.classList.remove('active');
        }
    });
}

// Export functions
window.FABSystem = {
    toggleFabMenu,
    nativeShare,
    initializeFABSystem,
    trackFABClick
};
