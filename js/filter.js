// filter.js - Filter system functionality

const categories = [
    { id: 'all', name: 'အားလုံး', count: 63 },
    { id: 'fade', name: 'Fade Styles', count: 7 },
    { id: 'buzz', name: 'Buzz Cut', count: 6 },
    { id: 'undercut', name: 'Undercut', count: 5 },
    { id: 'pompadour', name: 'Pompadour', count: 5 },
    { id: 'quiff', name: 'Quiff', count: 5 },
    { id: 'side-part', name: 'Side Part', count: 5 },
    { id: 'slick-back', name: 'Slick Back', count: 5 },
    { id: 'curly', name: 'Curly Hair', count: 5 },
    { id: 'long', name: 'Long Hair', count: 5 },
    { id: 'french-crop', name: 'French Crop', count: 5 },
    { id: 'comb-over', name: 'Comb Over', count: 5 },
    { id: 'spiky', name: 'Spiky', count: 5 }
];

// Generate filter options
function generateFilterOptions() {
    const filterContainer = document.getElementById('filterOptions');
    if (!filterContainer) {
        console.error('filterOptions not found');
        return;
    }
    
    filterContainer.innerHTML = '';
    
    categories.forEach(category => {
        const filterItem = document.createElement('div');
        filterItem.className = `filter-item ${window.currentFilter === category.id ? 'active' : ''}`;
        filterItem.innerHTML = `
            <span class="filter-name">${category.name}</span>
            <span class="filter-count">${category.count}</span>
        `;
        filterItem.addEventListener('click', () => {
            window.currentFilter = category.id;
            if (window.generateHairstyleCards) {
                window.generateHairstyleCards(category.id);
            }
            updateActiveFilter();
            if (window.ModalSystem && window.ModalSystem.closeAllModals) {
                window.ModalSystem.closeAllModals();
            }
        });
        filterContainer.appendChild(filterItem);
    });
}

// Update active filter style
function updateActiveFilter() {
    document.querySelectorAll('.filter-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.filter-item').forEach(item => {
        if (item.querySelector('.filter-name').textContent === categories.find(cat => cat.id === window.currentFilter)?.name) {
            item.classList.add('active');
        }
    });
}

// Export functions
window.FilterSystem = {
    categories,
    generateFilterOptions,
    updateActiveFilter
};