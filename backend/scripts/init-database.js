// ===== DATABASE INITIALIZATION SCRIPT =====
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function initializeDatabase() {
    let connection;

    try {
        // Connect to MySQL server (without database)
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || ''
        });

        console.log('📦 Initializing Maha Cakes Database...\n');

        // Create database if not exists
        const dbName = process.env.DB_NAME || 'maha_cakes';
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
        console.log(`✅ Database '${dbName}' created/verified`);

        // Use the database
        await connection.query(`USE ${dbName}`);

        // Create products table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                slug VARCHAR(255) UNIQUE NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                original_price DECIMAL(10, 2),
                discount INT DEFAULT 0,
                category VARCHAR(100),
                subcategory VARCHAR(100),
                image_url VARCHAR(500),
                weight VARCHAR(50),
                egg_type ENUM('eggless', 'with-egg', 'both') DEFAULT 'both',
                flavour VARCHAR(100),
                rating DECIMAL(2, 1) DEFAULT 0,
                review_count INT DEFAULT 0,
                in_stock BOOLEAN DEFAULT TRUE,
                is_bestseller BOOLEAN DEFAULT FALSE,
                is_new BOOLEAN DEFAULT FALSE,
                same_day_delivery BOOLEAN DEFAULT FALSE,
                midnight_delivery BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Products table created');

        // Create orders table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id INT PRIMARY KEY AUTO_INCREMENT,
                order_number VARCHAR(50) UNIQUE NOT NULL,
                customer_name VARCHAR(255) NOT NULL,
                customer_email VARCHAR(255) NOT NULL,
                customer_phone VARCHAR(20) NOT NULL,
                delivery_address TEXT NOT NULL,
                total_amount DECIMAL(10, 2) NOT NULL,
                status ENUM('pending', 'confirmed', 'processing', 'delivered', 'cancelled') DEFAULT 'pending',
                payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
                payment_method VARCHAR(50),
                order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                delivery_date DATE,
                notes TEXT
            )
        `);
        console.log('✅ Orders table created');

        // Create order_items table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS order_items (
                id INT PRIMARY KEY AUTO_INCREMENT,
                order_id INT NOT NULL,
                product_id INT NOT NULL,
                product_name VARCHAR(255) NOT NULL,
                quantity INT NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(id)
            )
        `);
        console.log('✅ Order items table created');

        // Create admin_users table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS admin_users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(100) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                role ENUM('admin', 'manager') DEFAULT 'admin',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login TIMESTAMP NULL
            )
        `);
        console.log('✅ Admin users table created');

        // Check if admin exists
        const [adminExists] = await connection.query(
            'SELECT id FROM admin_users WHERE username = ?',
            [process.env.ADMIN_USERNAME || 'admin']
        );

        if (adminExists.length === 0) {
            // Create default admin user
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 10);
            await connection.query(
                'INSERT INTO admin_users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
                [
                    process.env.ADMIN_USERNAME || 'admin',
                    process.env.ADMIN_EMAIL || 'admin@mahacakes.com',
                    hashedPassword,
                    'admin'
                ]
            );
            console.log('\n✅ Default admin user created');
            console.log(`   Username: ${process.env.ADMIN_USERNAME || 'admin'}`);
            console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}`);
        } else {
            console.log('\n✅ Admin user already exists');
        }

        console.log('\n🎉 Database initialization completed successfully!');
        console.log('\n📝 Next steps:');
        console.log('   1. Run: npm install');
        console.log('   2. Create .env file from .env.example');
        console.log('   3. Run: npm start');
        console.log('   4. Access admin panel: http://localhost:3000/admin\n');

    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// Run initialization
initializeDatabase();
