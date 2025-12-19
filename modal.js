// ===== Product Modal =====

// State
let currentProductId = null;
let selectedColor = null;

// Get Modal Elements (called when needed)
function getModalElements() {
    return {
        productModal: document.getElementById('productModal'),
        productModalOverlay: document.getElementById('productModalOverlay'),
        modalClose: document.getElementById('modalClose'),
        modalImage: document.getElementById('modalImage'),
        modalCategory: document.getElementById('modalCategory'),
        modalName: document.getElementById('modalName'),
        modalRating: document.getElementById('modalRating'),
        modalDescription: document.getElementById('modalDescription'),
        colorsList: document.getElementById('colorsList'),
        modalCurrentPrice: document.getElementById('modalCurrentPrice'),
        modalOldPrice: document.getElementById('modalOldPrice'),
        modalAddToCart: document.getElementById('modalAddToCart')
    };
}

// Open Modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const {
        productModal,
        productModalOverlay,
        modalImage,
        modalCategory,
        modalName,
        modalRating,
        modalDescription,
        colorsList,
        modalCurrentPrice,
        modalOldPrice
    } = getModalElements();

    if (!productModal) {
        console.error('Modal not loaded yet');
        return;
    }

    currentProductId = productId;
    selectedColor = product.colors[0];

    modalImage.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
    modalCategory.textContent = product.categoryAr;
    modalName.textContent = product.name;
    modalRating.innerHTML = '⭐'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    modalDescription.textContent = product.description;
    modalCurrentPrice.textContent = product.price + ' جنيه';
    modalOldPrice.textContent = product.oldPrice + ' جنيه';

    colorsList.innerHTML = product.colors.map((color, index) => `
        <button 
            class="color-option ${index === 0 ? 'selected' : ''}" 
            style="background-color: ${color};"
            onclick="selectColor('${color}', this)"
            title="${color}"
        ></button>
    `).join('');

    productModal.classList.add('active');
    productModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeProductModal() {
    const { productModal, productModalOverlay } = getModalElements();
    if (productModal) productModal.classList.remove('active');
    if (productModalOverlay) productModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    currentProductId = null;
    selectedColor = null;
}

// Select Color
function selectColor(color, element) {
    selectedColor = color;
    document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
}

// Add to Cart from Modal
function addToCartFromModal() {
    if (currentProductId) {
        handleAddToCart(currentProductId);
        closeProductModal();
    }
}

// Initialize Events
function initModalEvents() {
    const { modalClose, productModalOverlay, modalAddToCart, productModal } = getModalElements();

    if (modalClose) modalClose.addEventListener('click', closeProductModal);
    if (productModalOverlay) productModalOverlay.addEventListener('click', closeProductModal);
    if (modalAddToCart) modalAddToCart.addEventListener('click', addToCartFromModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const { productModal } = getModalElements();
            const { cartSidebar } = getCartElements();

            if (productModal && productModal.classList.contains('active')) {
                closeProductModal();
            } else if (cartSidebar && cartSidebar.classList.contains('active')) {
                closeCart();
            }
        }
    });
}
