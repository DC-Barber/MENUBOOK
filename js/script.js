// script.js - Core application functionality with Individual Hairstyle Rating Management

// Global variables
window.currentFilter = 'all';
window.currentSlide = 0;
window.currentHairstyle = null;

// DOM Elements
let hairstyleGrid, hairstyleModal, modalTitle, imageSlider, sliderNav;
let faceType, hairLength, serviceTime, price, rating;

// Initialize DOM Elements
function initializeDOMElements() {
    hairstyleGrid = document.getElementById('hairstyleGrid');
    hairstyleModal = document.getElementById('hairstyleModal');
    modalTitle = document.getElementById('modalTitle');
    imageSlider = document.getElementById('imageSlider');
    sliderNav = document.getElementById('sliderNav');
    faceType = document.getElementById('faceType');
    hairLength = document.getElementById('hairLength');
    serviceTime = document.getElementById('serviceTime');
    price = document.getElementById('price');
    rating = document.getElementById('rating');
}

// Generate hairstyle cards with filter and individual rating status - FIXED VERSION
function generateHairstyleCards(filter = 'all') {
    if (!hairstyleGrid) {
        console.error('hairstyleGrid not found');
        return;
    }
    
    hairstyleGrid.innerHTML = '';
    
    const filteredHairstyles = filter === 'all' 
        ? hairstyles 
        : hairstyles.filter(style => style.category === filter);
    
    if (filteredHairstyles.length === 0) {
        hairstyleGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.5;"></i>
                <h3>မတွေ့ပါ</h3>
                <p>ဤအမျိုးအစားအတွက် ဆံပင်ပုံစံများ မရှိပါ</p>
            </div>
        `;
        return;
    }
    
    filteredHairstyles.forEach(hairstyle => {
        // Ensure userRatings exists
        if (!hairstyle.userRatings) {
            hairstyle.userRatings = [];
        }
        
        const avgRating = window.RatingSystem ? window.RatingSystem.calculateAverageRating(hairstyle.userRatings) : 0;
        const isRated = window.RatingSystem ? window.RatingSystem.hasVisitorRated(hairstyle.id) : false;
        
        console.log(`🎨 Generating card for ${hairstyle.name}:`, {
            id: hairstyle.id,
            ratings: hairstyle.userRatings,
            avgRating: avgRating,
            isRated: isRated
        });
        
        const card = document.createElement('div');
        card.className = 'hairstyle-card';
        card.innerHTML = `
            <img src="${hairstyle.images[0]}" alt="${hairstyle.name}" onerror="this.src='https://via.placeholder.com/300x150?text=No+Image'">
            <div class="hairstyle-info">
                <div class="hairstyle-name">${hairstyle.name}</div>
                <div class="hairstyle-price">${hairstyle.price}</div>
                <div class="rating-display">
                    ${window.RatingSystem ? window.RatingSystem.generateStarRating(avgRating) : '☆☆☆☆☆'} 
                    <span class="rating-count">(${hairstyle.userRatings.length})</span>
                </div>
                <button class="rating-btn" data-hairstyle-id="${hairstyle.id}">
                    ${isRated ? '✅ Rated' : '⭐ Rate'}
                </button>
            </div>
        `;
        
        // Card click event - ALWAYS enabled
        card.addEventListener('click', (e) => {
            // Prevent click when clicking on rating button
            if (!e.target.closest('.rating-btn')) {
                console.log('🖱️ Card clicked, opening modal for:', hairstyle.name);
                openHairstyleModal(hairstyle);
            }
        });
        
        // Rating button click event
        const ratingBtn = card.querySelector('.rating-btn');
        if (ratingBtn) {
            if (isRated) {
                // Disable only the rating button
                ratingBtn.disabled = true;
                ratingBtn.style.opacity = '0.5';
                ratingBtn.style.cursor = 'not-allowed';
                ratingBtn.style.background = '#95a5a6';
            } else {
                // Enable rating button
                ratingBtn.disabled = false;
                ratingBtn.style.opacity = '1';
                ratingBtn.style.cursor = 'pointer';
                ratingBtn.style.background = 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)';
                
                ratingBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent card click
                    console.log('🖱️ Rating button clicked for:', hairstyle.name);
                    openHairstyleModal(hairstyle);
                });
            }
        }
        
        hairstyleGrid.appendChild(card);
    });
    
    console.log('✅ All cards generated successfully');
}

// Open hairstyle modal - FIXED FRAME VERSION
function openHairstyleModal(hairstyle) {
    if (!hairstyleModal || !modalTitle || !faceType || !hairLength || !serviceTime || !price || !rating) {
        console.error('Required modal elements not found');
        return;
    }

    window.currentHairstyle = hairstyle;
    window.currentSlide = 0;
    
    console.log('🎯 Opening modal for hairstyle:', hairstyle);
    
    // Set modal content
    modalTitle.textContent = hairstyle.name;
    faceType.textContent = hairstyle.faceType;
    hairLength.textContent = hairstyle.hairLength;
    serviceTime.textContent = hairstyle.serviceTime;
    price.textContent = hairstyle.price;
    
    // Ensure userRatings exists
    if (!hairstyle.userRatings) {
        hairstyle.userRatings = [];
    }
    
    // Calculate and display average rating
    const avgRating = window.RatingSystem ? window.RatingSystem.calculateAverageRating(hairstyle.userRatings) : 0;
    const starsContainer = rating.querySelector('.stars');
    const ratingText = rating.querySelector('.rating-text');
    
    console.log('📊 Modal rating display:', {
        avgRating: avgRating,
        ratingCount: hairstyle.userRatings.length,
        allRatings: hairstyle.userRatings
    });
    
    if (starsContainer && ratingText) {
        starsContainer.textContent = window.RatingSystem ? window.RatingSystem.generateStarRating(avgRating) : '☆☆☆☆☆';
        ratingText.textContent = ` (${hairstyle.userRatings.length} ယောက်သတ်မှတ်ထားသည်)`;
    }
    
    // Clear previous slides and dots
    if (imageSlider && sliderNav) {
        imageSlider.innerHTML = '';
        sliderNav.innerHTML = '';
        
        // Add slides
        hairstyle.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `<img src="${image}" alt="${hairstyle.name} ${index + 1}" onerror="this.src='https://via.placeholder.com/500x250?text=No+Image'">`;
            imageSlider.appendChild(slide);
            
            // Add dots
            const dot = document.createElement('div');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                window.SliderSystem.goToSlide(index);
                window.SliderSystem.resetAutoSlide();
            });
            sliderNav.appendChild(dot);
        });
    }
    
    // Show modal
    hairstyleModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    if (window.SliderSystem) {
        window.SliderSystem.updateSlider();
    }
    
    // Start auto slide if there are multiple images
    if (hairstyle.images.length > 1 && window.SliderSystem) {
        window.SliderSystem.startAutoSlide();
    }
    
    // Update rating UI for this specific hairstyle
    if (window.RatingSystem) {
        setTimeout(() => {
            console.log('🔄 Updating rating UI for hairstyle:', hairstyle.id);
            window.RatingSystem.updateUIBasedOnRatingStatus(hairstyle.id);
        }, 100);
    }
    
    // Ensure prompt button is added and updated
    if (window.PromptSystem) {
        setTimeout(() => {
            window.PromptSystem.addPromptButtonToModal();
            window.PromptSystem.updateCopyButtonState();
        }, 50);
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, initializing app...');
    
    // Initialize DOM elements first
    initializeDOMElements();
    
    // Check if hairstyles data is available
    if (typeof hairstyles === 'undefined') {
        console.error('❌ hairstyles data not found. Make sure hairstyle.js is loaded.');
        return;
    }
    
    // Generate hairstyle cards immediately
    generateHairstyleCards();
    
    // Initialize all other systems
    if (window.ModalSystem) {
        window.ModalSystem.initializeModalSystem();
    }
    
    if (window.SliderSystem) {
        window.SliderSystem.initializeSliderSystem();
    }
    
    if (window.FABSystem) {
        window.FABSystem.initializeFABSystem();
    }
    
    if (window.FilterSystem) {
        window.FilterSystem.generateFilterOptions();
    }
    
    // Test if alerts work immediately
    setTimeout(() => {
        if (window.showSimpleAlert) {
            console.log('✅ showSimpleAlert function is available');
            window.showSimpleAlert('System loaded successfully!', 'success');
        } else {
            console.error('❌ showSimpleAlert function NOT available');
        }
    }, 1000);
    
    console.log('✅ App initialization complete');
});

// Export core functions
window.CoreApp = {
    generateHairstyleCards,
    openHairstyleModal
};

// Touch events for mobile
document.addEventListener('touchmove', function (e) {
    // Allow scrolling
}, { passive: true });