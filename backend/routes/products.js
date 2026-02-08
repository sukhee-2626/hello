// ===== PRODUCTS ROUTES =====
const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { verifyToken, isAdmin } = require('../middleware/auth');

// GET /api/products - Get all products with filters
router.get('/', async (req, res) => {
    try {
        const { category, subcategory, eggType, minPrice, maxPrice, search, sort } = req.query;

        let query = 'SELECT * FROM products WHERE 1=1';
        const params = [];

        // Apply filters
        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }
        if (subcategory) {
            query += ' AND subcategory = ?';
            params.push(subcategory);
        }
        if (eggType) {
            query += ' AND (egg_type = ? OR egg_type = "both")';
            params.push(eggType);
        }
        if (minPrice) {
            query += ' AND price >= ?';
            params.push(parseFloat(minPrice));
        }
        if (maxPrice) {
            query += ' AND price <= ?';
            params.push(parseFloat(maxPrice));
        }
        if (search) {
            query += ' AND (name LIKE ? OR description LIKE ? OR flavour LIKE ?)';
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm, searchTerm);
        }

        // Apply sorting
        if (sort === 'price-low-high') {
            query += ' ORDER BY price ASC';
        } else if (sort === 'price-high-low') {
            query += ' ORDER BY price DESC';
        } else if (sort === 'rating') {
            query += ' ORDER BY rating DESC';
        } else if (sort === 'newest') {
            query += ' ORDER BY created_at DESC';
        } else {
            query += ' ORDER BY review_count DESC'; // Default: popularity
        }

        const [products] = await pool.query(query, params);
        res.json({ success: true, products });

    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
    try {
        const [products] = await pool.query(
            'SELECT * FROM products WHERE id = ?',
            [req.params.id]
        );

        if (products.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ success: true, product: products[0] });

    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// POST /api/products - Create new product (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
    try {
        const {
            name, slug, description, price, original_price, discount,
            category, subcategory, image_url, weight, egg_type, flavour,
            rating, review_count, in_stock, is_bestseller, is_new,
            same_day_delivery, midnight_delivery
        } = req.body;

        if (!name || !slug || !price || !category) {
            return res.status(400).json({ error: 'Required fields missing' });
        }

        const [result] = await pool.query(
            `INSERT INTO products (
                name, slug, description, price, original_price, discount,
                category, subcategory, image_url, weight, egg_type, flavour,
                rating, review_count, in_stock, is_bestseller, is_new,
                same_day_delivery, midnight_delivery
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name, slug, description, price, original_price || null, discount || 0,
                category, subcategory || null, image_url || null, weight || null,
                egg_type || 'both', flavour || null, rating || 0, review_count || 0,
                in_stock !== false, is_bestseller || false, is_new || false,
                same_day_delivery || false, midnight_delivery || false
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            productId: result.insertId
        });

    } catch (error) {
        console.error('Create product error:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Product slug already exists' });
        }
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// PUT /api/products/:id - Update product (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const {
            name, slug, description, price, original_price, discount,
            category, subcategory, image_url, weight, egg_type, flavour,
            rating, review_count, in_stock, is_bestseller, is_new,
            same_day_delivery, midnight_delivery
        } = req.body;

        const [result] = await pool.query(
            `UPDATE products SET
                name = ?, slug = ?, description = ?, price = ?, original_price = ?,
                discount = ?, category = ?, subcategory = ?, image_url = ?,
                weight = ?, egg_type = ?, flavour = ?, rating = ?, review_count = ?,
                in_stock = ?, is_bestseller = ?, is_new = ?,
                same_day_delivery = ?, midnight_delivery = ?
            WHERE id = ?`,
            [
                name, slug, description, price, original_price,
                discount, category, subcategory, image_url, weight,
                egg_type, flavour, rating, review_count, in_stock,
                is_bestseller, is_new, same_day_delivery, midnight_delivery,
                req.params.id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ success: true, message: 'Product updated successfully' });

    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE /api/products/:id - Delete product (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM products WHERE id = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ success: true, message: 'Product deleted successfully' });

    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

module.exports = router;
