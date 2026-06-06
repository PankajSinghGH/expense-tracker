import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Get all expenses
export const fetchExpenses = () => API.get('/expenses');

// Create a new expense
export const createExpense = (data) => API.post('/expenses', data);

// Update an existing expense
export const updateExpense = (id, data) => API.put(`/expenses/${id}`, data);

// Delete an expense
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);