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

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
        <div class="product-image" onclick="openProductModal(${product.id})" style="cursor: pointer;">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <span class="product-wishlist" onclick="event.stopPropagation(); toggleWishlist(${product.id}, this)">${isInFavorites(product.id) ? '❤️' : '🤍'}</span>
            </div>
            <div class="product-info">
                <p class="product-category">${product.categoryAr}</p>
                <h3 class="product-name" onclick="openProductModal(${product.id})" style="cursor: pointer;">${product.name}</h3>
                <div class="product-rating">
                    ${'⭐'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}
                </div>
                <div class="product-price">
                    <span class="current-price">${product.price} جنيه</span>
                    <span class="old-price">${product.oldPrice} جنيه</span>
                </div>
                <button class="add-to-cart" onclick="handleAddToCart(${product.id})">
                    <span>🛒</span>
                    أضف للسلة
                </button>
            </div>
        </div>
    `).join('');
}

// Event Listeners
function initEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const categoryCards = document.querySelectorAll('.category-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderProducts();
        });
    }

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            categoryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            currentCategory = card.dataset.category;
            renderProducts();
        });
    });
}

// Note: App initialization is now handled by components.js after all components are loaded
