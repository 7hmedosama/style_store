// ===== UI Utilities =====

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}

// Wishlist Count
function updateWishlistCount() {
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) {
        wishlistCount.textContent = favorites.length;
    }
}

// Toggle Wishlist
function toggleWishlist(productId, element) {
    if (isInFavorites(productId)) {
        removeFromFavorites(productId);
        element.textContent = '🤍';
        showToast('تمت الإزالة من المفضلة');
    } else {
        addToFavorites(productId);
        element.textContent = '❤️';
        showToast('تمت الإضافة للمفضلة ❤️');
    }
    updateWishlistCount();
}

// Header Scroll Effect
function initHeaderScroll() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            header.style.boxShadow = window.scrollY > 50
                ? '0 5px 30px rgba(0, 0, 0, 0.1)'
                : '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}
