// ===== Main Page =====

// Filter State
let currentCategory = 'all';
let searchQuery = '';

// Render Products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    const filteredProducts = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery) ||
            product.categoryAr.includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 50px; color: #64748b;">
                <span style="font-size: 4rem; display: block; margin-bottom: 20px;">🔍</span>
                <p>لا توجد منتجات مطابقة للبحث</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => createProductCardHTML(product)).join('');
}

// Clone categories for infinite scroll
function initCategoryMarquee() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    // Clone all children
    const cards = Array.from(grid.children);
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        grid.appendChild(clone);
    });
}

// Event Listeners
function initEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const categoriesContainer = document.getElementById('categoriesGrid');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderProducts();
        });
    }

    if (categoriesContainer) {
        // Use event delegation for categories
        categoriesContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.category-card');
            if (!card) return;

            const categoryCards = document.querySelectorAll('.category-card');
            const category = card.dataset.category;

            // Update all cards with same category (both original and clones)
            categoryCards.forEach(c => {
                if (c.dataset.category === category) {
                    c.classList.add('active');
                } else {
                    c.classList.remove('active');
                }
            });

            currentCategory = category;
            renderProducts();
        });
    }

    initCategoryMarquee();
}

// Note: App initialization is now handled by components.js after all components are loaded
