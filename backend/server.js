// ===== MAHA CAKES EXPRESS SERVER =====
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { testConnection } = require('./config/database');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '..')));
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// ===== API ROUTES =====
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);

// ===== ROOT ROUTE =====
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// ===== HEALTH CHECK =====
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Maha Cakes API is running',
        timestamp: new Date().toISOString()
    });
});

// ===== ERROR HANDLING =====
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// ===== 404 HANDLER =====
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// ===== START SERVER =====
async function startServer() {
    try {
        // Test database connection
        const dbConnected = await testConnection();

        if (!dbConnected) {
            console.log('\n⚠️  Database connection failed!');
            console.log('📝 Please run: npm run init-db');
            console.log('   Then restart the server\n');
        }

        app.listen(PORT, () => {
            console.log('\n🎂 ===== MAHA CAKES SERVER =====');
            console.log(`🚀 Server running on: http://localhost:${PORT}`);
            console.log(`📱 Frontend: http://localhost:${PORT}`);
            console.log(`🔐 Admin Panel: http://localhost:${PORT}/admin`);
            console.log(`🔌 API Health: http://localhost:${PORT}/api/health`);
            console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log('================================\n');
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

module.exports = app;
