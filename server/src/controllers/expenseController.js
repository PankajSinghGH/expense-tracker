const { v4: uuidv4 } = require('uuid');
const { roundToTwo } = require('../utils/formatters');

// In-memory storage
let expenses = [];

// GET /api/expenses
const getAllExpenses = (req, res) => {
    try {
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error reading expenses' });
    }
};

// POST /api/expenses
const createExpense = (req, res) => {
    try {
        const { amount, category, date, note } = req.body;

        if (!amount || !category || !date) {
            return res.status(400).json({ message: 'Amount, category and date are required' });
        }

        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number' });
        }

        const newExpense = {
            id: uuidv4(),
            amount: roundToTwo(parseFloat(amount)),
            category,
            date,
            note: note || '',
            createdAt: new Date().toISOString(),
        };

        expenses.unshift(newExpense);
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: 'Error creating expense' });
    }
};

// PUT /api/expenses/:id
const updateExpense = (req, res) => {
    try {
        const { id } = req.params;
        const { amount, category, date, note } = req.body;

        if (!amount || !category || !date) {
            return res.status(400).json({ message: 'Amount, category and date are required' });
        }

        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number' });
        }

        const index = expenses.findIndex((e) => e.id === id);

        if (index === -1) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        expenses[index] = {
            ...expenses[index],
            amount: roundToTwo(parseFloat(amount)),
            category,
            date,
            note: note || '',
        };

        res.json(expenses[index]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating expense' });
    }
};

// DELETE /api/expenses/:id
const deleteExpense = (req, res) => {
    try {
        const { id } = req.params;
        const filtered = expenses.filter((e) => e.id !== id);

        if (filtered.length === expenses.length) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        expenses = filtered;
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting expense' });
    }
};

module.exports = {
    getAllExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
};