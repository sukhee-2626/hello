// ===== CAKE CUSTOMIZER DATA =====
const customizerData = {
    flavors: [
        { name: 'Chocolate', emoji: '🍫', price: 500, gradient: 'linear-gradient(135deg, #4a2c2a, #6f4e37)' },
        { name: 'Vanilla', emoji: '🍦', price: 450, gradient: 'linear-gradient(135deg, #fff8dc, #fffacd)' },
        { name: 'Strawberry', emoji: '🍓', price: 550, gradient: 'linear-gradient(135deg, #ff6b9d, #ffc0cb)' },
        { name: 'Red Velvet', emoji: '❤️', price: 600, gradient: 'linear-gradient(135deg, #dc143c, #ff6b9d)' },
        { name: 'Butterscotch', emoji: '🧈', price: 500, gradient: 'linear-gradient(135deg, #d4a574, #f4c430)' },
        { name: 'Black Forest', emoji: '🌲', price: 650, gradient: 'linear-gradient(135deg, #3d2817, #5E3023)' }
    ],
    sizes: [
        { name: '500g', emoji: '🎂', multiplier: 1, label: 'Small' },
        { name: '1kg', emoji: '🍰', multiplier: 1.8, label: 'Medium' },
        { name: '2kg', emoji: '🎉', multiplier: 3.2, label: 'Large' },
        { name: '3kg', emoji: '🎊', multiplier: 4.5, label: 'XL' }
    ],
    toppings: [
        { name: 'Cherries', emoji: '🍒', price: 50 },
        { name: 'Strawberries', emoji: '🍓', price: 60 },
        { name: 'Blueberries', emoji: '🫐', price: 70 },
        { name: 'Chocolate Chips', emoji: '🍫', price: 40 },
        { name: 'Nuts', emoji: '🥜', price: 50 },
        { name: 'Sprinkles', emoji: '🌈', price: 30 },
        { name: 'Caramel', emoji: '🍮', price: 45 },
        { name: 'Whipped Cream', emoji: '🍦', price: 35 }
    ]
};

// ===== CUSTOMIZER STATE =====
let customizerState = {
    flavor: null,
    size: null,
    toppings: []
};

// ===== RENDER CUSTOMIZER OPTIONS =====
function renderCustomizerOptions() {
    // Render flavors
    const flavorGrid = document.getElementById('flavorOptions');
    flavorGrid.innerHTML = customizerData.flavors.map(flavor => `
        <button class="option-btn" data-type="flavor" data-value="${flavor.name}" data-price="${flavor.price}" data-gradient="${flavor.gradient}">
            <span class="emoji">${flavor.emoji}</span>
            <span class="label">${flavor.name}</span>
            <span class="price">₹${flavor.price}</span>
        </button>
    `).join('');

    // Render sizes
    const sizeGrid = document.getElementById('sizeOptions');
    sizeGrid.innerHTML = customizerData.sizes.map(size => `
        <button class="option-btn" data-type="size" data-value="${size.name}" data-multiplier="${size.multiplier}">
            <span class="emoji">${size.emoji}</span>
            <span class="label">${size.label}</span>
            <span class="label">${size.name}</span>
        </button>
    `).join('');

    // Render toppings
    const toppingGrid = document.getElementById('toppingOptions');
    toppingGrid.innerHTML = customizerData.toppings.map(topping => `
        <button class="option-btn" data-type="topping" data-value="${topping.name}" data-price="${topping.price}">
            <span class="emoji">${topping.emoji}</span>
            <span class="label">${topping.name}</span>
            <span class="price">+₹${topping.price}</span>
        </button>
    `).join('');
}

// ===== UPDATE CAKE DISPLAY =====
function updateCakeDisplay() {
    const cakeBase = document.getElementById('cakeBase');
    const cakeToppings = document.getElementById('cakeToppings');

    // Update cake base with flavor gradient
    if (customizerState.flavor) {
        const flavor = customizerData.flavors.find(f => f.name === customizerState.flavor);
        cakeBase.style.background = flavor.gradient;
        cakeBase.style.borderRadius = '50%';
        cakeBase.style.padding = '40px';
        cakeBase.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    }

    // Update toppings display
    cakeToppings.innerHTML = customizerState.toppings.map(topping => {
        const toppingData = customizerData.toppings.find(t => t.name === topping);
        return `<span class="topping-item">${toppingData.emoji}</span>`;
    }).join('');
}

// ===== UPDATE SUMMARY =====
function updateSummary() {
    document.getElementById('selectedFlavor').textContent = customizerState.flavor || 'Choose a flavor';
    document.getElementById('selectedSize').textContent = customizerState.size || 'Choose a size';
    document.getElementById('selectedToppings').textContent = customizerState.toppings.length > 0
        ? customizerState.toppings.join(', ')
        : 'None';

    // Calculate price
    let totalPrice = 0;
    if (customizerState.flavor && customizerState.size) {
        const flavor = customizerData.flavors.find(f => f.name === customizerState.flavor);
        const size = customizerData.sizes.find(s => s.name === customizerState.size);
        totalPrice = flavor.price * size.multiplier;

        // Add toppings
        customizerState.toppings.forEach(topping => {
            const toppingData = customizerData.toppings.find(t => t.name === topping);
            totalPrice += toppingData.price;
        });
    }

    document.getElementById('totalPrice').textContent = `₹${Math.round(totalPrice)}`;

    // Enable/disable order button
    const orderBtn = document.getElementById('orderCustomCake');
    orderBtn.disabled = !(customizerState.flavor && customizerState.size);
}

// ===== HANDLE OPTION SELECTION =====
function setupCustomizerHandlers() {
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const type = this.dataset.type;
            const value = this.dataset.value;

            if (type === 'flavor') {
                // Remove active from all flavors
                document.querySelectorAll('[data-type="flavor"]').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                customizerState.flavor = value;
            } else if (type === 'size') {
                // Remove active from all sizes
                document.querySelectorAll('[data-type="size"]').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                customizerState.size = value;
            } else if (type === 'topping') {
                // Toggle topping
                this.classList.toggle('active');
                if (this.classList.contains('active')) {
                    customizerState.toppings.push(value);
                } else {
                    customizerState.toppings = customizerState.toppings.filter(t => t !== value);
                }
            }

            updateCakeDisplay();
            updateSummary();
        });
    });

    // Order button handler
    document.getElementById('orderCustomCake').addEventListener('click', function () {
        if (!this.disabled) {
            const orderDetails = `
🎂 Custom Cake Order:
- Flavor: ${customizerState.flavor}
- Size: ${customizerState.size}
- Toppings: ${customizerState.toppings.join(', ') || 'None'}
- Total: ${document.getElementById('totalPrice').textContent}
            `.trim();

            alert(`Order Confirmed! ✨\n\n${orderDetails}\n\nWe'll contact you shortly via DM!`);
            console.log('Custom cake order:', customizerState);
        }
    });
}
