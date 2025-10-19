// slider.js - Image slider functionality

let autoSlideInterval;
const AUTO_SLIDE_INTERVAL = 1500; // 1.5 seconds

// Start auto slide
function startAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    
    autoSlideInterval = setInterval(() => {
        if (window.currentHairstyle && window.currentHairstyle.images.length > 1) {
            nextSlideFunc();
        }
    }, AUTO_SLIDE_INTERVAL);
}

// Stop auto slide
function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Reset auto slide timer
function resetAutoSlide() {
    stopAutoSlide();
    if (window.currentHairstyle && window.currentHairstyle.images.length > 1) {
        startAutoSlide();
    }
}

// Update slider position
function updateSlider() {
    const imageSlider = document.getElementById('imageSlider');
    if (imageSlider) {
        imageSlider.style.transform = `translateX(-${window.currentSlide * 100}%)`;
    }
    
    // Update active dot
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === window.currentSlide);
    });
}

// Go to specific slide
function goToSlide(index) {
    window.currentSlide = index;
    updateSlider();
}

// Next slide
function nextSlideFunc() {
    if (window.currentHairstyle && window.currentSlide < window.currentHairstyle.images.length - 1) {
        window.currentSlide++;
    } else {
        window.currentSlide = 0;
    }
    updateSlider();
}

// Previous slide
function prevSlideFunc() {
    if (window.currentSlide > 0) {
        window.currentSlide--;
    } else if (window.currentHairstyle) {
        window.currentSlide = window.currentHairstyle.images.length - 1;
    }
    updateSlider();
}

// Initialize slider event listeners
function initializeSliderSystem() {
    const prevSlide = document.getElementById('prevSlide');
    const nextSlide = document.getElementById('nextSlide');
    const imageSlider = document.getElementById('imageSlider');
    
    // Slider navigation with auto slide reset
    if (prevSlide) {
        prevSlide.addEventListener('click', () => {
            prevSlideFunc();
            resetAutoSlide();
        });
    }
    
    if (nextSlide) {
        nextSlide.addEventListener('click', () => {
            nextSlideFunc();
            resetAutoSlide();
        });
    }
    
    // Touch events for mobile sliding
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (imageSlider) {
        imageSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide(); // Pause auto slide during touch
        });
        
        imageSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            resetAutoSlide(); // Resume auto slide after touch
        });
        
        // Pause auto slide on hover (for desktop)
        imageSlider.addEventListener('mouseenter', stopAutoSlide);
        imageSlider.addEventListener('mouseleave', () => {
            const hairstyleModal = document.getElementById('hairstyleModal');
            if (window.currentHairstyle && window.currentHairstyle.images.length > 1 && hairstyleModal.style.display === 'block') {
                startAutoSlide();
            }
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlideFunc();
            } else {
                // Swipe right - previous slide
                prevSlideFunc();
            }
        }
    }
}

// Export functions
window.SliderSystem = {
    startAutoSlide,
    stopAutoSlide,
    resetAutoSlide,
    updateSlider,
    goToSlide,
    nextSlideFunc,
    prevSlideFunc,
    initializeSliderSystem
};
