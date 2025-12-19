// ===== Load HTML Components =====

// Track loaded components
let componentsLoaded = 0;
const totalComponents = 6;

function loadComponent(elementId, file) {
    return fetch(file)
        .then(response => response.text())
        .then(html => {
            const element = document.getElementById(elementId);
            if (element) {
                element.outerHTML = html;
            }
            componentsLoaded++;

            // When all components are loaded, initialize the app
            if (componentsLoaded === totalComponents) {
                initializeApp();
            }
        })
        .catch(err => {
            console.warn('Component load failed:', file, err);
            componentsLoaded++;
            if (componentsLoaded === totalComponents) {
                initializeApp();
            }
        });
}

// Initialize app after all components are loaded
function initializeApp() {
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
    loadComponent('header-placeholder', 'components/header.html');
    loadComponent('footer-placeholder', 'components/footer.html');
    loadComponent('cart-placeholder', 'components/cart.html');
    loadComponent('modal-placeholder', 'components/modal.html');
    loadComponent('toast-placeholder', 'components/toast.html');
    loadComponent('favorites-placeholder', 'components/favorites.html');
});
