// ===== API Service =====
const API_BASE_URL = 'http://localhost:3000';

// ===== Browser Storage Keys =====
const STORAGE_KEYS = {
    CART: 'stylestore_cart',
    FAVORITES: 'stylestore_favorites'
};

// API Helper Functions
const api = {
    // ===== Products (from JSON Server) =====
    async getAllProducts() {
        try {
            const response = await fetch(`${API_BASE_URL}/products`);
            if (!response.ok) throw new Error('Failed to fetch products');
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    },

    async getProductById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/products/${id}`);
            if (!response.ok) throw new Error('Product not found');
            return await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    },

    async getProductsByCategory(category) {
        try {
            const url = category === 'all'
                ? `${API_BASE_URL}/products`
                : `${API_BASE_URL}/products?category=${category}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch products');
            return await response.json();
        } catch (error) {
            console.error('Error fetching products by category:', error);
            return [];
        }
    },

    async searchProducts(query) {
        try {
            const response = await fetch(`${API_BASE_URL}/products?q=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error('Search failed');
            return await response.json();
        } catch (error) {
            console.error('Error searching products:', error);
            return [];
        }
    },

    // ===== Categories (from JSON Server) =====
    async getAllCategories() {
        try {
            const response = await fetch(`${API_BASE_URL}/categories`);
            if (!response.ok) throw new Error('Failed to fetch categories');
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    },

    // ===== Cart (Browser Storage) =====
    getCart() {
        try {
            const cartData = localStorage.getItem(STORAGE_KEYS.CART);
            return cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error('Error reading cart from storage:', error);
            return [];
        }
    },

    saveCart(cart) {
        try {
            localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
            return true;
        } catch (error) {
            console.error('Error saving cart to storage:', error);
            return false;
        }
    },

    addToCart(item) {
        try {
            const cart = this.getCart();
            const existingIndex = cart.findIndex(i => i.id === item.id);

            if (existingIndex >= 0) {
                cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
            } else {
                cart.push({ ...item, quantity: 1 });
            }

            this.saveCart(cart);
            return item;
        } catch (error) {
            console.error('Error adding to cart:', error);
            return null;
        }
    },

    updateCartItem(id, updates) {
        try {
            const cart = this.getCart();
            const index = cart.findIndex(item => item.id === id);

            if (index >= 0) {
                cart[index] = { ...cart[index], ...updates };
                this.saveCart(cart);
                return cart[index];
            }
            return null;
        } catch (error) {
            console.error('Error updating cart item:', error);
            return null;
        }
    },

    removeFromCart(id) {
        try {
            const cart = this.getCart();
            const filteredCart = cart.filter(item => item.id !== id);
            this.saveCart(filteredCart);
            return true;
        } catch (error) {
            console.error('Error removing from cart:', error);
            return false;
        }
    },

    clearCart() {
        try {
            localStorage.removeItem(STORAGE_KEYS.CART);
            return true;
        } catch (error) {
            console.error('Error clearing cart:', error);
            return false;
        }
    },

    getCartTotal() {
        const cart = this.getCart();
        return cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    },

    getCartItemsCount() {
        const cart = this.getCart();
        return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    },

    // ===== Favorites (Browser Storage) =====
    getFavorites() {
        try {
            const favData = localStorage.getItem(STORAGE_KEYS.FAVORITES);
            return favData ? JSON.parse(favData) : [];
        } catch (error) {
            console.error('Error reading favorites from storage:', error);
            return [];
        }
    },

    saveFavorites(favorites) {
        try {
            localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
            return true;
        } catch (error) {
            console.error('Error saving favorites to storage:', error);
            return false;
        }
    },

    addToFavorites(productId) {
        try {
            const favorites = this.getFavorites();
            if (!favorites.includes(productId)) {
                favorites.push(productId);
                this.saveFavorites(favorites);
            }
            return favorites;
        } catch (error) {
            console.error('Error adding to favorites:', error);
            return null;
        }
    },

    removeFromFavorites(productId) {
        try {
            const favorites = this.getFavorites();
            const filtered = favorites.filter(id => id !== productId);
            this.saveFavorites(filtered);
            return true;
        } catch (error) {
            console.error('Error removing from favorites:', error);
            return false;
        }
    },

    isFavorite(productId) {
        const favorites = this.getFavorites();
        return favorites.includes(productId);
    },

    clearFavorites() {
        try {
            localStorage.removeItem(STORAGE_KEYS.FAVORITES);
            return true;
        } catch (error) {
            console.error('Error clearing favorites:', error);
            return false;
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
}
