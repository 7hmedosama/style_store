// ===== Shared Rendering Logic =====

/**
 * Generates the HTML for a single product card.
 * @param {Object} product - The product object from products.js.
 * @param {Object} options - Optional flags (e.g., isFavoritePage).
 * @returns {string} HTML string.
 */
function createProductCardHTML(product, options = {}) {
    const { isFavoritePage = false } = options;

    // Check if product is in favorites for the icon
    const wishlistIcon = isFavoritePage ? '❤️' : (isInFavorites(product.id) ? '❤️' : '🤍');
    const wishlistAction = isFavoritePage
        ? `handleRemoveFromFavorites(${product.id})`
        : `toggleWishlist(${product.id}, this)`;

    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image" onclick="openProductModal(${product.id})" style="cursor: pointer;">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <span class="product-wishlist" onclick="event.stopPropagation(); ${wishlistAction}">${wishlistIcon}</span>
            </div>
            <div class="product-info">
                <p class="product-category">${currentLang === 'ar' ? product.categoryAr : t('cat-' + product.category)}</p>
                <h3 class="product-name" onclick="openProductModal(${product.id})" style="cursor: pointer;">${product.name}</h3>
                <div class="product-rating">
                    ${'⭐'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}
                </div>
                <div class="product-price">
                    <span class="current-price">${product.price} ${currentLang === 'ar' ? 'جنيه' : 'EGP'}</span>
                    <span class="old-price">${product.oldPrice} ${currentLang === 'ar' ? 'جنيه' : 'EGP'}</span>
                </div>
                <button class="add-to-cart" onclick="handleAddToCart(${product.id})">
                    <span>🛒</span>
                    ${t('btn-add-to-cart')}
                </button>
            </div>
        </div>
    `;
}
