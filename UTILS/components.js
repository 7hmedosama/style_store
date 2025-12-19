// ===== Load HTML Components =====

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
