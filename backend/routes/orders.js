// ===== ORDERS ROUTES =====
const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { verifyToken, isAdmin } = require('../middleware/auth');

// GET /api/orders - Get all orders (Admin only)
router.get('/', verifyToken, isAdmin, async (req, res) => {
    try {
        const { status, startDate, endDate } = req.query;

        let query = `
            SELECT o.*, 
                   GROUP_CONCAT(
                       JSON_OBJECT(
                           'product_name', oi.product_name,
                           'quantity', oi.quantity,
                           'price', oi.price
                       )
                   ) as items
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            WHERE 1=1
        `;
        const params = [];

        if (status) {
            query += ' AND o.status = ?';
            params.push(status);
        }
        if (startDate) {
            query += ' AND o.order_date >= ?';
            params.push(startDate);
        }
        if (endDate) {
            query += ' AND o.order_date <= ?';
            params.push(endDate);
        }

        query += ' GROUP BY o.id ORDER BY o.order_date DESC';

        const [orders] = await pool.query(query, params);

        // Parse items JSON
        const formattedOrders = orders.map(order => ({
            ...order,
            items: order.items ? JSON.parse(`[${order.items}]`) : []
        }));

        res.json({ success: true, orders: formattedOrders });

    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// GET /api/orders/:id - Get single order
router.get('/:id', async (req, res) => {
    try {
        const [orders] = await pool.query(
            'SELECT * FROM orders WHERE id = ? OR order_number = ?',
            [req.params.id, req.params.id]
        );

        if (orders.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const [items] = await pool.query(
            'SELECT * FROM order_items WHERE order_id = ?',
            [orders[0].id]
        );

        res.json({
            success: true,
            order: {
                ...orders[0],
                items
            }
        });

    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const {
            customer_name, customer_email, customer_phone,
            delivery_address, items, payment_method, delivery_date, notes
        } = req.body;

        if (!customer_name || !customer_email || !customer_phone || !delivery_address || !items || items.length === 0) {
            return res.status(400).json({ error: 'Required fields missing' });
        }

        // Calculate total
        const total_amount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Generate order number
        const order_number = 'ORD' + Date.now();

        // Insert order
        const [orderResult] = await connection.query(
            `INSERT INTO orders (
                order_number, customer_name, customer_email, customer_phone,
                delivery_address, total_amount, payment_method, delivery_date, notes
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                order_number, customer_name, customer_email, customer_phone,
                delivery_address, total_amount, payment_method || 'COD',
                delivery_date || null, notes || null
            ]
        );

        const orderId = orderResult.insertId;

        // Insert order items
        for (const item of items) {
            await connection.query(
                `INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
                 VALUES (?, ?, ?, ?, ?)`,
                [orderId, item.product_id, item.product_name, item.quantity, item.price]
            );
        }

        await connection.commit();

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order_number,
            orderId
        });

    } catch (error) {
        await connection.rollback();
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Failed to create order' });
    } finally {
        connection.release();
    }
});

// PUT /api/orders/:id - Update order status (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const { status, payment_status, delivery_date, notes } = req.body;

        const updates = [];
        const params = [];

        if (status) {
            updates.push('status = ?');
            params.push(status);
        }
        if (payment_status) {
            updates.push('payment_status = ?');
            params.push(payment_status);
        }
        if (delivery_date) {
            updates.push('delivery_date = ?');
            params.push(delivery_date);
        }
        if (notes !== undefined) {
            updates.push('notes = ?');
            params.push(notes);
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        params.push(req.params.id);

        const [result] = await pool.query(
            `UPDATE orders SET ${updates.join(', ')} WHERE id = ?`,
            params
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ success: true, message: 'Order updated successfully' });

    } catch (error) {
        console.error('Update order error:', error);
        res.status(500).json({ error: 'Failed to update order' });
    }
});

// GET /api/orders/stats/dashboard - Get dashboard statistics (Admin only)
router.get('/stats/dashboard', verifyToken, isAdmin, async (req, res) => {
    try {
        // Total orders
        const [totalOrders] = await pool.query('SELECT COUNT(*) as count FROM orders');

        // Pending orders
        const [pendingOrders] = await pool.query(
            'SELECT COUNT(*) as count FROM orders WHERE status = "pending"'
        );

        // Total revenue
        const [revenue] = await pool.query(
            'SELECT SUM(total_amount) as total FROM orders WHERE payment_status = "paid"'
        );

        // Today's orders
        const [todayOrders] = await pool.query(
            'SELECT COUNT(*) as count FROM orders WHERE DATE(order_date) = CURDATE()'
        );

        res.json({
            success: true,
            stats: {
                totalOrders: totalOrders[0].count,
                pendingOrders: pendingOrders[0].count,
                totalRevenue: revenue[0].total || 0,
                todayOrders: todayOrders[0].count
            }
        });

    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

module.exports = router;
