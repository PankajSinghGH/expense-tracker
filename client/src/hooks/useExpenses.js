import { useState, useEffect } from 'react';
import {
    fetchExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
} from '../services/api';

const useExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadExpenses = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetchExpenses();
            setExpenses(Array.isArray(res.data) ? res.data : []);
        } catch {
            setError('Failed to load expenses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExpenses();
    }, []);

    const addExpense = async (data) => {
        try {
            setError(null);
            const res = await createExpense(data);
            setExpenses((prev) => [res.data, ...prev]);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add expense');
        }
    };

    const editExpense = async (id, data) => {
        try {
            setError(null);
            const res = await updateExpense(id, data);
            setExpenses((prev) =>
                prev.map((e) => (e.id === id ? res.data : e))
            );
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update expense');
        }
    };

    const removeExpense = async (id) => {
        try {
            setError(null);
            await deleteExpense(id);
            setExpenses((prev) => prev.filter((e) => e.id !== id));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete expense');
        }
    };

    return {
        expenses,
        loading,
        error,
        addExpense,
        editExpense,
        removeExpense,
    };
};

export default useExpenses;