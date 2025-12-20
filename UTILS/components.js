// ===== Load HTML Components =====

// Global products array (loaded from API)
let products = [];

function loadComponent(elementId, file) {
    return fetch(file)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.text();
        })
        .then(html => {
            const element = document.getElementById(elementId);
            if (element) {
                element.outerHTML = html;
            }
        })
        .catch(err => {
            console.warn('Component load failed:', file, err);
        });
}

// Load products from API
async function loadProducts() {
    try {
        products = await api.getAllProducts();
        console.log('Products loaded from API:', products.length);
    } catch (error) {
        console.error('Failed to load products from API:', error);
        products = [];
    }
}

// Initialize app after all components and data are loaded
async function initializeApp() {
    // First, load products from API
    await loadProducts();

    // Then initialize UI
    initI18n();
    initTheme();
    renderProducts();
    updateCartUI();
    updateWishlistCount();
    initEventListeners();
    initCartEvents();
    initModalEvents();
    initHeaderScroll();
    initSmoothScroll();
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const components = [
        { id: 'header-placeholder', file: 'components/header.html' },
        { id: 'footer-placeholder', file: 'components/footer.html' },
        { id: 'cart-placeholder', file: 'components/cart.html' },
        { id: 'modal-placeholder', file: 'components/modal.html' },
        { id: 'toast-placeholder', file: 'components/toast.html' },
        { id: 'favorites-placeholder', file: 'components/favorites.html' }
    ];

    Promise.all(components.map(c => loadComponent(c.id, c.file)))
        .finally(() => {
            initializeApp();
        });
});
