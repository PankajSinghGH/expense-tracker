const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const expenseRoutes = require('./routes/expenses');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*'
}));
app.use(express.json());

// Routes
app.use('/api/expenses', expenseRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'Expense Tracker API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});