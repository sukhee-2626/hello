// ===== MAHA CAKES PRODUCTS DATABASE =====
// Inspired by FNP (Ferns N Petals) Product Structure

const products = [
    // ===== BESTSELLERS =====
    {
        id: 1,
        name: "Black Forest Cake",
        slug: "black-forest-cake",
        description: "Classic black forest cake with rich chocolate sponge, whipped cream, and cherry toppings",
        price: 549,
        originalPrice: 699,
        discount: 21,
        category: "Cakes",
        subcategory: "Bestsellers",
        image: "https://via.placeholder.com/400x400/8B4513/FFFFFF?text=Black+Forest",
        weight: "500g",
        eggType: "both",
        flavour: "Chocolate",
        rating: 4.8,
        reviewCount: 1250,
        inStock: true,
        isBestseller: true,
        isNew: false,
        sameDayDelivery: true,
        midnightDelivery: true
    },
    {
        id: 2,
        name: "Red Velvet Cake",
        slug: "red-velvet-cake",
        description: "Luxurious red velvet cake with cream cheese frosting",
        price: 649,
        originalPrice: 799,
        discount: 19,
        category: "Cakes",
        subcategory: "Bestsellers",
        image: "https://via.placeholder.com/400x400/DC143C/FFFFFF?text=Red+Velvet",
        weight: "500g",
        eggType: "with-egg",
        flavour: "Red Velvet",
        rating: 4.9,
        reviewCount: 980,
        inStock: true,
        isBestseller: true,
        isNew: false,
        sameDayDelivery: true,
        midnightDelivery: true
    },
    {
        id: 3,
        name: "Chocolate Truffle Cake",
        slug: "chocolate-truffle-cake",
        description: "Decadent chocolate truffle cake with rich chocolate ganache",
        price: 599,
        originalPrice: 749,
        discount: 20,
        category: "Cakes",
        subcategory: "Bestsellers",
        image: "https://via.placeholder.com/400x400/654321/FFFFFF?text=Chocolate+Truffle",
        weight: "500g",
        eggType: "both",
        flavour: "Chocolate",
        rating: 4.7,
        reviewCount: 1100,
        inStock: true,
        isBestseller: true,
        isNew: false,
        sameDayDelivery: true,
        midnightDelivery: false
    },

    // ===== REGULAR CAKES =====
    {
        id: 4,
        name: "Pineapple Cake",
        slug: "pineapple-cake",
        description: "Fresh pineapple cake with vanilla sponge and pineapple chunks",
        price: 449,
        originalPrice: 549,
        discount: 18,
        category: "Cakes",
        subcategory: "Regular Cakes",
        image: "https://via.placeholder.com/400x400/FFD700/000000?text=Pineapple",
        weight: "500g",
        eggType: "both",
        flavour: "Pineapple",
        rating: 4.5,
        reviewCount: 850,
        inStock: true,
        isBestseller: false,
        isNew: false,
        sameDayDelivery: true,
        midnightDelivery: false
    },
    {
        id: 5,
        name: "Butterscotch Cake",
        slug: "butterscotch-cake",
        description: "Delicious butterscotch cake with crunchy butterscotch bits",
        price: 499,
        originalPrice: 599,
        discount: 17,
        category: "Cakes",
        subcategory: "Regular Cakes",
        image: "https://via.placeholder.com/400x400/DEB887/000000?text=Butterscotch",
        weight: "500g",
        eggType: "both",
        flavour: "Butterscotch",
        rating: 4.6,
        reviewCount: 720,
        inStock: true,
        isBestseller: false,
        isNew: false,
        sameDayDelivery: true,
        midnightDelivery: false
    },
    {
        id: 6,
        name: "Vanilla Cake",
        slug: "vanilla-cake",
        description: "Classic vanilla cake with smooth vanilla buttercream",
        price: 399,
        originalPrice: 499,
        discount: 20,
        category: "Cakes",
        subcategory: "Regular Cakes",
        image: "https://via.placeholder.com/400x400/FFFACD/000000?text=Vanilla",
        weight: "500g",
        eggType: "both",
        flavour: "Vanilla",
        rating: 4.4,
        reviewCount: 650,
        inStock: true,
        isBestseller: false,
        isNew: false,
        sameDayDelivery: true,
        midnightDelivery: false
    },

    // ===== FRUIT CAKES =====
    {
        id: 7,
        name: "Strawberry Cake",
        slug: "strawberry-cake",
        description: "Fresh strawberry cake with strawberry cream and fruit toppings",
        price: 549,
        originalPrice: 649,
        discount: 15,
        category: "Cakes",
        subcategory: "Fruit Cakes",
        image: "https://via.placeholder.com/400x400/FF69B4/FFFFFF?text=Strawberry",
        weight: "500g",
        eggType: "both",
        flavour: "Strawberry",
        rating: 4.7,
        reviewCount: 540,
        inStock: true,
        isBestseller: false,
        isNew: false,
        sameDayDelivery: false,
        midnightDelivery: false
    },
    {
        id: 8,
        name: "Mango Cake",
        slug: "mango-cake",
        description: "Tropical mango cake with fresh mango pulp and cream",
        price: 599,
        originalPrice: 699,
        discount: 14,
        category: "Cakes",
        subcategory: "Fruit Cakes",
        image: "https://via.placeholder.com/400x400/FFA500/FFFFFF?text=Mango",
        weight: "500g",
        eggType: "eggless",
        flavour: "Mango",
        rating: 4.6,
        reviewCount: 420,
        inStock: true,
        isBestseller: false,
        isNew: false,
        sameDayDelivery: false,
        midnightDelivery: false
    },
    {
        id: 9,
        name: "Blueberry Cake",
        slug: "blueberry-cake",
        description: "Delightful blueberry cake with blueberry compote",
        price: 649,
        originalPrice: 749,
        discount: 13,
        category: "Cakes",
        subcategory: "Fruit Cakes",
        image: "https://via.placeholder.com/400x400/4169E1/FFFFFF?text=Blueberry",
        weight: "500g",
        eggType: "both",
        flavour: "Blueberry",
        rating: 4.5,
        reviewCount: 380,
        inStock: true,
        isBestseller: false,
        isNew: true,
        sameDayDelivery: false,
        midnightDelivery: false
    },

    // ===== DESIGNER CAKES =====
    {
        id: 10,
        name: "Heart Shaped Red Velvet",
        slug: "heart-shaped-red-velvet",
        description: "Romantic heart-shaped red velvet cake perfect for celebrations",
        price: 799,
        originalPrice: 999,
        discount: 20,
        category: "Cakes",
        subcategory: "Designer Cakes",
        image: "https://via.placeholder.com/400x400/FF1493/FFFFFF?text=Heart+Cake",
        weight: "1kg",
        eggType: "with-egg",
        flavour: "Red Velvet",
        rating: 4.9,
        reviewCount: 620,
        inStock: true,
        isBestseller: false,
        isNew: false,
        sameDayDelivery: true,
        midnightDelivery: true
    },
    {
        id: 11,
        name: "Photo Cake",
        slug: "photo-cake",
        description: "Personalized photo cake with edible print",
        price: 899,
        originalPrice: 1099,
        discount: 18,
        category: "Cakes",
        subcategory: "Designer Cakes",
        image: "https://via.placeholder.com/400x400/9370DB/FFFFFF?text=Photo+Cake",
        weight: "1kg",
        eggType: "both",
        flavour: "Vanilla",
        rating: 4.8,
        reviewCount: 890,
        inStock: true,
        isBestseller: false,
        isNew: true,
        sameDayDelivery: false,
        midnightDelivery: false
    },
    {
        id: 12,
        name: "Fondant Designer Cake",
        slug: "fondant-designer-cake",
        description: "Elegant fondant cake with custom design",
        price: 1299,
        originalPrice: 1599,
        discount: 19,
        category: "Cakes",
        subcategory: "Designer Cakes",
        image: "https://via.placeholder.com/400x400/FFB6C1/000000?text=Fondant+Cake",
        weight: "1.5kg",
        eggType: "both",
        flavour: "Chocolate",
        rating: 4.9,
        reviewCount: 340,
        inStock: true,
        isBestseller: false,
        isNew: true,
        sameDayDelivery: false,
        midnightDelivery: false
    },

    // ===== EGGLESS CAKES =====
    {
        id: 13,
        name: "Eggless Black Forest",
        slug: "eggless-black-forest",
        description: "Eggless version of classic black forest cake",
        price: 599,
        originalPrice: 749,
        discount: 20,
        category: "Cakes",
        subcategory: "Eggless Cakes",
        image: "https://via.placeholder.com/400x400/8B4513/FFFFFF?text=Eggless+BF",
        weight: "500g",
        eggType: "eggless",
        flavour: "Chocolate",
        rating: 4.7,
        reviewCount: 560,
        inStock: true,
        isBestseller: false,
        isNew: false,
        sameDayDelivery: true,
        midnightDelivery: false
    },
    {
        id: 14,
        name: "Eggless Chocolate Truffle",
        slug: "eggless-chocolate-truffle",
        description: "Rich eggless chocolate truffle cake",
        price: 649,
        originalPrice: 799,
        discount: 19,
        category: "Cakes",
        subcategory: "Eggless Cakes",
        image: "https://via.placeholder.com/400x400/654321/FFFFFF?text=Eggless+Truffle",
        weight: "500g",
        eggType: "eggless",
        flavour: "Chocolate",
        rating: 4.6,
        reviewCount: 480,
        inStock: true,
        isBestseller: false,
        isNew: false,
        sameDayDelivery: true,
        midnightDelivery: false
    },
    {
        id: 15,
        name: "Eggless Pineapple Cake",
        slug: "eggless-pineapple-cake",
        description: "Fresh eggless pineapple cake",
        price: 499,
        originalPrice: 599,
        discount: 17,
        category: "Cakes",
        subcategory: "Eggless Cakes",
        image: "https://via.placeholder.com/400x400/FFD700/000000?text=Eggless+Pineapple",
        weight: "500g",
        eggType: "eggless",
        flavour: "Pineapple",
        rating: 4.5,
        reviewCount: 410,
        inStock: true,
        isBestseller: false,
        isNew: false,
        sameDayDelivery: true,
        midnightDelivery: false
    },

    // ===== PREMIUM CAKES =====
    {
        id: 16,
        name: "Belgian Chocolate Cake",
        slug: "belgian-chocolate-cake",
        description: "Premium Belgian chocolate cake with imported chocolate",
        price: 999,
        originalPrice: 1299,
        discount: 23,
        category: "Cakes",
        subcategory: "Premium Cakes",
        image: "https://via.placeholder.com/400x400/3B2F2F/FFFFFF?text=Belgian+Choco",
        weight: "1kg",
        eggType: "both",
        flavour: "Chocolate",
        rating: 5.0,
        reviewCount: 280,
        inStock: true,
        isBestseller: false,
        isNew: true,
        sameDayDelivery: false,
        midnightDelivery: false
    },
    {
        id: 17,
        name: "Ferrero Rocher Cake",
        slug: "ferrero-rocher-cake",
        description: "Luxurious cake topped with Ferrero Rocher chocolates",
        price: 1199,
        originalPrice: 1499,
        discount: 20,
        category: "Cakes",
        subcategory: "Premium Cakes",
        image: "https://via.placeholder.com/400x400/C19A6B/000000?text=Ferrero+Cake",
        weight: "1kg",
        eggType: "both",
        flavour: "Hazelnut",
        rating: 4.9,
        reviewCount: 320,
        inStock: true,
        isBestseller: false,
        isNew: true,
        sameDayDelivery: false,
        midnightDelivery: false
    },
    {
        id: 18,
        name: "Tiramisu Cake",
        slug: "tiramisu-cake",
        description: "Italian tiramisu cake with coffee and mascarpone",
        price: 899,
        originalPrice: 1099,
        discount: 18,
        category: "Cakes",
        subcategory: "Premium Cakes",
        image: "https://via.placeholder.com/400x400/D2691E/FFFFFF?text=Tiramisu",
        weight: "1kg",
        eggType: "with-egg",
        flavour: "Coffee",
        rating: 4.8,
        reviewCount: 260,
        inStock: true,
        isBestseller: false,
        isNew: false,
        sameDayDelivery: false,
        midnightDelivery: false
    },

    // ===== CUPCAKES =====
    {
        id: 19,
        name: "Chocolate Cupcakes (6 pcs)",
        slug: "chocolate-cupcakes-6",
        description: "Set of 6 delicious chocolate cupcakes",
        price: 299,
        originalPrice: 399,
        discount: 25,
        category: "Cupcakes",
        subcategory: "Cupcakes",
        image: "https://via.placeholder.com/400x400/8B4513/FFFFFF?text=Choco+Cupcakes",
        weight: "6 pieces",
        eggType: "both",
        flavour: "Chocolate",
        rating: 4.6,
        reviewCount: 450,
        inStock: true,
        isBestseller: false,
        isNew: false,
        sameDayDelivery: true,
        midnightDelivery: false
    },
    {
        id: 20,
        name: "Vanilla Cupcakes (6 pcs)",
        slug: "vanilla-cupcakes-6",
        description: "Set of 6 vanilla cupcakes with buttercream frosting",
        price: 279,
        originalPrice: 379,
        discount: 26,
        category: "Cupcakes",
        subcategory: "Cupcakes",
        image: "https://via.placeholder.com/400x400/FFFACD/000000?text=Vanilla+Cupcakes",
        weight: "6 pieces",
        eggType: "both",
        flavour: "Vanilla",
        rating: 4.5,
        reviewCount: 390,
        inStock: true,
        isBestseller: false,
        isNew: false,
        sameDayDelivery: true,
        midnightDelivery: false
    },

    // ===== BENTO CAKES =====
    {
        id: 21,
        name: "Mini Chocolate Bento Cake",
        slug: "mini-chocolate-bento",
        description: "Cute mini bento cake perfect for one person",
        price: 249,
        originalPrice: 299,
        discount: 17,
        category: "Cakes",
        subcategory: "Bento Cakes",
        image: "https://via.placeholder.com/400x400/654321/FFFFFF?text=Bento+Cake",
        weight: "250g",
        eggType: "both",
        flavour: "Chocolate",
        rating: 4.7,
        reviewCount: 520,
        inStock: true,
        isBestseller: false,
        isNew: true,
        sameDayDelivery: true,
        midnightDelivery: false
    },
    {
        id: 22,
        name: "Mini Red Velvet Bento",
        slug: "mini-red-velvet-bento",
        description: "Adorable mini red velvet bento cake",
        price: 269,
        originalPrice: 319,
        discount: 16,
        category: "Cakes",
        subcategory: "Bento Cakes",
        image: "https://via.placeholder.com/400x400/DC143C/FFFFFF?text=RV+Bento",
        weight: "250g",
        eggType: "with-egg",
        flavour: "Red Velvet",
        rating: 4.8,
        reviewCount: 440,
        inStock: true,
        isBestseller: false,
        isNew: true,
        sameDayDelivery: true,
        midnightDelivery: false
    },

    // ===== JAR CAKES =====
    {
        id: 23,
        name: "Chocolate Jar Cake",
        slug: "chocolate-jar-cake",
        description: "Layered chocolate cake in a jar",
        price: 199,
        originalPrice: 249,
        discount: 20,
        category: "Cakes",
        subcategory: "Jar Cakes",
        image: "https://via.placeholder.com/400x400/8B4513/FFFFFF?text=Jar+Cake",
        weight: "200ml",
        eggType: "both",
        flavour: "Chocolate",
        rating: 4.5,
        reviewCount: 380,
        inStock: true,
        isBestseller: false,
        isNew: false,
        sameDayDelivery: true,
        midnightDelivery: false
    },
    {
        id: 24,
        name: "Red Velvet Jar Cake",
        slug: "red-velvet-jar-cake",
        description: "Layered red velvet cake in a jar",
        price: 219,
        originalPrice: 269,
        discount: 19,
        category: "Cakes",
        subcategory: "Jar Cakes",
        image: "https://via.placeholder.com/400x400/DC143C/FFFFFF?text=RV+Jar",
        weight: "200ml",
        eggType: "with-egg",
        flavour: "Red Velvet",
        rating: 4.6,
        reviewCount: 320,
        inStock: true,
        isBestseller: false,
        isNew: false,
        sameDayDelivery: true,
        midnightDelivery: false
    },

    // ===== HEALTHY CAKES =====
    {
        id: 25,
        name: "Sugar-Free Chocolate Cake",
        slug: "sugar-free-chocolate",
        description: "Healthy sugar-free chocolate cake",
        price: 699,
        originalPrice: 849,
        discount: 18,
        category: "Cakes",
        subcategory: "Healthy Cakes",
        image: "https://via.placeholder.com/400x400/654321/FFFFFF?text=Sugar+Free",
        weight: "500g",
        eggType: "both",
        flavour: "Chocolate",
        rating: 4.4,
        reviewCount: 180,
        inStock: true,
        isBestseller: false,
        isNew: true,
        sameDayDelivery: false,
        midnightDelivery: false
    },
    {
        id: 26,
        name: "Whole Wheat Vanilla Cake",
        slug: "whole-wheat-vanilla",
        description: "Healthy whole wheat vanilla cake",
        price: 649,
        originalPrice: 799,
        discount: 19,
        category: "Cakes",
        subcategory: "Healthy Cakes",
        image: "https://via.placeholder.com/400x400/FFFACD/000000?text=Wheat+Cake",
        weight: "500g",
        eggType: "eggless",
        flavour: "Vanilla",
        rating: 4.3,
        reviewCount: 150,
        inStock: true,
        isBestseller: false,
        isNew: true,
        sameDayDelivery: false,
        midnightDelivery: false
    },

    // ===== DRY CAKES =====
    {
        id: 27,
        name: "Plum Cake",
        slug: "plum-cake",
        description: "Traditional plum cake with dry fruits",
        price: 549,
        originalPrice: 649,
        discount: 15,
        category: "Cakes",
        subcategory: "Dry Cakes",
        image: "https://via.placeholder.com/400x400/8B4513/FFFFFF?text=Plum+Cake",
        weight: "500g",
        eggType: "with-egg",
        flavour: "Fruit",
        rating: 4.5,
        reviewCount: 290,
        inStock: true,
        isBestseller: false,
        isNew: false,
        sameDayDelivery: false,
        midnightDelivery: false
    },
    {
        id: 28,
        name: "Walnut Brownie Cake",
        slug: "walnut-brownie-cake",
        description: "Rich walnut brownie cake",
        price: 599,
        originalPrice: 699,
        discount: 14,
        category: "Cakes",
        subcategory: "Dry Cakes",
        image: "https://via.placeholder.com/400x400/654321/FFFFFF?text=Walnut+Brownie",
        weight: "500g",
        eggType: "both",
        flavour: "Walnut",
        rating: 4.6,
        reviewCount: 240,
        inStock: true,
        isBestseller: false,
        isNew: false,
        sameDayDelivery: false,
        midnightDelivery: false
    },

    // ===== FUSION CAKES =====
    {
        id: 29,
        name: "Rasmalai Cake",
        slug: "rasmalai-cake",
        description: "Fusion cake with rasmalai flavors",
        price: 749,
        originalPrice: 899,
        discount: 17,
        category: "Cakes",
        subcategory: "Fusion Cakes",
        image: "https://via.placeholder.com/400x400/FFF8DC/000000?text=Rasmalai",
        weight: "500g",
        eggType: "eggless",
        flavour: "Rasmalai",
        rating: 4.7,
        reviewCount: 310,
        inStock: true,
        isBestseller: false,
        isNew: true,
        sameDayDelivery: false,
        midnightDelivery: false
    },
    {
        id: 30,
        name: "Gulab Jamun Cake",
        slug: "gulab-jamun-cake",
        description: "Unique fusion of gulab jamun and cake",
        price: 799,
        originalPrice: 949,
        discount: 16,
        category: "Cakes",
        subcategory: "Fusion Cakes",
        image: "https://via.placeholder.com/400x400/FF6347/FFFFFF?text=Gulab+Jamun",
        weight: "500g",
        eggType: "eggless",
        flavour: "Gulab Jamun",
        rating: 4.6,
        reviewCount: 270,
        inStock: true,
        isBestseller: false,
        isNew: true,
        sameDayDelivery: false,
        midnightDelivery: false
    }
];

