// ===== CHECKOUT PAGE LOGIC =====
let discountAmount = 0;
const PROMO_CODES = {
    'MAHA10': 10, // 10% off
    'FIRST50': 50, // ₹50 off
    'SWEET20': 20  // 20% off
};

// Initialize checkout page
document.addEventListener('DOMContentLoaded', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        window.location.href = 'index.html';
        return;
    }

    renderSummaryItems();
    calculateTotals();
});

// Render summary items
function renderSummaryItems() {
    const summaryItems = document.getElementById('summaryItems');

    summaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <div class="summary-item-image" style="background: ${item.gradient || 'linear-gradient(135deg, #FDE2E4, #C9ADA7)'}">
                ${item.emoji || '🍰'}
            </div>
            <div class="summary-item-details">
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-meta">${item.weight} | ${item.eggType === 'egg' ? 'With Egg' : 'Eggless'} | Qty: ${item.quantity}</div>
                ${item.message ? `<div class="summary-item-meta">Message: "${item.message}"</div>` : ''}
            </div>
            <div class="summary-item-price">₹${item.price * item.quantity}</div>
        </div>
    `).join('');
}

// Calculate totals
function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal >= 500 ? 0 : 50;
    const discount = Math.round((subtotal * discountAmount) / 100);
    const total = subtotal + deliveryFee - discount;

    document.getElementById('summarySubtotal').textContent = `₹${subtotal}`;
    document.getElementById('deliveryFee').textContent = deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`;
    document.getElementById('discount').textContent = `-₹${discount}`;
    document.getElementById('totalAmount').textContent = `₹${total}`;
}

// Apply promo code
function applyPromo() {
    const promoInput = document.getElementById('promoCode');
    const code = promoInput.value.trim().toUpperCase();

    if (PROMO_CODES[code]) {
        discountAmount = PROMO_CODES[code];
        calculateTotals();
        promoInput.style.borderColor = '#4CAF50';
        alert(`✓ Promo code applied! You got ${discountAmount}% off!`);
    } else {
        promoInput.style.borderColor = '#e74c3c';
        alert('Invalid promo code');
    }
}

// Place order
function placeOrder() {
    const form = document.getElementById('checkoutForm');

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Get form data
    const orderData = {
        customer: {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            pincode: document.getElementById('pincode').value
        },
        items: cart,
        payment: document.querySelector('input[name="payment"]:checked').value,
        notes: document.getElementById('orderNotes').value,
        subtotal: document.getElementById('summarySubtotal').textContent,
        total: document.getElementById('totalAmount').textContent,
        orderDate: new Date().toISOString()
    };

    // Generate order ID
    const orderId = 'MC' + Date.now().toString().slice(-8);

    // Save order to localStorage (in real app, send to backend)
    const orders = JSON.parse(localStorage.getItem('mahaCakesOrders')) || [];
    orders.push({ id: orderId, ...orderData });
    localStorage.setItem('mahaCakesOrders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('mahaCakesCart');
    cart = [];

    // Show success modal
    document.getElementById('orderId').textContent = orderId;
    document.getElementById('successModal').classList.add('open');

    // Log order (in real app, send to backend/email)
    console.log('Order placed:', orderData);
}
