// ===== LocalStorage Management =====

// ===== State =====
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ===== Favorites Functions =====
function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function addToFavorites(productId) {
    if (!favorites.includes(productId)) {
        favorites.push(productId);
        saveFavorites();
        return true;
    }
    return false;
}

function removeFromFavorites(productId) {
    favorites = favorites.filter(id => id !== productId);
    saveFavorites();
}

function isInFavorites(productId) {
    return favorites.includes(productId);
}

// ===== Cart Functions =====
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Get product by ID from global products array
function getProductById(productId) {
    return products.find(p => p.id === productId);
}

function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) {
        console.error('Product not found:', productId);
        return null;
    }

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    return product;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return null;
        } else {
            saveCart();
            return item;
        }
    }
    return null;
}

function clearCart() {
    cart = [];
    saveCart();
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartItemsCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}