// ===== HELPER FUNCTIONS =====

// Get all products
function getAllProducts() {
    return products;
}

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Get products by category
function getProductsByCategory(category) {
    return products.filter(product => product.category === category);
}

// Get products by subcategory
function getProductsBySubcategory(subcategory) {
    return products.filter(product => product.subcategory === subcategory);
}

// Get bestsellers
function getBestsellers() {
    return products.filter(product => product.isBestseller);
}

// Get new arrivals
function getNewArrivals() {
    return products.filter(product => product.isNew);
}

// Get eggless cakes
function getEgglessCakes() {
    return products.filter(product => product.eggType === 'eggless');
}

// Get same-day delivery products
function getSameDayDelivery() {
    return products.filter(product => product.sameDayDelivery);
}

// Filter products by price range
function getProductsByPriceRange(min, max) {
    return products.filter(product => product.price >= min && product.price <= max);
}

// Search products
function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return products.filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.flavour.toLowerCase().includes(lowerQuery)
    );
}

// Sort products
function sortProducts(productsArray, sortBy = 'popularity') {
    const sorted = [...productsArray];

    switch (sortBy) {
        case 'price-low-high':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high-low':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'discount':
            return sorted.sort((a, b) => b.discount - a.discount);
        case 'popularity':
        default:
            return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    }
}

// Get unique categories
function getCategories() {
    return [...new Set(products.map(p => p.category))];
}

// Get unique subcategories
function getSubcategories() {
    return [...new Set(products.map(p => p.subcategory))];
}

// Get unique flavours
function getFlavours() {
    return [...new Set(products.map(p => p.flavour))];
}
