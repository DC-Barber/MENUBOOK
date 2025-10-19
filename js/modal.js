// modal.js - Modal management functionality

// Close all modals
function closeAllModals() {
    const modals = [
        document.getElementById('hairstyleModal'),
        document.getElementById('infoModal'),
        document.getElementById('mapModal'),
        document.getElementById('contactModal'),
        document.getElementById('servicesModal'),
        document.getElementById('filterModal')
    ];
    
    modals.forEach(modal => {
        if (modal) modal.style.display = 'none';
    });
    
    document.body.style.overflow = 'auto';
    
    // Stop auto slide when closing modal
    if (window.stopAutoSlide) {
        window.stopAutoSlide();
    }
}

// Initialize modal event listeners
function initializeModalSystem() {
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modals = [
            document.getElementById('hairstyleModal'),
            document.getElementById('infoModal'),
            document.getElementById('mapModal'),
            document.getElementById('contactModal'),
            document.getElementById('servicesModal'),
            document.getElementById('filterModal')
        ];
        
        modals.forEach(modal => {
            if (modal && e.target === modal) closeAllModals();
        });
    });
    
    // Close modal with close buttons
    const closeButtons = [
        'closeModal', 'closeInfoModal', 'closeMapModal', 
        'closeContactModal', 'closeServicesModal', 'closeFilterModal'
    ];
    
    closeButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', closeAllModals);
        }
    });
    
    // FAB menu modal handlers
    const fabModalHandlers = {
        infoBtn: 'infoModal',
        mapBtn: 'mapModal',
        contactBtn: 'contactModal',
        servicesBtn: 'servicesModal',
        filterBtn: 'filterModal'
    };
    
    Object.entries(fabModalHandlers).forEach(([btnId, modalId]) => {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);
        const fabMenu = document.getElementById('fabMenu');
        
        if (btn && modal) {
            btn.addEventListener('click', () => {
                modal.style.display = 'block';
                if (fabMenu) fabMenu.classList.remove('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });
}

// Export functions
window.ModalSystem = {
    closeAllModals,
    initializeModalSystem
};