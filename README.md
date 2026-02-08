# Maha Cakes - E-commerce Platform with Backend & Admin Panel

Premium cake e-commerce website with Node.js/Express backend, MySQL database, and admin panel.

## 🚀 Features

### Frontend
- ✅ Modern responsive design
- ✅ Product catalog with 30+ cakes
- ✅ Shopping cart functionality
- ✅ Category filtering
- ✅ Product search
- ✅ Animated hero banner slider

### Backend (Node.js/Express)
- ✅ REST API with MySQL database
- ✅ JWT authentication
- ✅ Product CRUD operations
- ✅ Order management system
- ✅ Admin user management

### Admin Panel
- ✅ Secure login with JWT
- ✅ Dashboard with statistics
- ✅ Product management (Add/Edit/Delete)
- ✅ Order management
- ✅ Real-time data updates

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MySQL** (v5.7 or higher) - [Download here](https://dev.mysql.com/downloads/mysql/)

## 🛠️ Installation

### 1. Install Node.js Dependencies

```bash
npm install
```

### 2. Configure Database

Edit the `.env` file with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=maha_cakes
```

### 3. Initialize Database

```bash
npm run init-db
```

This will:
- Create the `maha_cakes` database
- Create all required tables (products, orders, admin_users)
- Create default admin user

### 4. Start the Server

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **API Health**: http://localhost:3000/api/health

## 🔐 Default Admin Credentials

```
Username: admin
Password: Admin@123
```

**⚠️ Important**: Change these credentials after first login!

## 📡 API Endpoints

### Public Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/orders` - Create order

### Admin Endpoints (Require JWT Token)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/orders` - Get all orders
- `PUT /api/orders/:id` - Update order status
- `GET /api/orders/stats/dashboard` - Get dashboard stats

## 📁 Project Structure

```
maha-cakes/
├── backend/
│   ├── server.js              # Main Express server
│   ├── config/
│   │   └── database.js        # MySQL connection
│   ├── middleware/
│   │   └── auth.js            # JWT authentication
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── products.js        # Product routes
│   │   └── orders.js          # Order routes
│   └── scripts/
│       └── init-database.js   # Database initialization
├── admin/                     # Admin panel (to be created)
├── .env                       # Environment variables
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🗄️ Database Schema

### Products Table
- Product information (name, price, description)
- Categories and subcategories
- Ratings and reviews
- Stock status
- Delivery options

### Orders Table
- Customer information
- Order status and payment status
- Delivery details
- Order items

### Admin Users Table
- Admin credentials (hashed passwords)
- Roles and permissions
- Login tracking

## 🔧 Development

### Running in Development Mode
```bash
npm run dev
```

### Database Reset
If you need to reset the database:
```bash
npm run init-db
```

## 🚀 Deployment

### Vercel (Frontend only)
The frontend is already configured for Vercel deployment.

### Backend Deployment
For backend deployment, you'll need:
1. A hosting service (Heroku, Railway, DigitalOcean, etc.)
2. A MySQL database (can use cloud MySQL services)
3. Set environment variables on your hosting platform

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | MySQL host | localhost |
| `DB_USER` | MySQL username | root |
| `DB_PASSWORD` | MySQL password | (empty) |
| `DB_NAME` | Database name | maha_cakes |
| `JWT_SECRET` | JWT secret key | (required) |
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment | development |

## 🛡️ Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS enabled for API access
- SQL injection protection with parameterized queries

## 📞 Support

For issues or questions, please contact: admin@mahacakes.com

## 📄 License

MIT License - feel free to use this project for your own purposes!

---

Made with ❤️ by Maha Cakes Team
