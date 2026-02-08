// ===== MAHA CAKES - MAIN SCRIPT (FULLSTACK VERSION) =====
// Using backend API for products

const API_BASE_URL = 'http://localhost:3000/api';

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

// ===== API FUNCTIONS =====
async function fetchProducts(filters = {}) {
    try {
        const queryParams = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE_URL}/products?${queryParams}`);
        const data = await response.json();
        return data.products || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to local products if API fails
        return typeof getAllProducts === 'function' ? getAllProducts() : [];
    }
}

async function fetchProductById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        const data = await response.json();
        return data.product;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

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
                <img src="${product.image_url || product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400x400/8B4513/FFFFFF?text=${encodeURIComponent(product.name)}'">
                ${product.discount > 0 ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
                ${product.same_day_delivery || product.sameDayDelivery ? '<span class="delivery-badge">⚡ Same Day</span>' : ''}
            </div>
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    ${'⭐'.repeat(Math.floor(product.rating))}
                    <span class="rating-count">(${product.review_count || product.reviewCount || 0})</span>
                </div>
                <div class="product-meta">
                    <span class="product-weight">${product.weight}</span>
                    ${product.egg_type === 'eggless' || product.eggType === 'eggless' ? '<span class="eggless-badge">🥚 Eggless</span>' : ''}
                </div>
                <div class="product-price-wrapper">
                    <span class="product-price">₹${product.price}</span>
                    ${product.original_price || product.originalPrice ? `<span class="original-price">₹${product.original_price || product.originalPrice}</span>` : ''}
                </div>
                <button class="add-to-cart ripple" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// ===== FILTER BY CATEGORY =====
async function filterByCategory(categoryName) {
    let filters = {};

    switch (categoryName) {
        case 'Bestsellers':
            // Fetch bestsellers from API or use local function
            const bestsellers = typeof getBestsellers === 'function' ? getBestsellers() : await fetchProducts({ sort: 'rating' });
            renderProducts(bestsellers, 'hotProducts');
            break;
        case 'Designer Cakes':
            filters = { subcategory: 'Designer Cakes' };
            break;
        case 'Eggless Cakes':
            filters = { eggType: 'eggless' };
            break;
        case 'Premium Cakes':
            filters = { subcategory: 'Premium Cakes' };
            break;
        case 'Fruit Cakes':
            filters = { subcategory: 'Fruit Cakes' };
            break;
        case 'Cupcakes':
            filters = { category: 'Cupcakes' };
            break;
    }

    if (Object.keys(filters).length > 0) {
        const products = await fetchProducts(filters);
        renderProducts(products, 'hotProducts');
    }

    // Scroll to products section
    document.getElementById('cakes')?.scrollIntoView({ behavior: 'smooth' });
}

// ===== ADD TO CART =====
function addToCart(productId) {
    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Find product (try both API and local)
    let product = null;
    if (typeof getProductById === 'function') {
        product = getProductById(productId);
    }

    if (!product) {
        console.error('Product not found');
        return;
    }

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image_url || product.image,
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
document.addEventListener('DOMContentLoaded', async () => {
    // Render categories
    renderCategories();

    // Check if products.js is loaded
    if (typeof getAllProducts === 'function') {
        // Use local products.js database
        const allProducts = getAllProducts();

        console.log(`📦 Found ${allProducts.length} products in database`);

        // Render ALL products in Hot Products section
        renderProducts(allProducts, 'hotProducts');

        // Render ALL products sorted by rating in Best Sellers
        const bestSellers = [...allProducts].sort((a, b) => b.rating - a.rating);
        renderProducts(bestSellers, 'bestSellers');

        console.log(`✅ Displaying ALL ${allProducts.length} products!`);
    } else {
        console.warn('⚠️ products.js not loaded. Trying API...');
        // Fallback: Try to fetch from API
        try {
            const allProducts = await fetchProducts();

            if (allProducts.length > 0) {
                renderProducts(allProducts, 'hotProducts');
                const bestSellers = [...allProducts].sort((a, b) => b.rating - a.rating);
                renderProducts(bestSellers, 'bestSellers');
                console.log(`✅ Loaded ${allProducts.length} products from API`);
            } else {
                console.error('❌ No products available!');
            }
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    // Update cart count
    updateCartCount();

    // Setup animations
    setupAnimations();

    // Initialize customizer if functions exist
    if (typeof renderCustomizerOptions === 'function') {
        renderCustomizerOptions();
        setupCustomizerHandlers();
    }

    console.log('🍰 Maha Cakes - All products loaded and visible!');
});
