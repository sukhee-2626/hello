// ===== MAHA CAKES - MAIN SCRIPT =====
// Using products from products.js database

// ===== CATEGORIES DATA =====
const categories = [
    {
        id: 1,
        name: 'Bestsellers',
        emoji: '⭐',
        description: 'Our most loved cakes',
        gradient: 'linear-gradient(135deg, #FFD700, #FFA500)'
    },
    {
        id: 2,
        name: 'Designer Cakes',
        emoji: '🎨',
        description: 'Custom designed cakes',
        gradient: 'linear-gradient(135deg, #FFB6C1, #FF69B4)'
    },
    {
        id: 3,
        name: 'Eggless Cakes',
        emoji: '🥚',
        description: '100% eggless options',
        gradient: 'linear-gradient(135deg, #90EE90, #32CD32)'
    },
    {
        id: 4,
        name: 'Premium Cakes',
        emoji: '💎',
        description: 'Luxury cake collection',
        gradient: 'linear-gradient(135deg, #C19A6B, #FFD700)'
    },
    {
        id: 5,
        name: 'Fruit Cakes',
        emoji: '🍓',
        description: 'Fresh fruit flavors',
        gradient: 'linear-gradient(135deg, #FF69B4, #FFA500)'
    },
    {
        id: 6,
        name: 'Cupcakes',
        emoji: '🧁',
        description: 'Mini delights',
        gradient: 'linear-gradient(135deg, #FFC0CB, #FFB6C1)'
    }
];

// ===== RENDER CATEGORIES =====
function renderCategories() {
    const categoryGrid = document.getElementById('categoryGrid');
    if (!categoryGrid) return;

    categoryGrid.innerHTML = categories.map(category => `
        <div class="category-card" onclick="filterByCategory('${category.name}')">
            <div class="category-image" style="background: ${category.gradient};">${category.emoji}</div>
            <div class="category-content">
                <h3 class="category-name">${category.name}</h3>
                <p class="category-description">${category.description}</p>
                <a href="#cakes" class="category-link">View Cakes →</a>
            </div>
        </div>
    `).join('');
}

// ===== RENDER PRODUCTS =====
function renderProducts(productsArray, containerId) {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    grid.innerHTML = productsArray.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                ${product.discount > 0 ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
                ${product.sameDayDelivery ? '<span class="delivery-badge">⚡ Same Day</span>' : ''}
            </div>
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    ${'⭐'.repeat(Math.floor(product.rating))}
                    <span class="rating-count">(${product.reviewCount})</span>
                </div>
                <div class="product-meta">
                    <span class="product-weight">${product.weight}</span>
                    ${product.eggType === 'eggless' ? '<span class="eggless-badge">🥚 Eggless</span>' : ''}
                </div>
                <div class="product-price-wrapper">
                    <span class="product-price">₹${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
                </div>
                <button class="add-to-cart ripple" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// ===== FILTER BY CATEGORY =====
function filterByCategory(categoryName) {
    let filteredProducts = [];

    switch (categoryName) {
        case 'Bestsellers':
            filteredProducts = getBestsellers();
            break;
        case 'Designer Cakes':
            filteredProducts = getProductsBySubcategory('Designer Cakes');
            break;
        case 'Eggless Cakes':
            filteredProducts = getEgglessCakes();
            break;
        case 'Premium Cakes':
            filteredProducts = getProductsBySubcategory('Premium Cakes');
            break;
        case 'Fruit Cakes':
            filteredProducts = getProductsBySubcategory('Fruit Cakes');
            break;
        case 'Cupcakes':
            filteredProducts = getProductsByCategory('Cupcakes');
            break;
        default:
            filteredProducts = getAllProducts();
    }

    // Scroll to products section
    document.getElementById('cakes').scrollIntoView({ behavior: 'smooth' });

    // Render filtered products
    renderProducts(filteredProducts, 'hotProducts');
}

// ===== ADD TO CART =====
function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;

    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Show toast notification
    if (window.showToast) {
        window.showToast(`${product.name} added to cart!`, 'success');
    }

    console.log(`Added ${product.name} to cart`);
}

// ===== UPDATE CART COUNT =====
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        if (totalItems > 0) {
            cartCount.textContent = totalItems;
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

// ===== NAVBAR FUNCTIONALITY =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

if (hamburger && navLinks) {
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
}

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
    // Render categories
    renderCategories();

    // Render Hot Products (Bestsellers)
    const hotProducts = getBestsellers().slice(0, 4);
    renderProducts(hotProducts, 'hotProducts');

    // Render Best Sellers (Top rated)
    const bestSellers = sortProducts(getAllProducts(), 'rating').slice(0, 4);
    renderProducts(bestSellers, 'bestSellers');

    // Update cart count
    updateCartCount();

    // Setup animations
    setupAnimations();

    // Initialize customizer if functions exist
    if (typeof renderCustomizerOptions === 'function') {
        renderCustomizerOptions();
        setupCustomizerHandlers();
    }

    console.log('🍰 Maha Cakes website loaded successfully!');
    console.log(`📦 Loaded ${getAllProducts().length} products from database`);
});
