// src/routes.js
const express = require('express');
const pool = require('./db');

const router = express.Router();

// Get all tasks
router.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Create a task
router.post('/tasks', async (req, res) => {
    const { title, description, recurrence, interval, days_of_week, nth_day_of_month, start_date, end_date } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO tasks (title, description, recurrence, interval, days_of_week, nth_day_of_month, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [title, description, recurrence, interval, days_of_week, nth_day_of_month, start_date, end_date]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Update a task
router.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, recurrence, interval, days_of_week, nth_day_of_month, start_date, end_date } = req.body;

    try {
        const result = await pool.query(
            'UPDATE tasks SET title = $1, description = $2, recurrence = $3, interval = $4, days_of_week = $5, nth_day_of_month = $6, start_date = $7, end_date = $8 WHERE id = $9 RETURNING *',
            [title, description, recurrence, interval, days_of_week, nth_day_of_month, start_date, end_date, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send('Task not found');
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).send('Task not found');
        }

        res.json({ message: 'Task deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
