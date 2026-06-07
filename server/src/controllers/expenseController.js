const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { roundToTwo } = require('../utils/formatters');

const dataPath = path.join(__dirname, '../data/expenses.json');

// Helper — read expenses from JSON file
const readExpenses = () => {
    const readExpenses = () => {
        const dir = path.dirname(dataPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        if (!fs.existsSync(dataPath)) {
            fs.writeFileSync(dataPath, JSON.stringify([]));
        }
        const data = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(data);
    };
};

// Helper — write expenses to JSON file
const writeExpenses = (expenses) => {
    fs.writeFileSync(dataPath, JSON.stringify(expenses, null, 2));
};

// GET /api/expenses
const getAllExpenses = (req, res) => {
    try {
        const expenses = readExpenses();
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

        const expenses = readExpenses();
        const newExpense = {
            id: uuidv4(),
            amount: roundToTwo(parseFloat(amount)),
            category,
            date,
            note: note || '',
            createdAt: new Date().toISOString(),
        };

        expenses.unshift(newExpense);
        writeExpenses(expenses);
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

        const expenses = readExpenses();
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

        writeExpenses(expenses);
        res.json(expenses[index]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating expense' });
    }
};

// DELETE /api/expenses/:id
const deleteExpense = (req, res) => {
    try {
        const { id } = req.params;
        const expenses = readExpenses();
        const filtered = expenses.filter((e) => e.id !== id);

        if (filtered.length === expenses.length) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        writeExpenses(filtered);
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