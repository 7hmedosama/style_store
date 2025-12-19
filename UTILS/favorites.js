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

    favoritesGrid.innerHTML = favoriteProducts.map(product => createProductCardHTML(product, { isFavoritePage: true })).join('');
}

// Handle Remove from Favorites
function handleRemoveFromFavorites(productId) {
    removeFromFavorites(productId);
    updateWishlistCount();
    renderFavorites();
    showToast('تمت الإزالة من المفضلة');
}
