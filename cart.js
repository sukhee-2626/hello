// ===== CART MANAGEMENT =====
let cart = JSON.parse(localStorage.getItem('mahaCakesCart')) || [];

// Update cart count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        cartCountEl.textContent = count;
        cartCountEl.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Open cart sidebar
function openCart() {
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('cartOverlay').classList.add('open');
    renderCartItems();
}

// Close cart sidebar
function closeCart() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
}

// Render cart items
function renderCartItems() {
    const cartItemsEl = document.getElementById('cartItems');

    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        document.getElementById('cartSubtotal').textContent = '₹0';
        return;
    }

    cartItemsEl.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-image" style="background: ${item.gradient || 'linear-gradient(135deg, #FDE2E4, #C9ADA7)'}">
                ${item.emoji || '🍰'}
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} × ${item.quantity}</div>
                ${item.weight ? `<div class="cart-item-meta">${item.weight}</div>` : ''}
                ${item.message ? `<div class="cart-item-meta">Message: "${item.message}"</div>` : ''}
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">×</button>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartSubtotal').textContent = `₹${subtotal}`;
}

// Add to cart
function addItemToCart(item) {
    const existingIndex = cart.findIndex(i =>
        i.name === item.name &&
        i.weight === item.weight &&
        i.eggType === item.eggType
    );

    if (existingIndex > -1) {
        cart[existingIndex].quantity += item.quantity;
    } else {
        cart.push(item);
    }

    localStorage.setItem('mahaCakesCart', JSON.stringify(cart));
    updateCartCount();
    openCart();
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('mahaCakesCart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// Go to checkout
function goToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'checkout.html';
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
