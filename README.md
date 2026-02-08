# Maha Cakes - Premium Cake E-commerce Website

![Maha Cakes](logo.png)

## 🍰 About

**Maha Cakes** is a full-featured e-commerce website for a premium cake shop. Built with vanilla HTML, CSS, and JavaScript, it offers a complete online shopping experience with product browsing, customization, cart management, and checkout.

**Tagline:** *Baking dreams into slices 🍰✨*

## ✨ Features

### 🏠 Homepage
- Responsive navigation with cart counter
- Eye-catching hero section with glassmorphism
- Promotional banner with special offers
- 12 cake categories with vibrant gradients
- Featured products ("Hot in Store" & "Best Sellers")
- Interactive cake customizer
- Features showcase banner

### 🎨 Cake Customizer
- **6 Flavors**: Chocolate, Vanilla, Strawberry, Red Velvet, Butterscotch, Black Forest
- **4 Sizes**: 500g, 1kg, 2kg, 3kg
- **8 Toppings**: Cherries, Strawberries, Blueberries, Chocolate Chips, Nuts, Sprinkles, Caramel, Whipped Cream
- Real-time price calculation
- Visual cake preview with animations

### 🛍️ Product Pages
- Detailed product information
- Weight selection (500g, 1kg, 2kg)
- Egg/Eggless options
- Custom message on cake
- Delivery date picker
- Add to cart functionality
- Related products

### 🛒 Shopping Cart
- Persistent cart (localStorage)
- Add/remove items
- Live cart counter
- Sidebar with smooth animations
- Subtotal calculation

### 💳 Checkout System
- Complete delivery form
- Payment options (COD & Online)
- Promo code support (`MAHA10`, `FIRST50`, `SWEET20`)
- Order summary
- Success confirmation with order ID

## 🎨 Design

- **Color Palette**: Deep Cocoa (#5E3023), Soft Blush Pink (#FDE2E4), Warm Taupe (#C9ADA7)
- **Typography**: Playfair Display (headings) + Inter (body)
- **Effects**: Glassmorphism, smooth animations, gradient backgrounds
- **Responsive**: Desktop, tablet, and mobile optimized

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone git@github.com:sukhee-2626/hello.git
cd hello
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

3. Visit `http://localhost:8000` (or open `index.html` directly)

## 📁 Project Structure

```
maha-cakes/
├── index.html              # Homepage
├── product.html            # Product detail page
├── checkout.html           # Checkout page
├── style.css               # Main styles
├── customizer.css          # Customizer styles
├── product.css             # Product page styles
├── checkout.css            # Checkout styles
├── banners.css             # Banner styles
├── script.js               # Main JavaScript
├── customizer.js           # Customizer logic
├── product.js              # Product page logic
├── cart.js                 # Shopping cart system
├── checkout.js             # Checkout processing
└── logo.png                # Logo (add your own)
```

## 🛠️ Technologies

- **HTML5**: Semantic structure
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)**: Vanilla JS, localStorage API
- **No dependencies**: Pure frontend, no frameworks

## 💡 Usage

### Adding Products to Cart
1. Browse products on homepage or visit product page
2. Select weight, egg type, and add custom message
3. Click "Add to Cart"
4. View cart by clicking cart icon

### Customizing a Cake
1. Navigate to "Customize" section
2. Select flavor, size, and toppings
3. See real-time price updates
4. Click "Order Now"

### Checkout
1. Review cart items
2. Fill delivery information
3. Apply promo code (optional)
4. Select payment method
5. Place order

## 🎁 Promo Codes

- `MAHA10` - 10% off
- `FIRST50` - ₹50 off
- `SWEET20` - 20% off

## 📱 Responsive Design

- **Desktop** (>968px): Full multi-column layout
- **Tablet** (768px-968px): Adjusted grids
- **Mobile** (<768px): Single column, hamburger menu

## 🔧 Customization

### Adding Your Logo
Save your logo as `logo.png` in the root directory (60px height recommended)

### Changing Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary: #5E3023;
    --secondary: #FDE2E4;
    --accent: #C9ADA7;
}
```

### Adding Products
Edit the product arrays in `script.js`:
```javascript
const hotProducts = [
    { name: 'Product Name', price: '₹599', emoji: '🍰', gradient: '...' }
];
```

## 🚀 Deployment

Deploy to any static hosting service:

- **GitHub Pages**: Push to `gh-pages` branch
- **Netlify**: Drag & drop the folder
- **Vercel**: Import from GitHub
- **Firebase Hosting**: `firebase deploy`

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ for **Maha Cakes**

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

**Maha Cakes** - *Slice into happiness* 🍰✨
