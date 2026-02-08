// ===== PRODUCT DATA =====
const productData = {
    name: 'Chocolate Excess Cake',
    emoji: '🍫',
    gradient: 'linear-gradient(135deg, #4a2c2a, #6f4e37)',
    basePrice: 649,
    description: 'Indulge in our signature Chocolate Excess Cake - a rich, decadent masterpiece featuring multiple layers of moist chocolate sponge, premium dark chocolate ganache, and a velvety chocolate frosting.'
};

let selectedWeight = '500g';
let selectedPrice = 649;
let selectedEggType = 'egg';
let quantity = 1;

// Initialize product page
document.addEventListener('DOMContentLoaded', () => {
    // Set product details
    document.getElementById('productTitle').textContent = productData.name;
    document.getElementById('productDescription').textContent = productData.description;
    document.getElementById('mainImage').style.background = productData.gradient;
    document.getElementById('mainImage').innerHTML = `<div class="product-badge">Fresh</div><div style="font-size: 10rem">${productData.emoji}</div>`;

    // Generate thumbnails
    const thumbnails = document.getElementById('thumbnails');
    for (let i = 0; i < 4; i++) {
        const thumb = document.createElement('div');
        thumb.className = 'thumbnail' + (i === 0 ? ' active' : '');
        thumb.style.background = productData.gradient;
        thumb.innerHTML = productData.emoji;
        thumbnails.appendChild(thumb);
    }

    // Set minimum delivery date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('deliveryDate').min = tomorrow.toISOString().split('T')[0];
    document.getElementById('deliveryDate').value = tomorrow.toISOString().split('T')[0];

    // Setup event listeners
    setupWeightOptions();
    setupEggOptions();
    renderRelatedProducts();
});

// Weight options
function setupWeightOptions() {
    document.querySelectorAll('.weight-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.weight-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedWeight = this.dataset.weight;
            selectedPrice = parseInt(this.dataset.price);
            document.getElementById('currentPrice').textContent = `₹${selectedPrice}`;
        });
    });
}

// Egg options
function setupEggOptions() {
    document.querySelectorAll('.egg-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.egg-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedEggType = this.dataset.type;
        });
    });
}

// Quantity functions
function increaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (quantity < 10) {
        quantity++;
        qtyInput.value = quantity;
    }
}

function decreaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (quantity > 1) {
        quantity--;
        qtyInput.value = quantity;
    }
}

// Add to cart
function addToCart() {
    const message = document.getElementById('cakeMessage').value;
    const deliveryDate = document.getElementById('deliveryDate').value;

    const item = {
        name: productData.name,
        price: selectedPrice + (selectedEggType === 'eggless' ? 50 : 0),
        quantity: quantity,
        weight: selectedWeight,
        eggType: selectedEggType,
        message: message,
        deliveryDate: deliveryDate,
        emoji: productData.emoji,
        gradient: productData.gradient
    };

    addItemToCart(item);

    // Show success message
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '✓ Added to Cart!';
    btn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 2000);
}

// Buy now
function buyNow() {
    addToCart();
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 500);
}

// Related products
function renderRelatedProducts() {
    const relatedProducts = [
        { name: 'Red Velvet Cake', price: '₹599', emoji: '❤️', gradient: 'linear-gradient(135deg, #dc143c, #ff6b9d)' },
        { name: 'Black Forest', price: '₹599', emoji: '🌲', gradient: 'linear-gradient(135deg, #3d2817, #5E3023)' },
        { name: 'Butterscotch', price: '₹549', emoji: '🧈', gradient: 'linear-gradient(135deg, #d4a574, #f4c430)' },
        { name: 'Vanilla Dream', price: '₹499', emoji: '🍦', gradient: 'linear-gradient(135deg, #fff8dc, #fffacd)' }
    ];

    const grid = document.getElementById('relatedProducts');
    grid.innerHTML = relatedProducts.map(product => `
        <div class="product-card">
            <div class="product-image" style="background: ${product.gradient};">${product.emoji}</div>
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <button class="add-to-cart" onclick="window.location.href='product.html'">View Details</button>
            </div>
        </div>
    `).join('');
}
