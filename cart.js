// ===== Cart UI Management =====

// Get DOM Elements (called when needed)
function getCartElements() {
    return {
        cartBtn: document.getElementById('cartBtn'),
        cartSidebar: document.getElementById('cartSidebar'),
        cartOverlay: document.getElementById('cartOverlay'),
        closeCartBtn: document.getElementById('closeCart'),
        cartItems: document.getElementById('cartItems'),
        cartCount: document.getElementById('cartCount'),
        cartTotal: document.getElementById('cartTotal'),
        checkoutBtn: document.getElementById('checkoutBtn')
    };
}

// Update Cart UI
function updateCartUI() {
    const { cartItems, cartCount, cartTotal } = getCartElements();

    if (cartCount) {
        cartCount.textContent = getCartItemsCount();
    }

    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <span class="cart-empty-icon">🛒</span>
                    <p>سلة التسوق فارغة</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
                    <div class="cart-item-info">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-price">${item.price} جنيه</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="handleQuantityChange(${item.id}, -1)">−</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="handleQuantityChange(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="handleRemoveFromCart(${item.id})">🗑️</button>
                </div>
            `).join('');
        }
    }

    if (cartTotal) {
        cartTotal.textContent = `${getCartTotal()} جنيه`;
    }
}

// Cart Actions
function openCart() {
    const { cartSidebar, cartOverlay } = getCartElements();
    if (cartSidebar) cartSidebar.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    const { cartSidebar, cartOverlay } = getCartElements();
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Event Handlers
function handleAddToCart(productId) {
    const product = addToCart(productId);
    updateCartUI();
    showToast(`تمت إضافة "${product.name}" للسلة`);
}

function handleRemoveFromCart(productId) {
    removeFromCart(productId);
    updateCartUI();
    showToast('تم حذف المنتج من السلة');
}

function handleQuantityChange(productId, change) {
    const result = updateCartQuantity(productId, change);
    if (result === null && change < 0) {
        showToast('تم حذف المنتج من السلة');
    }
    updateCartUI();
}

function handleCheckout() {
    if (cart.length === 0) {
        showToast('السلة فارغة!', 'warning');
        return;
    }
    showToast('شكراً لك! تم إتمام الطلب بنجاح 🎉', 'success');
    clearCart();
    updateCartUI();
    closeCart();
}

// Initialize Events
function initCartEvents() {
    const { cartBtn, closeCartBtn, cartOverlay, checkoutBtn } = getCartElements();
    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    if (checkoutBtn) checkoutBtn.addEventListener('click', handleCheckout);
}
