import { useState, useEffect } from 'react';

const CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

const ExpenseForm = ({ onSubmit, initialData, onCancel }) => {
    const [form, setForm] = useState({
        amount: '',
        category: '',
        date: '',
        note: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setForm({
                amount: initialData.amount,
                category: initialData.category,
                date: initialData.date,
                note: initialData.note || '',
            });
        }
    }, [initialData]);

    const validate = () => {
        const newErrors = {};
        if (!form.amount || parseFloat(form.amount) <= 0) {
            newErrors.amount = 'Amount must be a positive number';
        }
        if (!form.category) {
            newErrors.category = 'Category is required';
        }
        if (!form.date) {
            newErrors.date = 'Date is required';
        }
        if (form.date && form.date > new Date().toISOString().split('T')[0]) {
            newErrors.date = 'Date cannot be in the future';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        onSubmit(form);
        if (!initialData) {
            setForm({ amount: '', category: '', date: '', note: '' });
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                {initialData ? 'Edit Expense' : 'Add New Expense'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Amount *
                    </label>
                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="0.01"
                        step="0.01"
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    {errors.amount && (
                        <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Category *
                    </label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        <option value="">Select category</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    {errors.category && (
                        <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Date *
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    {errors.date && (
                        <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Note (optional)
                    </label>
                    <input
                        type="text"
                        name="note"
                        value={form.note}
                        onChange={handleChange}
                        placeholder="Add a note..."
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>

            </div>

            <div className="flex gap-3 mt-4">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-5 py-2 rounded text-sm font-medium hover:bg-blue-700 transition"
                >
                    {initialData ? 'Update Expense' : 'Add Expense'}
                </button>
                {initialData && (
                    <button
                        onClick={onCancel}
                        className="bg-gray-200 text-gray-700 px-5 py-2 rounded text-sm font-medium hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default ExpenseForm;