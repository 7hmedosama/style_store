// ===== Favorites Page =====

// Show Favorites Section
function showFavorites() {
    const mainContent = document.getElementById('mainContent');
    const favSection = document.getElementById('favoritesSection');

    if (mainContent) mainContent.style.display = 'none';
    if (favSection) {
        favSection.style.display = 'block';
        renderFavorites();
    }

    // Update page title
    document.title = 'المفضلة | Style Store';
    window.scrollTo(0, 0);
}

// Show Home Page
function showHome() {
    const mainContent = document.getElementById('mainContent');
    const favSection = document.getElementById('favoritesSection');

    if (mainContent) mainContent.style.display = 'block';
    if (favSection) favSection.style.display = 'none';

    // Update page title
    document.title = 'متجر ستايل | Style Store';
}

// Render Favorites
function renderFavorites() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    if (!favoritesGrid) return;

    const favoriteProducts = products.filter(p => favorites.includes(p.id));

    if (favoriteProducts.length === 0) {
        favoritesGrid.innerHTML = `
            <div class="no-favorites">
                <span class="empty-icon">💔</span>
                <h2>لا توجد منتجات مفضلة</h2>
                <p>لم تقم بإضافة أي منتجات لقائمة المفضلة بعد</p>
                <a href="#" onclick="showHome(); return false;" class="back-btn">تصفح المنتجات</a>
            </div>
        `;
        return;
    }

    favoritesGrid.innerHTML = favoriteProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image" onclick="openProductModal(${product.id})" style="cursor: pointer;">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <span class="product-wishlist" onclick="event.stopPropagation(); handleRemoveFromFavorites(${product.id})">❤️</span>
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

// Handle Remove from Favorites
function handleRemoveFromFavorites(productId) {
    removeFromFavorites(productId);
    updateWishlistCount();
    renderFavorites();
    showToast('تمت الإزالة من المفضلة');
}
