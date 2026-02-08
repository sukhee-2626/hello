// ===== DATA =====
const categories = [
    { name: 'Black Forest', emoji: '🍫', link: '#', gradient: 'linear-gradient(135deg, #3d2817, #5E3023)' },
    { name: 'Red Velvet', emoji: '❤️', link: '#', gradient: 'linear-gradient(135deg, #dc143c, #ff6b9d)' },
    { name: 'Chocolate Truffle', emoji: '🍰', link: '#', gradient: 'linear-gradient(135deg, #4a2c2a, #6f4e37)' },
    { name: 'Butterscotch', emoji: '🧈', link: '#', gradient: 'linear-gradient(135deg, #d4a574, #f4c430)' },
    { name: 'Pineapple', emoji: '🍍', link: '#', gradient: 'linear-gradient(135deg, #ffd700, #ffed4e)' },
    { name: 'Strawberry', emoji: '🍓', link: '#', gradient: 'linear-gradient(135deg, #ff6b9d, #ffc0cb)' },
    { name: 'White Forest', emoji: '🤍', link: '#', gradient: 'linear-gradient(135deg, #f5f5f5, #ffffff)' },
    { name: 'Vanilla', emoji: '🍦', link: '#', gradient: 'linear-gradient(135deg, #fff8dc, #fffacd)' },
    { name: 'Mango', emoji: '🥭', link: '#', gradient: 'linear-gradient(135deg, #ffb347, #ffd700)' },
    { name: 'Blueberry', emoji: '🫐', link: '#', gradient: 'linear-gradient(135deg, #4169e1, #87ceeb)' },
    { name: 'Caramel', emoji: '🍮', link: '#', gradient: 'linear-gradient(135deg, #c68642, #daa520)' },
    { name: 'Custom Cakes', emoji: '🎨', link: '#', gradient: 'linear-gradient(135deg, #ff6b9d, #c9ada7, #87ceeb)' }
];

const hotProducts = [
    { name: 'Red Velvet Cake', price: '₹599', emoji: '❤️', gradient: 'linear-gradient(135deg, #dc143c, #ff6b9d)' },
    { name: 'Double Chocolate', price: '₹649', emoji: '🍫', gradient: 'linear-gradient(135deg, #3d2817, #6f4e37)' },
    { name: 'Almond White Chocolate', price: '₹699', emoji: '🤍', gradient: 'linear-gradient(135deg, #f5deb3, #ffffff)' },
    { name: 'Vancho Cake', price: '₹549', emoji: '🍦', gradient: 'linear-gradient(135deg, #fff8dc, #fffacd)' }
];

const bestSellers = [
    { name: 'Chocolate Truffle', price: '₹649', emoji: '🍰', gradient: 'linear-gradient(135deg, #4a2c2a, #6f4e37)' },
    { name: 'Praline Butterscotch', price: '₹599', emoji: '🧈', gradient: 'linear-gradient(135deg, #d4a574, #f4c430)' },
    { name: 'Black Forest', price: '₹599', emoji: '🍫', gradient: 'linear-gradient(135deg, #3d2817, #5E3023)' },
    { name: 'Fresh Fruit Cake', price: '₹699', emoji: '🍓', gradient: 'linear-gradient(135deg, #ff6b9d, #ffd700, #87ceeb)' }
];

// ===== RENDER FUNCTIONS =====
function renderCategories() {
    const grid = document.getElementById('categoryGrid');
    grid.innerHTML = categories.map(cat => `
        <div class="category-card">
            <div class="category-image" style="background: ${cat.gradient};">${cat.emoji}</div>
            <div class="category-content">
                <h3 class="category-name">${cat.name}</h3>
                <a href="${cat.link}" class="category-link">View Cakes →</a>
            </div>
        </div>
    `).join('');
}

function renderProducts(products, containerId) {
    const grid = document.getElementById(containerId);
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image" style="background: ${product.gradient};">${product.emoji}</div>
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// ===== NAVBAR FUNCTIONALITY =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ADD TO CART FUNCTIONALITY =====
function setupCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.closest('.product-content').querySelector('.product-name').textContent;

            // Visual feedback
            this.textContent = 'Added! ✓';
            this.style.background = '#4CAF50';

            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = '';
            }, 2000);

            console.log(`Added ${productName} to cart`);
        });
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

function setupAnimations() {
    const cards = document.querySelectorAll('.category-card, .product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderProducts(hotProducts, 'hotProducts');
    renderProducts(bestSellers, 'bestSellers');
    setupCartButtons();
    setupAnimations();

    // Initialize customizer if functions exist
    if (typeof renderCustomizerOptions === 'function') {
        renderCustomizerOptions();
        setupCustomizerHandlers();
    }

    console.log('🍰 Maha Cakes website loaded successfully!');
});
